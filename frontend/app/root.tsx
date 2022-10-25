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

import { NavBar } from "./components/NavBar";
import { Alert } from "./components/Alert";
import { getEnv } from "./env.server";
import styles from "./styles/app.css";
import { getNavBar } from "./service/navbar.server";

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
};
export const loader: LoaderFunction = async () => {
  const navBarResponse = await getNavBar();
  const navBarData = await navBarResponse.json();
  if (navBarData.error) {
    throw new Response("Error loading navbar data", {
      status: navBarData?.error?.status || 500,
    });
  }

  return json<LoaderData>({
    ENV: getEnv(),
    navBarData: navBarData.data.attributes,
  });
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
  const { navBarData } = useLoaderData<LoaderData>();
  return (
    <Document>
      <NavBar data={navBarData} />
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div>
        <Alert mode="error" message={`${caught.status} ${caught.statusText}`} />
      </div>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Uh-oh!">
      <div>
        <Alert mode="error" message={error.message} />
      </div>
    </Document>
  );
}
