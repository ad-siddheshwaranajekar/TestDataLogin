import dotenv from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";

type EnvName = "dev" | "qat" | "uat";
type AllyKey = "ally1" | "ally2" | "ally3";

// Load .env (local only, CI env wins)
dotenv.config({
  path: join(__dirname, "../../.env"),
  override: false,
});

// Normalize env
const ENV = (process.env.TEST_ENV || "qat").toLowerCase() as EnvName;

// Load environment URLs
const envData = JSON.parse(
  readFileSync(join(__dirname, `../testURL/${ENV}.json`), "utf-8"),
);

// Helper to fetch ally credentials
function getAlly(ally: AllyKey) {
  const prefix = ENV.toUpperCase(); // QAT | UAT | DEV
  const key = ally.toUpperCase(); // ALLY1

  return {
    username: process.env[`${prefix}_${key}`],
    password: process.env[`${prefix}_${key}_PASSWORD`],
  };
}

export const TestConfig = {
  env: ENV,
  baseUrl: envData.baseUrl,

  allies: {
    ally1: getAlly("ally1"),
    ally2: getAlly("ally2"),
    ally3: getAlly("ally3"),
  },
};
