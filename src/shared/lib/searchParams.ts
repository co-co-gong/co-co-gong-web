type SearchParamsValue = string | string[] | number | number[] | boolean | null | undefined;

const preprocessValue = (params?: Record<string, SearchParamsValue>) => {
  if (!params) return params;

  return Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (Array.isArray(value)) acc[key] = value.join(",");
      if (typeof value === "string") acc[key] = value;
      if (typeof value === "number") acc[key] = value.toString();
      if (typeof value === "boolean") acc[key] = value.toString();
      return acc;
    },
    {} as Record<string, string>,
  );
};

export const getSearchParams = (params?: Record<string, SearchParamsValue>, withQuestion?: boolean) => {
  if (!params) return "";

  const preprocessedParams = preprocessValue(params);
  const searchParams = new URLSearchParams(preprocessedParams).toString();
  if (withQuestion) return `?${searchParams}`;
  return searchParams;
};
