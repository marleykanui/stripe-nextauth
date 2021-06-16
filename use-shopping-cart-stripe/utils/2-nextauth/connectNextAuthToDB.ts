// utils/dbConnect.js
import { connect, connection } from 'mongoose';

const connectNextAuthToDB = async () => {
  if (connection.readyState >= 1) {
    // if connection is open return the instance of the databse for cleaner queries
    return connection.db;
  }

  return connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    poolSize: 10, //increase poolSize from default 5
  });
};

export default connectNextAuthToDB;
