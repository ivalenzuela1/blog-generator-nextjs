import Link from "next/link";
import React from "react";
import { BiLogIn } from "react-icons/bi";

export default function Content() {
  return (
    <main className="">
      <div>
        <a
          href="/api/auth/login"
          className="font-semibold text-gray-600 text-xl cursor-pointer hover:text-indigo-600"
        >
          <BiLogIn /> Login
        </a>
        <br></br>
        <Link href="/profile">Go to Profile</Link>
        <br></br>
        <Link href="/new">Go to New</Link>
        <br></br>
        <Link href="/posts">Go to Posts</Link>
        <br></br>
        <Link href="/success">Go to Success</Link>
        <br></br>
      </div>
    </main>
  );
}
