const express = require("express");
const { checkRateLimitMiddleware } = require("../middleware/rateLimitMiddleware.js");

const router = express.Router();

router.get("/public", (req, res) => {
    res.json({message: 'Public route - no rate limit.'})
})

router.get("/protected", checkRateLimitMiddleware, (req, res) => {
    res.json({
        message: "You accessed a protected route.",
        success: true,
    });
});

module.exports = router;