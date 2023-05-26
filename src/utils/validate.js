'use strict';

const bcrypt = require('bcrypt');

exports.validateData = (data)=>{
    let keys = Object.keys(data),msg = '';
    for(let key of keys){
        if( data[key] !== undefined &&
            data[key]!== null &&
            data[key]!== '' &&
            data[key]!== 'undefined' &&
            data[key]!== 'null' &&
            data[key]!== 'NaN')
            msg += `Params ${key} is required`
    }
    return msg.trim()
}

exports.encrypt = async()=>{
    try {
        return await bcrypt.hash(password,10)
    } catch (err) {
        console.error(err)
        return err;
        
    }
}

exports.checkPassword = async(password, hash)=>{
    try {
        return await bcrypt.compare(password, hash)
    } catch (err) {
        console.error(err)
        return false;
    }
}

exports.checkUpdate = (data)=>{
    if(Object.entries(data).length === 0 ||
    data.user || data.user == '') {
        return false;
    }
    return true;
}