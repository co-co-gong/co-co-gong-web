import Link from "next/link";


import { Button } from "@/shared/ui/Button";
import { DvhHeightLayout } from "@/shared/ui/Layout";

import { IconGithubMark, IconLogo } from "public/icons/common";

import styles from "./loginPage.module.scss";

const LoginPage: React.FC = () => {
  return (
    <main>
      <DvhHeightLayout dvh={100} heightType="height" className={styles.wrapper}>
        <article className={styles.loginForm}>
          <IconLogo />
          <div className={styles.textWrapper}>
            <h1 className={styles.title}>CoCoGong</h1>
            <p>Collaborate on code in real-time, just like magic!</p>
          </div>
          <Link href={`${process.env.NEXT_PUBLIC_API_URL}/login`}>
            <Button buttonType="outlined" type="button" className={styles.loginButton}>
              <IconGithubMark className={styles.github} /> Continue With Github
            </Button>
          </Link>
        </article>
      </DvhHeightLayout>
    </main>
  );
};

export default LoginPage;
