/* eslint-disable @typescript-eslint/no-explicit-any */
export const buildSalesQuery = (params: Record<string, any>): string => {
  const sp = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      value.forEach((v) => sp.append(key, String(v)));
    } else {
      sp.append(key, String(value));
    }
  });
  return sp.toString();
};
