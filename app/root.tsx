import type { LinksFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import "./tailwind.css";

const errorMessage = "Error: Please try again later.";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    console.error("ERROR!!" + error.status + error.data.message);
    return (
      <div className="flex flex-col justify-center items-center m-20">
        <p>Something went wrong.</p>
        <pre className="text-red-600">{errorMessage}</pre>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center m-20">
        <p>Something went wrong.</p>
        <pre className="text-red-600">{errorMessage}</pre>
      </div>
    );
  }
}
