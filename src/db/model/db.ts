import mongoose from 'mongoose'

export async function connectToDatabase() {
  try {
    const url = "mongodb+srv://tamana:tamana@cluster0.o8fimnz.mongodb.net/";
    await mongoose.connect(url);

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connection is open');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
}

// module.exports = {connectToDatabase};