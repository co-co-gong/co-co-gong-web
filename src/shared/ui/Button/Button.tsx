"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import Interaction from "@/shared/ui/Interaction";

import styles from "./button.module.scss";

type ButtonType = "primary" | "secondary" | "outlined";

interface Props extends ComponentProps<"button"> {
  buttonType: ButtonType;
}

const Button: React.FC<Props> = ({ buttonType, type, className, children, disabled, ...props }) => {
  console.assert(!!type, "Button type is required");

  return (
    <button type={type} className={cx(styles.wrapper, styles[buttonType], className)} disabled={disabled} {...props}>
      {children}
      <Interaction variant="normal" disabled={disabled} />
    </button>
  );
};

export default Button;
