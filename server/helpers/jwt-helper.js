const jwt = require('jsonwebtoken');

const secretKey = "Shlomo-and-Amit-Whatsup-app";

function getNewToken(user){
    const payload = { user };
    const token = jwt.sign(payload, secretKey,{expiresIn: "5h"});
    return token;
}

function verifyToken(authenticationHeader){
    return new Promise(res => {

        // if no header sent in the request
        if(!authenticationHeader){
            res(false);
            return;
        }
        const token = authenticationHeader.split(" ")[1];
        // if no token exists
        if(!token){
            res(false);
            return;
        }
        jwt.verify(token, secretKey, (err,payload)=> { // payload = { user }
            // if token is invalid or expired
            if(err){
                res(false);
                return;
            }
            res(true);
        });
    })
}

function getUserFromToken(authHeader){
    const token = authHeader.split(" ")[1];
    const payload = jwt.decode(token);
    return payload.user;
}

module.exports = {
    getNewToken,
    verifyToken,
    getUserFromToken
}