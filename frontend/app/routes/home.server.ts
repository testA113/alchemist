export const getHomePage = async () => {
  return await fetch(`${process.env.STRAPI_BASEURL}/api/home?populate=deep`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
