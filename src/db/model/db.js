// import {Mongoclient} from 'mongodb';
import mongoose from 'mongoose'

const coneection=async()=>{
  try {
    
    const url='mongodb+srv://tamana:tamana@cluster0.o8fimnz.mongodb.net/';
    await mongoose.connect(url);
    mongoose.connection.on('connect',()=>{
      console.log('mongose successfuly connect');

    })
  } catch (error) {
    mongoose.connection.on('error',()=>{
      console.log('error conecting to Mongodb',error);

    })
    
  }

}