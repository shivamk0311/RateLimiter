require("dotenv").config();
const app  = require("./app");
const redisClient = require("./config/redis.js");

const PORT = process.env.PORT || 5500;

const startServer  = async () => {
    try{
        await redisClient.connect();
        console.log('Connected to Redis.')

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }catch(error){
        console.error("Failed to  start server: ", error);
        process.exit(1);
    }
}

startServer();

