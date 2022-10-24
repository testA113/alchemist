import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";

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
  const { homeData, navBarData } = useLoaderData();
  console.log(homeData);
  console.log(navBarData);
  return (
    <div
      className="transition duration-500"
      style={{ height: "100vh", width: "100vw" }}
    >
      <NavBar />
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div>
        <Alert
          mode="error"
          message="The home page couldn't be found. While we fix this, check out our socials!"
        />
        <SocialIcons
          facebookUrl="https://www.facebook.com/alchemistmixology/"
          instagramUrl="https://www.instagram.com/thealchemistmixology/"
          email="jaz@alchemistmixology.co.nz"
          phone="0226834889"
        />
      </div>
    );
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Alert
      mode="error"
      message="There was an error loading the home page. Sorry!"
    />
  );
}
