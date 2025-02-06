"use client";

import type { ReactNode } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import cx from "clsx";

import { useLayoutStore } from "@/shared/models";
import { Interaction } from "@/shared/ui/Interaction";

import styles from "./Item.module.scss";

interface Props {
  className?: string;
  href: string;
  icon: ReactNode;
  children: ReactNode;
}

const Item: React.FC<Props> = ({ className, href, icon, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const { isFolded } = useLayoutStore();

  return (
    <Link className={cx(styles.wrapper, className, { [styles.isActive]: isActive })} href={href}>
      <span className={styles.icon}>{icon}</span>
      <span className={cx(styles.children, { [styles.isFolded]: isFolded })}>{children}</span>
      <Interaction variant="normal" backgroundColor="--c-ui-gray-75" />
    </Link>
  );
};

export default Item;
