import { createQueryKeys } from "@lukemorales/query-key-factory";

import { apiClient, ApiResponseDTO } from "@/shared/api";

interface User {
  username: string;
  email: string;
}

export const userQueries = createQueryKeys("users", {
  getUsers: (userId: number) => ({
    queryKey: ["user", userId],
    queryFn: async () => apiClient.get<ApiResponseDTO<User>>(`api/users/rldnd/${userId}`).json(),
  }),
});
