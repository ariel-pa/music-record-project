require("dotenv").config();
const express =  require("express");
const cors  = require ("cors");
const morganBody =  require("morgan-body");
const {loggerStream} = require("./utils/handleLogger");
const dbConnectNoSql = require('./config/mongo');
const {dbConnectMySql} = require("./config/mysql")

const ENGINE_DB = process.env.ENGINE_DB;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));//obtener los archivos estaticos de storage

//TODO: envio de notificaciones 
morganBody(app,{
    noColors: true,
    stream: loggerStream,
    skip: function(req, res){
        return res.statusCode < 400;//Retorna codigo de error mayor a 400 si es menor lo omite
    }
})

const port = process.env.PORT || 3000;

//invocamos las rutas
app.use("/api", require("./routes"));

app.listen(port, () =>{
    console.log(`Tu app esta lista por http://localhost:${port}`);
});

(ENGINE_DB === "nosql") ? dbConnectNoSql() : dbConnectMySql();