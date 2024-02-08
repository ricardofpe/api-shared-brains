const mongoose = require("mongoose");

const connectDatabase = () => {
  console.log("Wait connect");

  mongoose
    .connect(
      "mongodb+srv://ricardofpe:kiwiazul15@cluster0.h3xl7sq.mongodb.net/?retryWrites=true&w=majority",
      
    )
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((error) => console.log(error));
};

module.exports = connectDatabase;
