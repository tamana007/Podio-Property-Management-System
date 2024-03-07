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
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true }
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now }
});

// Create a model using the schema
const User = mongoose.model<IUser>('User', userSchema);

export default User;