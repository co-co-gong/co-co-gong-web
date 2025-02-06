export const getRootStyles = () => {
  if (typeof window === "undefined") return null;
  return window.getComputedStyle(document.body);
};

export const getSemanticColor = (color: string) => {
  console.assert(color.startsWith("--c-"), "Color must be a CSS variable");
  const rootStyles = getRootStyles();
  if (!rootStyles) return "";
  return rootStyles.getPropertyValue(color).trim();
};
