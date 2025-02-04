import ky from "ky";

import { UNAUTHORIZED_STATUS } from "@/shared/constants/auth";
import { getClientAccessToken, getClientTokens, removeClientTokens, setClientTokens } from "@/shared/lib/auth";

import { apiClient, isKyHTTPError } from "../apiClient";

import type { TokenDTO } from "./auth.interface";

export const authApiClient = apiClient.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        const abortController = new AbortController();

        const accessToken = getClientAccessToken();
        if (!accessToken) abortController.abort();
        else request.headers.set("Authorization", `Bearer ${accessToken}`);

        return new Request(request, { signal: abortController.signal });
      },
    ],
    beforeError: [
      async (error) => {
        if (!isKyHTTPError(error)) return error;
        const { status } = error.response;
        if (status !== UNAUTHORIZED_STATUS) return error;

        try {
          const { accessToken, refreshToken } = getClientTokens();
          if (!accessToken || !refreshToken) throw new Error();

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await ky
            .post<TokenDTO>(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, {
              json: { accessToken, refreshToken },
            })
            .json();

          setClientTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });
          error.request.headers.set("Authorization", `Bearer ${newAccessToken}`);
          void (await authApiClient(error.request));
        } catch {
          removeClientTokens();
        }

        return error;
      },
    ],
  },
});
