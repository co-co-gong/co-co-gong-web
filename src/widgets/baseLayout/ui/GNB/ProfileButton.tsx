"use client";

import { useRef, useState } from "react";

import { useClickAway } from "react-use";

import { IconButton } from "@/shared/ui/Button";

import ProfilePanel from "./ProfilePanel";
import { IconProfile } from "public/icons/layout";

import styles from "./ProfileButton.module.scss";

const ProfileButton: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);

  useClickAway(ref, () => setIsShow(false));

  return (
    <div className={styles.wrapper} ref={ref}>
      <IconButton size={40} className={styles.profileButton} onClick={() => setIsShow((prev) => !prev)}>
        <IconProfile />
      </IconButton>
      {isShow && <ProfilePanel onClose={() => setIsShow(false)} />}
    </div>
  );
};

export default ProfileButton;
