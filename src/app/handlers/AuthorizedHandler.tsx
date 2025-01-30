import type { PropsWithChildren } from "react";

import { redirect } from "next/navigation";

import { getMeApi } from "@/entities/user/api";

import { UNAUTHORIZED_STATUS } from "@/shared/constants/auth";

const AuthorizedHandler: React.FC<PropsWithChildren> = async ({ children }) => {
  const data = await getMeApi();
  if (data.status === UNAUTHORIZED_STATUS) return redirect("/auth");

  return <>{children}</>;
};

export default AuthorizedHandler;
