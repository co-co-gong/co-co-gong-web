import { getTokensApi, refreshApi, removeTokensApi, setTokensApi } from "@/shared/api/auth/auth.route-handler";
import { UNAUTHORIZED_STATUS } from "@/shared/constants/auth";

import { apiClient, isKyHTTPError } from "../apiClient";

export const authApiClient = apiClient.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        const { accessToken } = await getTokensApi();
        request.headers.set("Authorization", `Bearer ${accessToken}`);
        return request;
      },
    ],
    beforeError: [
      async (error) => {
        if (!isKyHTTPError(error)) return error;
        const { status } = error.response;
        if (status !== UNAUTHORIZED_STATUS) return error;

        try {
          const { accessToken, refreshToken } = await getTokensApi();
          if (!accessToken || !refreshToken) throw new Error();

          const newTokens = await refreshApi({ accessToken, refreshToken });

          await setTokensApi(newTokens);
          error.request.headers.set("Authorization", `Bearer ${newTokens.accessToken}`);
          void (await authApiClient(error.request));
        } catch {
          await removeTokensApi();
        }

        return error;
      },
    ],
  },
});
