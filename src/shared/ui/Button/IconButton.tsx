"use client";

import type { ComponentProps, CSSProperties } from "react";

import cx from "clsx";

import { Interaction } from "@/shared/ui/Interaction";

import styles from "./IconButton.module.scss";

interface Props extends ComponentProps<"button"> {
  size: number;
}

const IconButton: React.FC<Props> = ({ size, disabled, className, children, ...props }) => {
  const sizeStyles: CSSProperties = { width: size, height: size };

  return (
    <button className={cx(styles.wrapper, className)} style={sizeStyles} {...props}>
      {children}
      <Interaction backgroundColor="--c-ui-gray-75" variant="strong" />
    </button>
  );
};

export default IconButton;
