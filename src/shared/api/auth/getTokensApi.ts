import { headers } from "next/headers";

export const getTokensApi = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/tokens`, { headers: await headers() });
  return await response.json();
};
