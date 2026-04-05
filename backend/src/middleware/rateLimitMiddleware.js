const { checkRateLimit }  = require("../services/rateLimitService.js")

async function checkRateLimitMiddleware(req, res, next){
    try{

        const apiKey = req.header("x-api-key");
        const result = await checkRateLimit(apiKey);

        if(result.status === 400){
            return res.status(400).json(result.body);
        }

        res.set({
            "X-RateLimit-Limit" : result.body.limit,
            "X-RateLimit-Remaining" : result.body.remaining,
            "X-RateLimit-Reset" : result.body.resetInSeconds
        })

        if(!result.allowed){
            return res.status(429).json(result.body);
        }

        next();

    }catch(error){
        console.error("Rate Limit Middleware failed: ", error)
        return res.status(500).json({ error: "Internal Server Error."})
    }
}

module.exports = {checkRateLimitMiddleware};