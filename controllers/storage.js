const fs = require("fs");
const  {storageModel} = require("../models");
const {matchedData}  = require("express-validator");//limpiar los datos ingresados
const {handleHttpError} = require("../utils/handleError");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Obtener lista de la base de datos 
 * @param  {*} req
 * @param  {*} res
 */
const getItems = async (req, res) =>{
    try{
        const data = await storageModel.find({});
        res.send({data})
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
        const {id} = matchedData(req);
        const data = await storageModel.findById(id);
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
        const {file}  =  req //reestructurar req.body
        // console.log(file);
        const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
        }   
        const data  = await storageModel.create(fileData);
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
        const {file}  =  req //reestructurar req.body
        // console.log(file);
        const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
        }   
        const data  = await storageModel.create(fileData);
        res.send({data});
    }catch(e){
        handleHttpError(res, 'ERROR EN CREATE ITEMS');
    } 
 };

/**
 * Eliminar un registro 
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) =>{
    try{
        //Consulta para obtener filename(nombre del archivo)
        const {id} = matchedData(req);
        const dataFile = await storageModel.findById(id);
        await storageModel.delete({_id: id});//delete() no elimina el registro lo mantiene como eliminado
        const {filename} = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`;//concatenamos para direccion absoluta 

        // fs.unlinkSync(filePath)//eliminar lo que se encuentre en la ruta si se desea
        const data = {
            filePath,
            deleted:1
        }       
        res.send({data});
    }catch(e){
        handleHttpError(res, 'ERROR EN ELIMINAR ITEM');
    }
};

module.exports = {getItems, getItem, createItem, updateItem, deleteItem};

