'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var key = 'admin123'; 

exports.createToken = (users)=>{
    var payload = {
        sub: users.registroAcademico,
        nameU: users.nameU,
        lastnameU: users.lastnameU,
        email: users.email,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix() // 30 days expiration
    }
    return jwt.encode(payload, key);
}