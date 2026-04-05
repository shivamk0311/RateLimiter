const express = require("express");
const pool = require("./config/db.js");
const cors = require("cors");
const rateLimitRoutes = require("./routes/rateLimitRoutes.js");
const testRoutes = require("./routes/testRoutes.js");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);
app.use(express.json());


app.get("/api/health", (req, res) => {
    res.json({message : "Backend is running!"});
})

app.get("/api/db-test", async (req, res) => {
    try{
        const result = await pool.query("SELECT NOW()");
        res.json({message : 'Postgres connected', time : result.rows[0].now })
    }catch(error){
        res.status(500).json({error: error.message});
    }   
})

// app.use("/api/rate-limit",rateLimitRoutes);
app.use("/api/test", testRoutes);

module.exports = app;


