/* eslint-disable prettier/prettier */
import { randomUUID } from "node:crypto";
import { Environment } from "vitest";
import "dotenv/config";
import { execSync } from "node:child_process";

// "postgresql://docker:docker@localhost:5432/apisolid?schema=public"

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Forneça uma variável de ambiente DATABASE_URL!");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set('schema', schema);
  return url.toString();
}

export default <Environment>{
  name: "prisma",
  async setup() {
    const schema = randomUUID();
    const databaseUrl = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseUrl;

    execSync("npx prisma migrate deploy");

    return {
      teardown() {
        console.log("teardown");
      },
    };
  },

  transformMode: "ssr",
};
