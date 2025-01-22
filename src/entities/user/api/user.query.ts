import { createQueryKeys } from "@lukemorales/query-key-factory";

import { apiClient } from "@/shared/api";

export const userQueries = createQueryKeys("users", {
  getUsers: (userId: number) => ({
    queryKey: ["user", userId],
    queryFn: () => apiClient.get(`api/users/rldnd/${userId}`),
  }),
});
