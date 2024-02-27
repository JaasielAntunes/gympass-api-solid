/* eslint-disable prettier/prettier */
import { Environment } from "vitest";

export default <Environment>{
  name: "prisma",
  async setup() {
    console.log("setup");

    return {
      teardown() {
        console.log("teardown");
      },
    };
  },

  transformMode: "web",
};
