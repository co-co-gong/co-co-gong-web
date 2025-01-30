import { PropsWithChildren } from "react";

import { UnAuthorizedHandler } from "@/app/handlers";

// MEMO: check unAuthorized using getMeApi
const UnAuthorizedLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <UnAuthorizedHandler>{children}</UnAuthorizedHandler>;
};

export default UnAuthorizedLayout;
