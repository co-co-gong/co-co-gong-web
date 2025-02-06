"use client";

import type { ReactNode } from "react";

import cx from "clsx";

import { useLayoutStore } from "@/shared/models";
import DvhHeightLayout from "@/shared/ui/Layout/DvhHeightLayout";

import GNB from "./GNB";
import LNB from "./LNB";

import styles from "./BaseLayout.module.scss";

interface Props {
  children?: ReactNode;
  hasGNB?: boolean;
  hasLNB?: boolean;
}

const BaseLayout: React.FC<Props> = ({ children, hasGNB, hasLNB }) => {
  const { isFolded } = useLayoutStore();

  return (
    <DvhHeightLayout className={styles.wrapper} dvh={100} heightType="minHeight">
      {hasGNB && <GNB />}
      {hasLNB && <LNB />}
      <div className={cx(styles.contentWrapper, { [styles.isFolded]: isFolded })}>{children}</div>
    </DvhHeightLayout>
  );
};

export default BaseLayout;
