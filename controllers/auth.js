const {matchedData}  = require("express-validator");//limpiar los datos ingresados
const {encrypt, compare} = require("../utils/handlePassword");
const {usersModel} = require("../models/index")
const  {tokenSing} = require("../utils/handleJwt");
const {handleHttpError} = require("../utils/handleError");

/**
 * Controlador encargado de registrar
 * @param {*} req 
 * @param {*} res 
 */
const createUser = async (req, res) =>{
    try{
        req = matchedData(req);
        const passwordHash= await encrypt(req.password);
        const body  = {...req, password: passwordHash};//si existe password en el objeto reescribir con password: passwordHash
        const dataUser  = await usersModel.create(body);
        dataUser.set("password", undefined, {strict:false});//ya nomuestra el password por seguridad
    
        const data = {
            token: await tokenSing(dataUser),
            user: dataUser 
        }
        res.send({data});
    }catch(e){
        console.log(e);
        handleHttpError(res, 'ERROR EN CREATE USER');
    }
}

/**
 * Controlador encargado de autenticar usuario
 * @param {*} req 
 * @param {*} res 
 */
const loginUser = async (req, res) =>{
    try{
        req = matchedData(req);
        //buscar usuario
        const user = await usersModel.findOne({email: req.email})//.select("password")//TODO: permite traer el passwor ya que al registrar no debia devolver select:false
        console.log(user)
        if(!user){
            handleHttpError(res, 'USER NOT EXISTS', 404);
            return //return: qui acabo
        }
        const passwordHash= user.password;
        const check = await compare(req.password, passwordHash);

        if(!check){
            handleHttpError(res, 'PASSWORD INVALID', 401);
            return //return: qui acabo
        }

        // user.set("password", undefined, {strict: false});
        const data = {
            token: await tokenSing(user),
            user
        }
    
        res.send({data});
    }catch(e){
        console.log(e)
        handleHttpError(res, 'ERROR EN LOGIN USER');
    }
}

module.exports = {createUser, loginUser};