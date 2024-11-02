"use client";

import { MainProps } from "@/types/homepage.type";
import { useRouter } from "next/navigation";
import { KeyboardEvent } from "react";

const KEY = "Enter";

function SearchContainer({ bookId }: MainProps): JSX.Element {
  const router = useRouter();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.code === KEY) {
      const target = event.target as HTMLInputElement;
      const query = new URLSearchParams({ id: target.value }).toString();
      router.push(`/?${query}`);
    }
  };
  return (
    <section>
      <div
        className="bg-gray-100 text-blue-500 flex items-center justify-center transition-all duration-500 ease-in-out"
        style={{
          minHeight: !bookId ? "calc(100vh - 64px)" : "calc(25vh - 64px)",
        }}
      >
        <div className="w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              className="w-full p-4 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type Gutenberg book id"
              onKeyDown={handleKeyDown}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchContainer;
