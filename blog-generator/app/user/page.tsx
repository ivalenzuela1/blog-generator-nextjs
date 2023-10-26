"use client";

import Link from "next/link";
import React from "react";

export default function User() {
  return (
    <div>
      <h2>user</h2>
      <div>
        <Link href="/">Go to Home</Link>
      </div>
    </div>
  );
}

/*
// USE withPageAuthRequired to protect route
// ** Better to use middleware

import Link from "next/link";
import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function User() {
  return (
    <div>
      <h2>user</h2>
      <div>
        <Link href="/">Go to Home</Link>
      </div>
    </div>
  );
});
*/
