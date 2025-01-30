import type { ErrorDTO } from "@/shared/api";

export const UNAUTHORIZED_STATUS = 401;

export const SERVER_AUTH_ERROR: ErrorDTO = {
  status: UNAUTHORIZED_STATUS,
  message: "Unauthorized",
  timestamp: new Date(),
};
