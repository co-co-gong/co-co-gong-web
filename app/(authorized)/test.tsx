"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import type { GetUserOutDTO } from "@/entities/user/api";

import { ApiResponseDTO } from "@/shared/api";
import { authApiClient } from "@/shared/api/auth/authApiClient";

const Test: React.FC = () => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ["test"],
    queryFn: () => authApiClient.get<ApiResponseDTO<GetUserOutDTO>>("api/users/me").json(),
  });

  return (
    <>
      CLIENT GET ME: {data?.data.email} {data?.data.username}
      <button type="button" onClick={() => refetch()}>
        Refetch
      </button>
    </>
  );
};

export default Test;
