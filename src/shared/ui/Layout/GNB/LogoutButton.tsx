"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { removeTokensApi } from "@/shared/api/auth";
import { Button } from "@/shared/ui/Button";

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // TODO: me 관련 훅
  const onClickLogout = () => {
    startTransition(async () => {
      await removeTokensApi();
      router.push("/");
    });
  };

  return (
    <Button buttonType="text" type="button" onClick={onClickLogout} disabled={isPending}>
      로그아웃
    </Button>
  );
};

export default LogoutButton;
