const { createClient } = require("redis");

const redisClient = new createClient({
    url: process.env.REDIS_URL
});

redisClient.on("error", (err) => {
    console.error("Redis Error: ", err);
})

module.exports = redisClient;