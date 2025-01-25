import type { CSSProperties, ReactNode } from "react";

import assert from "assert";
import cx from "clsx";

import styles from "./dvhHeightLayout.module.scss";

type HeightType = "height" | "minHeight" | "maxHeight";

interface Props {
  children?: ReactNode;
  dvh: number;
  heightType: HeightType;
  className?: string;
}

const DvhHeightLayout: React.FC<Props> = ({ dvh, children, heightType, className }) => {
  assert(dvh >= 0 && dvh <= 100, "dvh must be between 0 and 100");

  const style = { "--dvh": `${dvh}` } as CSSProperties;

  return (
    <div className={cx(styles.wrapper, styles[heightType], className)} style={style}>
      {children}
    </div>
  );
};

export default DvhHeightLayout;
