export const getFooter = async () => {
  return await fetch(`${process.env.STRAPI_BASEURL}/api/footer?populate=deep`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
