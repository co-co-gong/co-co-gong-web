"use client";

import { SSRSafeSuspense } from "@/shared/ui/SSRSafeSuspense";

import LogoutButton from "./LogoutButton";
import MyInfo, { LoadingMyInfo } from "./MyInfo";

import styles from "./ProfilePanel.module.scss";

interface Props {
  onClose: () => void;
}

const ProfilePanel: React.FC<Props> = ({}) => {
  return (
    <aside className={styles.wrapper}>
      <SSRSafeSuspense fallback={<LoadingMyInfo />}>
        <MyInfo />
      </SSRSafeSuspense>
      <hr />
      <LogoutButton />
    </aside>
  );
};

export default ProfilePanel;
