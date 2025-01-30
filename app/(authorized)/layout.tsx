import { PropsWithChildren } from "react";

import { AuthorizedHandler } from "@/app/handlers";

// MEMO: check authorized using getMeApi
const AuthorizedLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <AuthorizedHandler>{children}</AuthorizedHandler>;
};

export default AuthorizedLayout;
