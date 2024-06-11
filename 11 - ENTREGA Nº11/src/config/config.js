const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { program } = require('../utils/commander');
const path = require('path');

const mode = program.opts().mode;

// Corrige la forma en que se determina la ruta del archivo .env
dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
});


const configObject = {
  port: process.env.PORT || 8080,
  mongo_url: process.env.MONGO_URL,
  private_key: process.env.PRIVATE_KEY || 'palabrasecretaparatoken',
};

exports.configObject = configObject;

exports.connectToDatabase = async () => {
    try {
        await mongoose.connect(configObject.mongo_url);
        console.log('Base de datos conectada');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};


