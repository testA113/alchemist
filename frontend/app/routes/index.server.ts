export const getHomePage = async () => {
  return await fetch(`${process.env.STRAPI_BASEURL}/api/home?populate=deep`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getPage = async (page: string) => {
  return await fetch(
    `${process.env.STRAPI_BASEURL}/api/${page}?populate=deep`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
