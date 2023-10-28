import Navbar from "./components/Navbar";
import Sidebar from "./components/main/Sidebar";
import "./globals.css";
export const metadata = {
  title: "Blogger",
  description: "Blogger description.",
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
            <div className="w-full md:pr-32 overflow-auto">{children}</div>
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
