import { DvhHeightLayout } from "@/shared/ui/Layout";

import IconLogo from "public/icons/common/logo.svg";

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
        </article>
      </DvhHeightLayout>
    </main>
  );
};

export default LoginPage;
