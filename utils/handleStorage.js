const multer = require("multer");
/**
 * 
 */
 const storage  =  multer.diskStorage({
    destination: function(req, file, cb){
        const pathStorage = `${__dirname}/../storage`;//guarda en estorage
        cb(null, pathStorage);
    },
    filename: function(req, file, cb){

        const ext = file.originalname.split(".").pop(); //otener de file .extencion 
        const filename  = `file-${Date.now()}.${ext}`;//file-1214.extencion
        cb(null, filename);
    }
});

const uploadMiddlerware = multer({storage});

module.exports = uploadMiddlerware
/**
 * 
 */