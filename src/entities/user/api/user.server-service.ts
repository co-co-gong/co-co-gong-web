import type { GetUserOutDTO } from "@/entities/user/api/user.interface";

import { type ApiResponseDTO } from "@/shared/api";
import { authApiServer } from "@/shared/api/auth";

/** 자기 정보 얻기 */
export const getMeApi = () =>
  authApiServer.get<ApiResponseDTO<GetUserOutDTO>>("/api/users/me", {
    cache: "no-store",
    tags: ["users", "/api/users/me"],
  });
