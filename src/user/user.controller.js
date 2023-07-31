'use strict'

const User = require('./user.model')
const Department = require(`../departments/departments.model`)
const { validateData , encrypt , checkPassword } = require('../utils/validate')
const { createToken } = require('../services/jwt')

exports.defaultAdmin = async()=>{
    
    

    try {
        let data = {
            name: 'Daniels',
            surname: 'Eustaquio',
            username:'ADMINA',
            password: 'admin',
            phone: '1234-1314',
            email:'Deustaq@gmail.com',
            age: 24,
            role: 'ADMIN',
            departament: '64b20df327252397c58043a0',
            DPI: '12349251 0101'
 
        }
        let params = {      
            password: data.password,
        }

        let validate = validateData(params)
        if(validate) return res.status(400).send(validate)

        

        let ExistUser = await User.findOne({username: 'ADMINA'})
        if(ExistUser) return console.log('Admin already Engaged')
        data.password = await encrypt(data.password)
        let defAdmin = new User(data)
        await defAdmin.save()
        return console.log(`Admin ${defAdmin} engaged`)


    
    } catch (err) {
        console.error(err)
        return err
    }
}


//REST 


//ADMIN EXCLUSIVE


exports.save = async(req,res) =>{
  try {
      let data = req.body;
      let existUser = await User.findOne({name: data.name})
      let params = {
          password: data.password
      }
      let validate = validateData(params);
      if(validate) return res.status(400).send(validate)
      data.password = await encrypt(data.password)

      let user = new User(data)

      if(existUser) return res.status(403).send({mgs: 'Sorry this Name is Already Taken'})
      if(data.age < 15) return res.status(403).send({mgs: 'Sorry this Person is not Ready to work'})
      
      await user.save();
      return res.status(200).send({msg: `The User has Been Created `,user})
  } catch (err) {
      return res.status(500).send({msg: 'Error at Saving',err})
  }
}


exports.login = async(req,res)=>{
  try{
  
      let data = req.body;
      let credentials = { 
          username: data.username,
          password: data.password
      }
      let msg = validateData(credentials);
      if(msg) return res.status(400).send(msg)

      let user = await User.findOne({username: data.username});
      
      if(user && await checkPassword(data.password, user.password)) {
          let userLogged = {
            //Obtiene los datos a Mostrar cuando un usario loguea

              name: user.name,
              surname: user.surname,
              username: user.username,
              role: user.role,
              phone: user.phone,
              email: user.email
          }
          let token = await createToken(user)
          return res.send({message: 'User logged sucessfully', token, userLogged});
      }
      return res.status(401).send({message: 'Invalid credentials'});
  }catch(err){
      console.error(err);
      return res.status(500).send({message: 'Error, not logged'});
  }
}




exports.getUsers = async(req,res) =>{
  try {
      let getUsers = await User.find({role: 'EMPLOYEE'}).populate('departament',{password:0})
      return res.status(200).send({getUsers}) // referenciar en front tambien
      
  } catch (err) {
      console.error(err)
      return res.status(500).send({msg: 'Whops! Something went wrong trying to get all users!'})
  }
}


exports.getOneUser = async(req,res) =>{
  try {
    
    let userId = req.params.id;
    let findUser = await User.findOne({_id: userId}).populate('departament',{password:0})
    if(!findUser) return res.status(404).send({msg:'Sorry We could not find this user'})

    return res.status(200).send({findUser})
  } catch (err) {
      return res.status(500).send({msg:'Error At get One User',err})  
  }
}


exports.getProfile =async(req,res)=> {
  try {
      let userToken = req.user                                        //ocultar cualquier dato 1 mostrar / 0 No mostrar
      let findToken = await User.findOne({_id: userToken.sub}).populate('departament')
    //   .populate('departament',{password: 0})
      if(!findToken) return res.status(404).send({message: 'Profile not found'})
      return res.send({findToken})
  } catch (err) {
      console.error(err)
      return res.status(500).send({message:'Error Trying to get The profile'})
      
  }
}




exports.editUser = async(req,res) =>{
  try {
      let userId = req.params.id;
      let data = req.body
      if(data.password || Object.entries(data).length === 0) return res.status(400).send({message: 'Have submitted some data that cannot be updated'});
      let userUpdated = await User.findOneAndUpdate(
          {_id: userId},
          data,
          {new: true} 
      )
      if(!userUpdated) return res.status(404).send({message: 'User not found and not updated'});
      return res.send({message:'User Updated!',userUpdated})
      //usar message
  } catch (err) {
      

      console.error(err)
      return res.status(500).send({ message: "Error At Edit Account" })
  }
}


exports.editProfile = async(req,res) =>{
  try {
      let userId = req.params.id;
      let token = req.user.sub;
      let data = req.body
      let userUpdated = await User.findOneAndUpdate(
          {_id: token},
          data,{new:true}
      )
      if(!userUpdated) return res.status(404).send({ message: "User not found Nor updated"})
      return res.send({userUpdated})

  } catch (err) {
      console.error(err)
      return res.status(500).send({message: "Error At Edit Profile"})
      
  }
}


exports.delete = async(req,res) =>{
  try {
    let idUser = req.params.id;
    let defaultAdmin = await User.findOne({username: 'ADMINA'})
    if(defaultAdmin._id === idUser) return res.status(400).send({msg:'Cannot delete Administrator'});

    let userDeleted = await User.findOneAndDelete({_id: idUser})
    if (!userDeleted) return res.status(404).send({msg:'Sorry We could not find this user nor Deleting it'});
        return res.status(200).send({userDeleted});
  } catch (err) {
      return res.status(500).send({msg:'Error At Deleting One User', err})  
  }
}

//CHAT GET

exports.getAllUsers = async (req, res) => {
  try {
    // Obtener el usuario logueado desde el middleware de autenticación
    const currentUser = req.user;

    if (currentUser.departament === 'ON HOLD') {
      // Si el usuario logueado pertenece al departamento "ON HOLD", no se mostrará ningún usuario
      return res.status(200).send({ getUsers: [] });
    }

    let getUsers;

    if (currentUser.role === 'ADMIN') {
      // Si el usuario logueado es ADMIN, muestra todos los usuarios excepto el usuario logueado
      getUsers = await User.find({ _id: { $ne: currentUser._id } }).populate('departament', { password: 0 });
    } else if (currentUser.role === 'EMPLOYEE') {
      // Si el usuario logueado es EMPLOYEE, muestra solo los usuarios del mismo departamento y el usuario con rol ADMIN excepto el usuario logueado
      getUsers = await User.find({ $or: [{ role: 'ADMIN' }, { departament: currentUser.departament }] }).populate('departament', { password: 0 });
    }

    // Filtrar el usuario logueado de la lista de usuarios
    getUsers = getUsers.filter((user) => !user._id.equals(currentUser._id));

    return res.status(200).send({ getUsers });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ msg: 'Whops! Something went wrong trying to get all users!' });
  }
};

