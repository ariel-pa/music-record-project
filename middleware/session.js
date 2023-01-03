const { usersModel } = require("../models");
const {handleHttpError} = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");

const {getProperties} =require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();//Ejecuta solo una ves la funcion

const authMiddleware  = async (req, res, next) => {
    try{
        if(!req.headers.authorization){
            handleHttpError(res, "NEED SESSION", 401);
            return
        }

        const token  = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        //Si el token es vacio
        if(!dataToken){
            handleHttpError(res, "NOT PAYLOAD DATA", 401);
            return
        }
        // if(!dataToken._id){
        //     handleHttpError(res, "NOT ID TOKEN", 401);
        //     return
        // }


        //obtenemos datos del usuario que ingreso
        const query = {
            [propertiesKey.id]: dataToken[propertiesKey.id]
        }
        const user = await usersModel.findOne(query)
        req.user = user;

        next();
    }catch(e){
        handleHttpError(res, "NOT SESSION", 401);
    }
}

module.exports = {authMiddleware}