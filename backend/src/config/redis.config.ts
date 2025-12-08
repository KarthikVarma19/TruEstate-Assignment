import { createClient } from "redis";
import { APP_CONFIG } from "../env";

/**
[1] GET /api/sales?page=1&pageSize=10&sort=date_desc 304 361.817 ms - - this is the uncached response
[1] GET /api/sales?page=1&pageSize=10&sort=date_desc 304 31.897 ms - - this is the cached response
*/

const client = createClient({
  username: APP_CONFIG.REDIS_USERNAME,
  password: APP_CONFIG.REDIS_PASSWORD,
  socket: {
    host: APP_CONFIG.REDIS_HOST,
    port: Number(APP_CONFIG.REDIS_PORT),
  },
});

client.on("error", (err) => {
  throw new Error("Redis Client Error: " + err);
});

export async function connectToRedis(): Promise<void> {
  try {
    await client.connect();
    console.log("Redis Connected");
  } catch (error) {
    console.error("Redis Connection Failed", error);
    process.exit(1);
  }
}

export async function getRedisValue(key: string): Promise<string | null> {
  return client.get(key);
}

export async function setRedisValue(key: string, value: string, expirySeconds?: number): Promise<void> {
  if (expirySeconds) {
    await client.set(key, value, { EX: expirySeconds });
  } else {
    await client.set(key, value);
  }
}

export async function removeAllRedisKey(): Promise<void> {
  await client.flushAll();
}

export async function getRedisBuffer(key: string): Promise<Buffer | null> {
  const result = await client.sendCommand(["GET", key]);
  if (typeof result === "string" || result instanceof Uint8Array) {
    return Buffer.from(result);
  }
  return null;
}

export async function setRedisBuffer(key: string, value: Buffer, expirySeconds?: number): Promise<void> {
  const args = ["SET", key, value];
  if (expirySeconds) {
    args.push("EX", expirySeconds.toString());
  }
  await client.sendCommand(args);
}

// Get Redis Memory Usage If Under Limit Or Not at max (30mb) because of free tier
export const getRedisMemoryUsage = async (): Promise<{ usedMemory: string; usedMemoryHuman: string; peakMemory: string }> => {
  try {
    const memoryInfo = await client.sendCommand<string>(["INFO", "MEMORY"]);

    if (typeof memoryInfo !== "string") {
      throw new Error("Unexpected Redis INFO response type");
    }

    const memoryStats = Object.fromEntries(
      memoryInfo
        .split("\r\n")
        .filter((line) => line && !line.startsWith("#"))
        .map((line) => line.split(":"))
    );

    const redisMemoryInfo: { usedMemory: string; usedMemoryHuman: string; peakMemory: string } = {
      usedMemory: `${(memoryStats.used_memory / 1024 / 1024).toFixed(2)} MB`,
      usedMemoryHuman: memoryStats.used_memory_human,
      peakMemory: memoryStats.used_memory_peak_human,
    };
    return redisMemoryInfo;
  } catch (err) {
    console.error("Error fetching Redis memory info:", err);
    return {
      usedMemory: "0 MB",
      usedMemoryHuman: "0B",
      peakMemory: "0B",
    };
  }
};

export const checkRedisMemoryUsageUnderLimit = async (): Promise<boolean> => {
  const redisMemoryInfo = await getRedisMemoryUsage();
  const limitMB = 25;
  const peakMemoryStr = redisMemoryInfo.peakMemory;

  // Extract numeric value and unit (e.g., "19M", "512K", "0B")
  const match = peakMemoryStr.match(/^(\d+(?:\.\d+)?)([KMG]?)B?$/i);
  if (!match) {
    throw new Error(`Unexpected peakMemory format: ${peakMemoryStr}`);
  }

  let [, value, unit] = match;
  let peakMB = parseFloat(value ?? "0");

  switch (unit?.toUpperCase() ?? "") {
    case "G":
      peakMB *= 1024;
      break;
    case "K":
      peakMB /= 1024;
      break;
    case "B":
      peakMB /= 1024 * 1024;
      break;
    default:
      break;
  }

  return peakMB < limitMB;
};