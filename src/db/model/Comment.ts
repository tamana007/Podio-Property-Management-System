import mongoose, { Schema, Document } from "mongoose";

//Define Interface

interface IComments extends Document {
  commenter: string;
  time: Date;
  comment: string;
  mleadId:Number;
}

//Define Schema

const commentSchema: Schema = new Schema({
  commenter: { type: String ,default:"user"},
  time: { type: Date, default:Date.now },
  comment: { type: String },
  mleadId:{type:Number},
});


//Create a  Model

const Comment=mongoose.models.userComment || mongoose.model('userComment',commentSchema)

export default Comment;