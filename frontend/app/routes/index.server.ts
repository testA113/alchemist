export const getPage = async (page: string) => {
  console.log(page);
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
