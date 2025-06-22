import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const HEARTBEAT_URL = process.env.HEARTBEAT_URL;
const HEARTBEAT_API_KEY = process.env.HEARTBEAT_API_KEY;

async function checkHeartbeat() {
  try {
    const response = await axios.get(HEARTBEAT_URL, {
      headers: {
        'Authorization': `Bearer ${HEARTBEAT_API_KEY}`
      }
    });
    return response.data.status === "OK";
  } catch (error) {
    console.error("Heartbeat error:", error.message);
    return false;
  }
}

async function initHeartbeatChecker() {
  // Skip heartbeat check if URL not configured or in production
  if (!HEARTBEAT_URL || process.env.NODE_ENV === 'production') {
    console.log("ℹ️ Heartbeat checker disabled");
    return;
  }

  const alive = await checkHeartbeat();
  if (!alive) {
    console.error("[ALERT] Application terminated remotely.");
    process.exit(1);
  }

  setInterval(async () => {
    const stillAlive = await checkHeartbeat();
    if (!stillAlive) {
      console.error("[ALERT] Application terminated remotely.");
      process.exit(1);
    }
  }, 43200000); // 12 hours in milliseconds
}

export default initHeartbeatChecker;
