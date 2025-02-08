"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

import { userQueries } from "@/entities/user/api";

import styles from "./MyInfo.module.scss";

const MyInfo: React.FC = () => {
  const { data } = useSuspenseQuery(userQueries.getMe).data;

  return (
    <div className={styles.wrapper}>
      <span className={styles.name}>{data.username}</span>
      <address className={styles.email}>{data.email}</address>
    </div>
  );
};

export default MyInfo;

export const LoadingMyInfo: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Skeleton width={40} height={24} />
      <Skeleton width={120} height={20} />
    </div>
  );
};
