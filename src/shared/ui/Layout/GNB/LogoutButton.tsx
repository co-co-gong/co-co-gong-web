"use client";

import { useRouter } from "next/navigation";

import { removeTokensApi } from "@/shared/api/auth";
import { Button } from "@/shared/ui/Button";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  // TODO: me 관련 훅
  const onClickLogout = () => {
    removeTokensApi().then(() => router.replace("/auth"));
  };

  return (
    <Button buttonType="text" type="button" onClick={onClickLogout}>
      로그아웃
    </Button>
  );
};

export default LogoutButton;
