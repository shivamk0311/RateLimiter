const redisClient = require("../config/redis.js")

const WINDOW_SIZE_IN_SEC = 60;
const MAX_REQUESTS = 5;

async function checkRateLimit(apikey){

    if(!apikey){
        return {
            allowed: false,
            status: 400,
            body: {error : 'Missing x-api-key header'}
        }
    }

    const currWindow = Math.floor((Date.now() /1000) / WINDOW_SIZE_IN_SEC);
    const redisKey = `redisKey:${apikey}:${currWindow}`;

    const currCount =  await redisClient.incr(redisKey);

    if(currCount === 1){
        await redisClient.expire(redisKey, WINDOW_SIZE_IN_SEC);
    }

    const remaining = Math.max(0,MAX_REQUESTS - currCount);
    const resetInSeconds = WINDOW_SIZE_IN_SEC - (Math.floor(Date.now() / 1000) % WINDOW_SIZE_IN_SEC);

    return {
        allowed: currCount <= MAX_REQUESTS,
        status: currCount <= MAX_REQUESTS ? 200 : 429,
        body: {
            allowed: currCount <=  MAX_REQUESTS,
            apikey,
            limit: MAX_REQUESTS,
            currCount,
            remaining,
            resetInSeconds
        },
    };

};

module.exports =  {
    checkRateLimit,
};
