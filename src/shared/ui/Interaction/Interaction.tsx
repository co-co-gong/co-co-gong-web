import { useLayoutEffect, useRef } from "react";

import cx from "clsx";

import { getSemanticColor } from "@/shared/lib/styles";

import styles from "./Interaction.module.scss";

type Variant = "normal" | "light" | "strong";

interface Props {
  disabled?: boolean;
  variant: Variant;
  backgroundColor: string;
}

const Interaction: React.FC<Props> = ({ disabled, variant, backgroundColor: backgroundColorProps }) => {
  const interactionRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const backgroundColor = getSemanticColor(backgroundColorProps);
    const $interaction = interactionRef.current;
    if (!$interaction) return;
    $interaction.style.backgroundColor = backgroundColor;
  }, [backgroundColorProps]);

  return <span className={cx(styles.wrapper, styles[variant])} aria-disabled={disabled} ref={interactionRef} />;
};

export default Interaction;
