import mongoose,{Schema,Document} from "mongoose";


//Define an interface representing a document in Mongoose

interface IWebform extends Document{
  useId:number;
  createdBy:string;
  sellerName:string;
  sellerPhone:number;
  sellerOtherPhone:number;
  sellerEmail:string;
  otherEmail:string;
  address:string;
  note:string;
  motivation:string;
  idealPrice:number;
}

//Define the Schema
 const webformSchema: Schema=new Schema({
  userId:{type:Number},
  createdBy:{type:String,required:true},
  sellerName:{type:String},
  sellerPhone:{type:Number},
  sellerOtherPhone:{type:Number},
  sellerEmail:{type:String},
  otherEmail:{type:String},
  address:{type:String},
  note:{type:String},
  motivation:{type:String},
  idealPrice:{type:Number},
 })

 //Create a model Using Schema
 const Webform=mongoose.models.registerLead || mongoose.model('registerLead',webformSchema)

 export default Webform;

