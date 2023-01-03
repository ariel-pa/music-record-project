const {Sequelize} = require("sequelize");

const database = process.env.MSQL_DATABASE;
const username = process.env.MSQL_USER;
const password = process.env.MSQL_PASSWORD;
const host = process.env.MSQL_HOST;

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect: "mysql"
    }  
);
const dbConnectMySql = async () =>{
    try{
        await sequelize.authenticate();
        console.log("MYSQL Conexion correcta");
    }catch(e){
        console.log("MYSQL Error de conexion",e);
    }
}
module.exports = {dbConnectMySql,sequelize};

