export const getRootStyles = () => {
  if (typeof window === "undefined") return null;
  return window.getComputedStyle(document.documentElement);
};

export const getAllCSSVariables = () => {
  const styles = document.documentElement.computedStyleMap();
  return Array.from(styles).reduce((acc, [prop, val]) => {
    if (prop.startsWith("--c-")) acc = { ...acc, [prop]: val.toString() };
    return acc;
  }, {});
};

export const getSemanticColor = (color: string) => {
  console.assert(color.startsWith("--c-"), "Color must be a CSS variable");
  const rootStyles = getRootStyles();
  if (!rootStyles) return "";
  return rootStyles.getPropertyValue(color).trim();
};
