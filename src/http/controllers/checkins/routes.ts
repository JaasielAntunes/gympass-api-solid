import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/gyms/:gymId/checkins", create);
  app.patch(
    "/checkins/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validate,
  );

  app.get("/checkins/history", history);
  app.get("/checkins/metrics", metrics);
}
