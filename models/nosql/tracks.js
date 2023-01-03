const mongoose =require("mongoose");
const mongooseDelete =require("mongoose-delete");
const TracksSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        album:{
            type: String
        },
        cover:{
            type: String,
            validate:{
                validator: (req) =>{
                    return true;
                },
                message: "ERROR_URL",
            },
        },
        artist:{
            name:{
                type: String,
            },
            nickname:{
                type: String,
            },
            nationality:{
                type: String,
            }
        },
        duration:{
            start: {
                type: Number,
            },
            end: {
                type: Number,
            },
        },
        mediaId:{
            type: mongoose.Types.ObjectId,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);
  
/**
 * Implementar metodo propio con relacion a storages
 */
TracksSchema.statics.findAllData = function(){//TODO: findAllData es solo un nombre puesto.
    const joinData = this.aggregate([
        {
            $lookup:
              {
                from: "storages",
                localField: "mediaId",
                foreignField: "_id",
                as: "audio"
              }
         },
         {
            //TODO: Quita el array
            $unwind: "$audio" 
         }
    ])
    return joinData
};

TracksSchema.statics.findOneData = function(id){//TODO: Pasamos el id
    const joinData = this.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id),
            }
         },
        {
            $lookup:
              {
                from: "storages",
                localField: "mediaId",
                foreignField: "_id",
                as: "audio"
              }
         },
         {
            //TODO: Quita el array
            $unwind: "$audio" 
         }
         
    ])
    return joinData
};

TracksSchema.plugin(mongooseDelete, {overrideMethods: "all"});
module.exports  =mongoose.model("tracks", TracksSchema)