import type { PropsWithChildren } from "react";

import { redirect } from "next/navigation";

import { getMeApi } from "@/entities/user/api";

const UnAuthorizedHandler: React.FC<PropsWithChildren> = async ({ children }) => {
  const data = await getMeApi();
  if (!!data.data) return redirect("/");

  return <>{children}</>;
};

export default UnAuthorizedHandler;
