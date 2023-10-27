import Navbar from "./components/Navbar";
import Sidebar from "./components/main/Sidebar";
import "./globals.css";
export const metadata = {
  title: "NextJS template with TypeScript, TailwindCSS, and MongoDB",
  description:
    "NextJS template with TypeScript, TailwindCSS, and MongoDB, created by @clipper.",
};

import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className="bg-gray-50 w-full h-screen overflow-clip flex flex-col">
          <Navbar />
          <main className="w-full h-full flex flex-col md:flex-row">
            <Sidebar />
            {children}
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
