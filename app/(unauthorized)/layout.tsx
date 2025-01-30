import { PropsWithChildren } from "react";

import UnAuthorizedHandler from "@/app/handlers/UnAuthorizedHandler";

const UnAuthorizedLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <UnAuthorizedHandler>{children}</UnAuthorizedHandler>;
};

export default UnAuthorizedLayout;
