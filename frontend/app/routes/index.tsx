import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import type { GetAttributesValues } from "@strapi/strapi";

import { Alert } from "~/components/Alert";
import { NavBar } from "~/components/NavBar";
import { SocialIcons } from "~/components/SocialIcons";

import { getHomePage } from "./home.server";
import { getNavBar } from "../service/navbar.server";

export async function loader() {
  const [homeResponse, navBarResponse] = await Promise.all([
    getHomePage(),
    getNavBar(),
  ]);
  const homeData = await homeResponse.json();
  if (homeData.error) {
    // error check
    throw new Response("Error loading data from strapi", {
      status: homeData?.error?.status || 500,
    });
  }
  const navBarData = await navBarResponse.json();
  if (navBarData.error) {
    // error check
    throw new Response("Error loading data from strapi", {
      status: navBarData?.error?.status || 500,
    });
  }

  return json(
    {
      homeData: homeData.data.attributes,
      navBarData: navBarData.data.attributes,
    },
    {
      headers: { "Cache-Control": "private, max-age=120" },
    }
  );
}

export default function Index() {
  const {
    homeData,
    navBarData,
  }: {
    homeData: GetAttributesValues<"api::home.home">;
    navBarData: GetAttributesValues<"api::menu.menu">;
  } = useLoaderData();
  return (
    <div
      className="transition duration-500"
      style={{ height: "100vh", width: "100vw" }}
    >
      <NavBar data={navBarData} />
    </div>
  );
}

const errorSocials = {
  facebookurl: "https://www.facebook.com/alchemistmixology/",
  instagramurl: "https://www.instagram.com/thealchemistmixology/",
  telephone: "+64226834889",
  email: "jaz@alchemistmixology.co.nz",
};

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div>
        <Alert
          mode="error"
          message="The home page couldn't be found. In the meantime, connect with us on our socials:"
        />
        <SocialIcons social={errorSocials} />
      </div>
    );
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div>
      <Alert
        mode="error"
        message="There was an error loading the home page. Sorry! In the meantime, connect with us on our socials:"
      />
      <SocialIcons social={errorSocials} />
    </div>
  );
}
