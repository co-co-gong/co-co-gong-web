import { type ApiResponseDTO, apiServer } from "@/shared/api";

interface User {
  username: string;
  email: string;
}

export const getUserApi = (userId: number) =>
  apiServer<ApiResponseDTO<User>>(`/api/users/rldnd/${userId}`, { cache: "force-cache" });
