import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import type { GetAttributesValues } from "@strapi/strapi";

import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";
import { PageError } from "./components/shared/Alert/PageError";
import { getEnv } from "./env.server";
import styles from "./styles/app.css";
import { getNavBar } from "./components/layout/navbar.server";
import { getFooter } from "./components/layout/footer.server";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  ENV: ReturnType<typeof getEnv>;
  navBarData: GetAttributesValues<"api::menu.menu">;
  footerData: GetAttributesValues<"api::footer.footer">;
};
export const loader: LoaderFunction = async () => {
  const [navBarResponse, footerResponse] = await Promise.all([
    getNavBar(),
    getFooter(),
  ]);
  const navBarData = await navBarResponse.json();
  const footerData = await footerResponse.json();
  if (footerData.error) {
    throw new Response("Error loading navbar data", {
      status: navBarData?.error?.status || 500,
    });
  }

  return json<LoaderData>(
    {
      ENV: getEnv(),
      navBarData: navBarData.data.attributes,
      footerData: footerData.data.attributes,
    },
    {
      headers: { "Cache-Control": "private, max-age=120" },
    }
  );
};

function Document({
  children,
  title = "Alchemist Mixology",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const data = useLoaderData<LoaderData>();
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  const { navBarData, footerData } = useLoaderData<LoaderData>();
  return (
    <Document>
      <NavBar data={navBarData} />
      <Outlet />
      <Footer data={footerData} />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <PageError message={`${caught.status} ${caught.statusText}`} />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Uh-oh!">
      <PageError message={error.message} />
    </Document>
  );
}
