"use client";

import Link from "next/link";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, error, isLoading } = useUser();
  return (
    <main>
      <h1>Blog</h1>
      {user && <div>The user {user?.name} is logged in</div>}
      {user ? (
        <a href="/api/auth/logout">Logout</a>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </main>
  );
}
