"use client";

import { profileAtom } from "@/atoms/profileAtom";
import { addCredits } from "@/lib/functions";
import React from "react";
import { useRecoilState } from "recoil";

export default function Success() {
  return (
    <section className="w-full flex flex-col items-center">
      <section className="w-[95%] max-w-4xl flex flex-col items-center gap-4"></section>
      <h1 className="mt-4 text-4xl font-bold text-center text-indigo-600">
        Thank you for your purchase!
      </h1>
    </section>
  );
}
