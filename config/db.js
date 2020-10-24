const mongoose = require("mongoose");
const config = require("config");

const MONGO_URI = config.get("MONGO_URI");

const connectDB = async () => {
  const conn = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  console.log(`MongoDB connected ${conn.connection.host}`);
};

module.exports = connectDB;
