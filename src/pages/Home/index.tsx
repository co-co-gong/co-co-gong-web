"use client";

import { useQuery } from "@tanstack/react-query";

import { userQueries } from "@/entities/user/api/user.query";

import styles from "./homePage.module.scss";

const HomePage: React.FC = () => {
  const { data } = useQuery(userQueries.getUsers(1));

  return <div className={styles.wrapper}>HOME PAGE {JSON.stringify(data)}</div>;
};

export default HomePage;
