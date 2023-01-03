const bcryptjs = require("bcryptjs")

/**
 * Contraseña sin encriptar: juan12345
 * @param {*} passwordPlain 
 */
const encrypt = async (passwordPlain) =>{
    const  hash =  await bcryptjs.hash(passwordPlain, 10);//10 es la aliatoriedad mas seguro mas alto
    return hash;
}
/**
 * Pasar contraseña sin encryptar y pasar contraseña encryptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async (passwordPlain, hashPassword) =>{
    return await bcryptjs.compare(passwordPlain, hashPassword);
}

module.exports = {encrypt, compare};