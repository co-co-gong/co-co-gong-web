"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";

import { removeTokensApi } from "@/shared/api/auth";

import BaseItem from "./BaseItem";
import { IconLogout } from "public/icons/layout";

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const onClickLogout = () => {
    startTransition(async () => {
      await removeTokensApi();
      queryClient.clear();
      router.push("/");
    });
  };

  return (
    <BaseItem icon={<IconLogout />} onClick={onClickLogout} disabled={isPending}>
      로그아웃
    </BaseItem>
  );
};

export default LogoutButton;
