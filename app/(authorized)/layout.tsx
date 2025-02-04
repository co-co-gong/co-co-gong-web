import { PropsWithChildren } from "react";

import { AuthorizedHandler } from "@/app/handlers";

const AuthorizedLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  return <AuthorizedHandler>{children}</AuthorizedHandler>;
};

export default AuthorizedLayout;
