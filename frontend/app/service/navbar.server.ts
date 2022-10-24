export const getNavBar = async () => {
  return await fetch(`${process.env.STRAPI_BASEURL}/api/menu?populate=deep`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
