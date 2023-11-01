"use client";

import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, error, isLoading } = useUser();
  return (
    <section className="w-full flex flex-col">
      {user ? (
        //login section
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="mt-4 text-4xl font-bold text-center text-indigo-600">
            Hi, {user?.name || user?.nickname || "dear User"}!
          </h1>
          <h2 className="max-w-lg text-xl text-center text-gray-600">
            Welcome to Blogger, where you can easily create full blog posts with
            just one click
          </h2>
          <a
            href="/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-all cursor-pointer"
          >
            Get Started
          </a>
        </div>
      ) : (
        // logout section
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="mt-4 text-4xl font-bold text-center text-indigo-600">
            Hello
          </h1>
          <h2 className="max-w-lg text-xl text-center text-gray-600">
            Welcome to Blogger, where you can easily create full blog posts with
            just one click
          </h2>
          <a
            href="/api/auth/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-all cursor-pointer"
          >
            Login to get started
          </a>
        </div>
      )}
    </section>
  );
}
