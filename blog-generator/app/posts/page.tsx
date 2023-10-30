"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import PostSkeleton from "../components/skeletons/PostSkeleton";
import { deletePost, getPosts } from "@/lib/functions";
import Post from "../components/Post";

export default function Posts() {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [fetchedPosts, setFetchedPosts] = useState<PostWithId[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setLoadingPosts(false);
      setFetchedPosts(posts);
    };
    fetchPosts();
  }, []);

  const handleDeletePost = (_id: string) => {
    const handler = async () => {
      const res = await deletePost(_id);
    };
    setFetchedPosts((prev) => prev.filter((post) => post._id !== _id));
    handler();
  };

  return (
    <section className="w-full flex flex-col items-center mb-10">
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
        {!loadingPosts && fetchedPosts.length === 0 && (
          <h1 className="text-2xl font-bold text-center text-gray-500">
            You have no posts yet!
          </h1>
        )}
        {!loadingPosts &&
          fetchedPosts.length > 0 &&
          fetchedPosts.map((post: PostWithId) => {
            return (
              <Post
                post={post}
                key={post._id}
                handleDeletePost={handleDeletePost}
              />
            );
          })}
      </div>
    </section>
  );
}
