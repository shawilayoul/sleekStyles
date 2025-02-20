const mongoose = require("mongoose");
const dbconnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 50000, // Increase timeout
    });
    console.log(`mongobd connected successfully ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbconnect;
