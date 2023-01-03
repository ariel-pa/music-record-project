const { handleHttpError } = require("../utils/handleError");

/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */
const checkRol = (roles) =>  async (req, res, next) =>{
    try{
        const {user} = req;
        // console.log(user);
        const rolesByUser = user.role; //TODO ["user"] por defecto

        //TODO: ["admin", "manager"] Comparamos si existe el rol 
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle));//TODO: true o false
        if(!checkValueRol){
            handleHttpError(res, "USER NOT PERMISSIONs", 403)
            return
        }
        next();
    }catch(e){
        handleHttpError(res, "ERROR PERMISSIONS", 403);
        return
    }
    
}

module.exports = {checkRol};