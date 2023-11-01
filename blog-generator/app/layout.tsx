"use client";

import { RecoilRoot } from "recoil";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./globals.css";

import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <head>
          <title>Blogger</title>
        </head>
        <RecoilRoot>
          <body className="bg-gray-50 w-full h-screen overflow-clip flex flex-col">
            <Navbar />
            <main className="w-full h-full flex flex-col md:flex-row">
              <Sidebar />
              <div className="w-full md:pr-32 overflow-auto">{children}</div>
            </main>
          </body>
        </RecoilRoot>
      </UserProvider>
    </html>
  );
}
