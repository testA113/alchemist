import type { ContactMessage } from "./types";

export const postContactMessage = async (data: ContactMessage) => {
  console.log(JSON.stringify(data));
  return await fetch(`${process.env.STRAPI_BASEURL}/api/contact-messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getContactPage = async () => {
  return await fetch(
    `${process.env.STRAPI_BASEURL}/api/contact?populate=deep`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
