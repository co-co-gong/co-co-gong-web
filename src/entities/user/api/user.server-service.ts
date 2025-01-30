import type { GetUserOutDTO } from "@/entities/user/api/user.interface";

import { type ApiResponseDTO } from "@/shared/api";
import { authApiServer } from "@/shared/api/auth";

export const getMeApi = () =>
  authApiServer.get<ApiResponseDTO<GetUserOutDTO>>("/api/users/me", {
    cache: "no-cache",
    tags: ["users", "/api/users/me"],
  });
