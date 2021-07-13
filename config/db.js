// CONECCTION LOGIC : mango db conection

const mongoose = require("mongoose");

const config = require("config"); // para obtener la variable de default.json

const db = config.get("mongoURI"); //para obtener el valor del default.json

//mongoose.connect(db) implica promesas con (.then, .catch), instead we goona use async/await :
const connectDB = async () => {
  // Para conectar con mongoDB (para llamar en server.js)
  try {
    // si tenemos un error que no podemos conectar, usamos este block cuando usamos async/await
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }); // lo utilizamos para quitar el warning "deprecationWarning"
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
