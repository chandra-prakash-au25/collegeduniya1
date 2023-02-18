const mongoose =require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const project = new mongoose.Schema({
project_name:{type:String,Unique:true},
open_cost:{type:Number,default:5},
target_opens:{type:Number,default:100},
click_cost:{type:Number,default:10},
target_clicks:{type:Number,default:50},
status:{type:Boolean,default:1}
}, { timestamps: true });
project.plugin(mongoosePaginate);
module.exports = mongoose.model("project", project);