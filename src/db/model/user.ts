import mongoose, { Schema, Document } from 'mongoose';



// Define an interface representing a document in MongoDB
interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  // createdAt: Date;
  // updatedAt: Date;
}

// Define the schema
const userSchema: Schema = new Schema({
  username: { type: String,required: true, default:'tau'},
  password: { type: String,default:'ali' },
  email: { type: String, required: true ,default:'samad@gmail.com'}
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now }
});

// Create a model using the schema
const UserReg = mongoose.model<IUser>('User', userSchema,'registerUser');

export default UserReg;