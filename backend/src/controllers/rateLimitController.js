const { checkRateLimit } = require("../services/rateLimitService.js")

async function handleRateLimitCheck(req, res) {

    try{
        const apiKey = req.header("x-api-key");
        const result = await checkRateLimit(apiKey);

        if(result.status === 400){
            return res.status(400).json(result.body);
        }

        res.set({
            "X-RateLimit-Limit": result.body.limit,
            "X-RateLimit-Remaining": result.body.remaining,
            "X-RateLimit-Reset": result.body.resetInSeconds,
        });

        return res.status(result.status).json(result.body);

    }catch(error){
        console.error("Rate limit check failed: ", error);
        return res.status(500).json({error: "Internal server error"});
    }
    
};

module.exports = {
    handleRateLimitCheck,
}