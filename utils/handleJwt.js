const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const {getProperties} =require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();//Ejecuta solo una ves la funcion
/**
 * Pasar el objeto usuario
 * @param {*} user 
 */
const tokenSing = async (user) => {
    const sign = await jwt.sign(
        {
        [propertiesKey.id]: user[propertiesKey.id],//dinamicamente depende del motor de BD se optiene el id
        role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"//Tiempo de expiracion
        }
    );
    return sign;
};
/**
 * Debes de pasar el token de sesion el JWT
 * @param {*} tokenJWT 
 * @returns 
 */
const verifyToken = async (tokenJWT) => {
    try{
        return jwt.verify(tokenJWT, JWT_SECRET);
    }catch(e){
        return null;
    }
};

module.exports = {tokenSing, verifyToken};
