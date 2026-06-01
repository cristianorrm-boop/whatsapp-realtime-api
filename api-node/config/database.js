const mongoose = require("mongoose");

async function connectDatabase() {

  try {

    await mongoose.connect(process.env.MONGO_URL);

    console.log("[LOG]: MongoDB conectado 🚀");

  } catch (error) {

    console.log("[ERROR]: Erro ao conectar MongoDB", error);

  }

}

module.exports = connectDatabase;