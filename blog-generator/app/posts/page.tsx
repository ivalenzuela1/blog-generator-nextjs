"use client";

import Link from "next/link";
import React, { useState } from "react";
import PostSkeleton from "../components/skeletons/PostSkeleton";

export default function Posts() {
  const [loadingPosts, setLoadingPosts] = useState(true);
  return (
    <section className="w-full flex flex-col items-center">
      <section className="w-[95%] max-w-4xl flex flex-col"></section>
      <h1 className="mt-4 text-4xl font-bold text-center text-indigo-600">
        Your posts
      </h1>
      <div className="w-full flex flex-col gap-8 mt-4 items-center">
        {loadingPosts && (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        )}
      </div>
    </section>
  );
}
