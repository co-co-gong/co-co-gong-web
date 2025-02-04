import { TokenDTO } from "@/shared/api/auth";

type IsValidToken = {
  [K in keyof TokenDTO as `is${Capitalize<string & K>}Valid`]: boolean;
};

export const isValidToken = ({ accessToken, refreshToken }: TokenDTO): IsValidToken => {
  const currentTime = Math.floor(Date.now() / 1000);

  const result: IsValidToken = {
    isAccessTokenValid: false,
    isRefreshTokenValid: false,
  };

  try {
    if (accessToken) {
      const accessTokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
      result.isAccessTokenValid = accessTokenPayload.exp > currentTime;
    }

    if (refreshToken) {
      const refreshTokenPayload = JSON.parse(atob(refreshToken.split(".")[1]));
      result.isRefreshTokenValid = refreshTokenPayload.exp > currentTime;
    }
  } catch {
    throw new Error("Invalid token");
  }

  return result;
};
