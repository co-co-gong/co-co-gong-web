"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import type { GetUserOutDTO } from "@/entities/user/api";

import { ApiResponseDTO } from "@/shared/api";
import { authApiClient } from "@/shared/api/auth/authApiClient";

const Test: React.FC = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["test"],
    queryFn: () => authApiClient.get<ApiResponseDTO<GetUserOutDTO>>("api/users/me").json(),
  });

  return (
    <>
      CLIENT GET ME: {data.data.email} {data.data.username}
    </>
  );
};

export default Test;
