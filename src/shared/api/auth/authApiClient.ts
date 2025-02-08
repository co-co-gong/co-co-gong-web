import { getTokensApi, refreshApi, removeTokensApi, setTokensApi } from "@/shared/api/auth/auth.route-handler";
import { UNAUTHORIZED_STATUS } from "@/shared/constants/auth";

import { apiClient } from "../apiClient";

export const authApiClient = apiClient.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        const { accessToken } = await getTokensApi();
        request.headers.set("Authorization", `Bearer ${accessToken}`);
        return request;
      },
    ],
    beforeRetry: [
      async ({ request }) => {
        try {
          const { accessToken, refreshToken } = await getTokensApi();
          if (!accessToken || !refreshToken) throw new Error();
          const newTokens = await refreshApi({ accessToken, refreshToken });
          await setTokensApi(newTokens);
          request.headers.set("Authorization", `Bearer ${newTokens.accessToken}`);
        } catch {
          await removeTokensApi();
        }
      },
    ],
  },
  retry: {
    statusCodes: [UNAUTHORIZED_STATUS],
  },
});
