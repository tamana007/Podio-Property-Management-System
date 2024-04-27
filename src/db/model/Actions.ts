import mongoose, { Schema,Document } from "mongoose";

//Define the interface
interface IActions extends Document{
  leadId:number|null;
  leadAssignment:string;
disposition:string;
createdBy:string;
region:string;
stageofLead:string;
}

//Create Schema
const actionSchema: Schema=new Schema({
  leadId:Number,
  leadAssignment:String,
  disposition:String,
  createdBy:String,
  region:String,
  stageofLead:String,
})

//Create the Model

const ActionModel=mongoose.models.action || mongoose.model('action',actionSchema);
export default ActionModel;
