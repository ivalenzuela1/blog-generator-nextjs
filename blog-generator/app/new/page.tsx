"use client";

import React, { ChangeEvent, useState, FormEvent } from "react";
import { tones } from "@/data/tones";
import { generatePost } from "@/lib/functions";
import { FaSpinner, FaTired } from "react-icons/fa";

export default function New() {
  const [post, setPost] = useState<Post | null>(null);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");
  const [inputs, setInputs] = useState<PostPrompt>({
    title: "",
    description: "",
    keywords: "",
    tone: "😐 Neutral",
  });

  const handleChangeInput = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // reset all flags
    setHasSubmitted(true);
    setError(false);
    setSuccess(false);
    setIsWaitingForResponse(true);
    setResponse("");

    const res = await generatePost(inputs);
    const data = await res.json();

    if (data.success) {
      setHasSubmitted(false);
      setSuccess(true);
      setIsWaitingForResponse(false);
      setPost(data.post);
    } else {
      setResponse(data.message);
      setHasSubmitted(false);
      setIsWaitingForResponse(false);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <>
      <section className="w-full flex flex-col items-center">
        <section className="w-[95%] max-w-4xl">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4 mt-4 items-center"
          >
            <h1 className="mt-4 text-4xl font-bold text-center text-indigo-600">
              Generate New Posts
            </h1>
            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="title"
                className="text-gray-600 text-sm font-semibold"
              >
                Title (optional)
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                name="title"
                id="title"
                placeholder="Enter title (e.g. 'How to make a blog post')"
                value={inputs.title}
                onChange={handleChangeInput}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="description"
                className="text-gray-600 text-sm font-semibold"
              >
                Description
              </label>
              <textarea
                className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                name="description"
                id="description"
                placeholder="Enter description"
                value={inputs.description}
                onChange={handleChangeInput}
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="keywords"
                className="text-gray-600 text-sm font-semibold"
              >
                Keywords
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                name="keywords"
                id="keywords"
                placeholder="Enter keywords"
                value={inputs.keywords}
                onChange={handleChangeInput}
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="tone"
                className="text-gray-600 text-sm font-semibold"
              >
                Tone
              </label>
              <select
                name="tone"
                id="tone"
                value={inputs.tone}
                onChange={handleChangeInput}
                className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                {tones.map((tone, index) => {
                  return (
                    <option key={index} value={tone.value}>
                      {tone.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              type="submit"
              className="rounded-md mt-4 w-fit px-4 py-2 hover:bg-indigo-500 transition-all cursor-pointer bg-indigo-600 text-white p-1 items-center"
            >
              Submit
            </button>
          </form>
          {isWaitingForResponse && hasSubmitted && (
            <div className="w-full flex flex-col gap-4 mt-4 items-center">
              <FaSpinner className="animate-spin w-8 h-8 text-indigo-600" />
            </div>
          )}
          {error && (
            <div className="w-full flex flex-col gap-4 mt-4 items-center">
              <FaTired className="w-8 h-8 text-rose-600" />
              <p className="text-rose-600 text-center">
                Something went wrong. Please try again.
              </p>
              <p>{response}</p>
            </div>
          )}
          {success && post && (
            <div className="w-full flex flex-col gap-4 mt-4 overflow-y-auto h-[500px] pb-20">
              <h1 className="text-4xl font-bold text-gray-800 text-center">
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
              <p>{response}</p>
            </div>
          )}
        </section>
      </section>
    </>
  );
}
