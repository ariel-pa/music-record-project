const {validationResult} = require("express-validator");
//manejador de la validacion de resultados
const validateResults = (req, res, next) =>{
    try{
        validationResult(req).throw()
        return next();//Si todo va bien Continua hacia el controlador! 
    }catch(err){
        res.status(403)
        res.send({errors: err.array()});
    }
}

module.exports = {validateResults};