import mongoose from 'mongoose';
import Colors from 'colors';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect (process.env.MONGO_URI);
    console.log (`Connected to mongoDb ${conn.connection.host}`.green.bgWhite);
  } catch (error) {
    console.log (`error in mongoDb ${error}`.bgRed.white);
  }
};

export default connectDB;
