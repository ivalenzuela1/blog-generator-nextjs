"use client";

import { profileAtom } from "@/atoms/profileAtom";
import { getProfile } from "@/lib/functions";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { BiCoin, BiLogOut, BiPen } from "react-icons/bi";
import { useRecoilState } from "recoil";

export default function Navbar() {
  const { user } = useUser();
  const [profile, setProfile] = useRecoilState(profileAtom);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      setProfile(profile);
    };
    if (user) fetchProfile();
  }, [profile, setProfile, user]);

  return (
    <nav className="bg-white shadow-md px-6 py-2 z-20 w-full grid grid-cols-3">
      {user ? (
        <div className="flex justify-start">
          <div className="flex flex-col md:flex-row justify-start md:gap-4 items-center">
            <div className="flex gap-1 items-center">
              <BiCoin /> <span className="hidden md:block">Credits</span>:
              {profile.credits}
            </div>
            <Link
              href="/profile"
              className="text-xs md:text-sm font-bold text-gray-600 hover:text-indigo-600"
            >
              Buy more
            </Link>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <Link
        href="/"
        className="font-medium text-lg flex justify-center items-center gap-1"
      >
        <BiPen />
        Blogger
      </Link>
      {user ? (
        <div className="flex justify-end items-center gap-2">
          <Image
            src={user?.picture || ""}
            alt={user?.name || ""}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="font-semibold text-gray-600 md:hidden">Hi!</span>
          <span className="font-semibold text-gray-600 hidden md:block">
            Hi, {user?.name}!
          </span>
          <a
            href="/api/auth/logout"
            className="font-semibold text-gray-600 text-xl cursor-pointer hover:text-indigo-600"
          >
            <BiLogOut />
          </a>
        </div>
      ) : (
        <div></div>
      )}
    </nav>
  );
}
