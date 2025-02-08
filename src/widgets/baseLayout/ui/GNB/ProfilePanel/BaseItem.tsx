"use client";

import type { ComponentProps, ReactNode } from "react";

import cx from "clsx";

import { Interaction } from "@/shared/ui/Interaction";

import styles from "./BaseItem.module.scss";

interface Props extends ComponentProps<"button"> {
  icon: ReactNode;
}

const BaseItem: React.FC<Props> = ({ icon, className, children, disabled, ...props }) => {
  return (
    <button type="button" className={cx(styles.wrapper, className)} {...props}>
      {icon}
      {children}
      <Interaction backgroundColor="--c-ui-gray-85" variant="strong" disabled={disabled} />
    </button>
  );
};

export default BaseItem;
