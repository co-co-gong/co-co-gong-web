import Link from "next/link";

import LogoutButton from "./LogoutButton";
import { IconLogoWhiteSmall } from "public/icons/common";

import styles from "./GNB.module.scss";

const GNB: React.FC = () => {
  return (
    <header className={styles.wrapper}>
      <Link href="/" className={styles.logoWrapper}>
        <IconLogoWhiteSmall />
        <h2 className={styles.title}>CoCoGong</h2>
      </Link>
      <LogoutButton />
    </header>
  );
};

export default GNB;
