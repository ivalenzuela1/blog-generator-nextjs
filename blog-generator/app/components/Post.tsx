"use client";

import React from "react";

interface Props {
  post: PostWithId;
}

export default function Post({ post }: Props) {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(post.title + "\n" + post.content);
  };
  return (
    <div className="w-full flex flex-col gap-4 shadow-sm p-4 rounded-xl bg-white">
      <h1 className="text-2xl px-4 font-bold text-center text-gray-800">
        {post.title}
      </h1>
      {typeof post.content === "string" ? (
        <p className="text-gray-600">{post.content}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-gray-600">
              {paragraph}
            </p>
          ))}
        </div>
      )}
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-all cursor-pointer"
        onClick={handleCopyToClipboard}
      >
        Copy
      </button>
    </div>
  );
}
