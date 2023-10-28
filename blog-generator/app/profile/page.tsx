"use client";

import Link from "next/link";
import React from "react";

export default function Profile() {
  const addCredits = () => {
    console.log("Add credits");
  };

  return (
    <section className="w-full flex flex-col items-center">
      <section className="w-[95%] max-w-4xl flex flex-col items-center gap-4"></section>
      <h1 className="mt-4 text-4xl font-bold text-center text-indigo-600">
        Profile
      </h1>
      <h2 className="text-2xl font-bold text-center text-gray-800">
        You have 0 credits.
      </h2>
      <button
        onClick={addCredits}
        className="rounded-md px-4 py-2 cursor-pointer bg-indigo-600 text-white text-xl font-bold"
      >
        Buy more credits
      </button>
    </section>
  );
}
