import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Page from "./components/Page";
import Teaser from "./components/Teaser";

const components = {
  teaser: Teaser,
  page: Page,
};

const isServer = typeof window === "undefined";

const accessToken = isServer
  ? process.env.STORYBLOK_API_TOKEN
  : window.env.STORYBLOK_API_TOKEN;

storyblokInit({
  accessToken,
  use: [apiPlugin],
  components,
});

export const loader = async () => {
  return json({
    env: {
      STORYBLOK_API_TOKEN: process.env.STORYBLOK_API_TOKEN,
    },
  });
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(accessToken)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
