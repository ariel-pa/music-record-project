const ENGINE_DB = process.env.ENGINE_DB
//TODO: Normalizamos el id de nosql con mysql
const getProperties = async () => {
    const data = {
        nosql:{
            id:'_id'
        },
        mysql:{
            id:'id'
        }
    }
    return data[ENGINE_DB];
};

module.exports = {getProperties};
