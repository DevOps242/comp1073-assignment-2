const mongoose = require('mongoose');                                           // require the mongoose connector
const dotenv = require('dotenv');                                               // require the dotenv to load config variables
dotenv.config({path: './config/config.env'});                                   // Load config

// Mongoose return the data back as a promise so this means we must fetch it asynchronously 
const connectDB = async () => {

    // Try to connect to the database
    try {
        // connect to the mongo service, with optional configs.
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // useNewURLParser: true, 
            // useUnifiedTopolgy: true

        })
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        // log the error to the terminal that is running the server.
        console.error(error);
        // end the process with an error code.
        process.exit(1);
    }
}

module.exports = connectDB;
