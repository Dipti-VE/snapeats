import { createClient } from "redis";

let redisClient = null;

if (process.env.REDIS_URL && process.env.REDIS_URL.startsWith("redis://")) {
  redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.on("error", (err) => {
    console.log("Redis Error:", err.message);
  });

  (async () => {
    try {
      await redisClient.connect();
      console.log("✅ Redis Connected");
    } catch (err) {
      console.log("⚠️ Redis Connection Failed:", err.message);
    }
  })();
} else {
  console.log("⚠️ Redis disabled (REDIS_URL not configured)");
}

export default redisClient;