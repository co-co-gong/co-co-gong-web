import { createQueryKeys } from "@lukemorales/query-key-factory";

import type { GetUserOutDTO } from "@/entities/user/api";

import { authApiClient } from "@/shared/api/auth/authApiClient";
import type { ApiResponseDTO } from "@/shared/api/common.interface";

export const userQueries = createQueryKeys("user", {
  getMe: {
    queryKey: ["getMe"],
    queryFn: () => authApiClient.get<ApiResponseDTO<GetUserOutDTO>>("api/users/me").json(),
  },
});
