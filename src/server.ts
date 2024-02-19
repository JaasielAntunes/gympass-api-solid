import { app } from "./app";
import { env } from "./env";

app
  .listen({
    host: "0.0.0.0", // evitar problemas de consumo da API
    port: env.PORT,
  })
  .then(() => {
    console.log("🚀 HTTP server running on port: http://localhost:3333");
  });
