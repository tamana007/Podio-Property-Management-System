import mongoose,{Schema,Document} from "mongoose";


//Define an interface representing a focument in Mongoose

interface IWebform extends Document{
  useId:number;
  createdBy:string;
  sellerName:string;
  sellerPhone:number;
  sellerOtherPhone:number;
  sellerEmail:string;
  address:string;
  note:string;
  motivation:boolean;
  idealPrice:number;
}

//Define the Schema
 const webformSchema: Schema=new Schema({
  userId:{},
  createdBy:{type:String,required:true},
  sellerName:{type:String},
  sellerPhone:{type:Number},
  sellerOtherPhone:{type:Number},
  sellerEmail:{type:String},
  address:{type:String},
  note:{type:String},
  motivation:{type:Boolean},
  idealPrice:{type:Number},
 })

 //Create a model Using Schema
 const Webform=mongoose.models.reginsterLead || mongoose.model('reginsterLead',webformSchema)

