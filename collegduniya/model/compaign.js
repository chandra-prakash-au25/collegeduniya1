const mongoose =require('mongoose');


const compaign = new mongoose.Schema({
project_id:{type:String},
campaign_name:{type:String},
opens:{type:Number,default:0},
clicks:{type:Number,default:0},
status:{type:Boolean,default:1}
}, { timestamps: true });

module.exports = mongoose.model("compaign", compaign);


