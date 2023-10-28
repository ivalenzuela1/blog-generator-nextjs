"use client";

import React, { ChangeEvent, useState, FormEvent } from "react";
import { tones } from "../../../data/tones";

export default function New() {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("inputs");
    console.log(inputs);
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
        </section>
      </section>
    </>
  );
}
