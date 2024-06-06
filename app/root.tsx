import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import CommentProvider from "./components/CommentProvider/provider";
import Footer from "./components/Footer";
import Header from "./components/Header";
import styles from "./tailwind.css?url";

export const links = () => {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;600;700&display=swap",
    },
  ];
};

export const meta: MetaFunction = () => {
  return [{ title: "胤•居" }];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body className="bg-primary text-primary">
        <Header />
        <CommentProvider>
          <main className="mx-auto min-h-screen w-full max-w-screen-lg px-6 pt-16">
            <div className="space-y-6 py-8">{children}</div>
          </main>
        </CommentProvider>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
