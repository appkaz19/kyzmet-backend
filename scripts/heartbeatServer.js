const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;
const SECRET = "your_heartbeat_api_key";

app.get("/status-check", (req, res) => {
    const authHeader = req.headers["authorization"];

    if (authHeader !== `Bearer ${SECRET}`) {
        return res.status(403).json({ status: "KILL" });
    }

    res.json({ status: "OK" });
});

app.listen(PORT, () => {
    console.log(`Heartbeat server running on port ${PORT}`);
});
