import cx from "clsx";

import styles from "./interaction.module.scss";

type Variant = "normal" | "light" | "strong";

interface Props {
  disabled?: boolean;
  variant: Variant;
}

const Interaction: React.FC<Props> = ({ disabled, variant }) => {
  return <span className={cx(styles.wrapper, styles[variant])} aria-disabled={disabled} />;
};

export default Interaction;
