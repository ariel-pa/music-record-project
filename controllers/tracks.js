const  {tracksModel} = require("../models");
const {matchedData}  = require("express-validator");//limpiar los datos ingresados
const {handleHttpError} = require("../utils/handleError");

/**
 * Obtener lista de la base de datos 
 * @param  {*} req
 * @param  {*} res
 */
const getItems = async (req, res) =>{
    try{
        const user = req.user;
        const data = await tracksModel.findAllData({});
        res.send({user, data});
    }catch(e){
        handleHttpError(res, 'ERROR EN GET ITEMS');
    }    
};

/**
 * obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) =>{
    try{
        req = matchedData(req);//limpiesa para el id
        const {id} = req;
        const data = await tracksModel.findOneData(id);
        res.send({data});
    }catch(e){
        handleHttpError(res, "ERROR GET ITEM");
    }
};

/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
 const createItem = async (req, res) =>{    
    try{
        // const body  = req.body;
        const bodyClean = matchedData(req);//optiene los datos limpios sin basura
        // const {body}  =  req //reestructurar req.body

        const data  = await tracksModel.create(bodyClean);
        res.send({data});
    }catch(e){
        handleHttpError(res, 'ERROR EN CREATE ITEMS');
    }
};

/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
 const updateItem = async (req, res) =>{ 
    try{
        //de un obejeto crear dos objetos
        const {id, ...bodyClean} = matchedData(req);//se optiene el id y con ... el body
        const data  = await tracksModel.findOneAndUpdate(id, bodyClean);
        res.send({data});
    }catch(e){
        handleHttpError(res, 'ERROR EN UPDATE ITEM');
    }
};

/**
 * Eliminar un registro 
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) =>{
    try{
        const {id} = matchedData(req);
        const data  = await tracksModel.delete({_id: id});
        res.send({data});
    }catch(e){
        handleHttpError(res, 'ERROR EN ELIMINAR ITEM');
    }
};

module.exports = {getItems, getItem, createItem, updateItem, deleteItem};