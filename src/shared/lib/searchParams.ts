export const getSearchParams = (params?: Record<string, string>, withQuestion?: boolean) => {
  if (!params) return "";
  const searchParams = new URLSearchParams(params).toString();
  if (withQuestion) return `?${searchParams}`;
  return searchParams;
};
