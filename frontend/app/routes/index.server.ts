type Options = {
  queryParams?: Record<string, string>;
};

export const getPage = async (page: string, options?: Options) => {
  const queryParamsString = options?.queryParams
    ? queryParamsToString(options.queryParams)
    : "";
  return await fetch(
    `${process.env.STRAPI_BASEURL}/api/${page}${queryParamsString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const queryParamsToString = (queryParams: Record<string, string>) => {
  const queryParamsArray = Object.entries(queryParams);
  return queryParamsArray.reduce((acc, [key, value], index) => {
    const isLast = index === queryParamsArray.length - 1;
    return `${acc}${key}=${value}${isLast ? "" : "&"}`;
  }, "?");
};
