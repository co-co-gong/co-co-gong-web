import Link from "next/link";

import { IconButton } from "@/shared/ui/Button";

import ProfileButton from "./ProfileButton";
import { IconLogoWhiteSmall } from "public/icons/common";
import { IconAlarm } from "public/icons/layout";

import styles from "./GNB.module.scss";

const GNB: React.FC = () => {
  return (
    <header className={styles.wrapper}>
      <Link href="/" className={styles.logoWrapper}>
        <IconLogoWhiteSmall />
        <h2 className={styles.title}>CoCoGong</h2>
      </Link>
      <div className={styles.right}>
        <Link href="/alarms" className={styles.alarmButton}>
          <IconButton size={40} className={styles.alarmButton}>
            <IconAlarm />
          </IconButton>
        </Link>
        <ProfileButton />
      </div>
    </header>
  );
};

export default GNB;
