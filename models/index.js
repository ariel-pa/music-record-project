
const engine = process.env.ENGINE_DB || null;

const pathModels = engine === "nosql" ? "./nosql" : "./mysql"

const models = {
    usersModel: require(`${pathModels}/users`),
    tracksModel: require( `${pathModels}/tracks`),
    storageModel: require(`${pathModels}/storage`)
    
}

module.exports = models