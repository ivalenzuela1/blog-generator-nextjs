"use client";

import Link from "next/link";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Navbar from "./components/Navbar";
import MainPage from "./components/main/MainPage";

export default function Home() {
  const { user, error, isLoading } = useUser();
  return <MainPage />;
}
