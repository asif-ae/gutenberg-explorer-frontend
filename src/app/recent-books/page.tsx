"use client";

import Pagination from "@/components/RecentBooks/Pagination";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type RecentBooksProps = {
  id: string;
  Title: string;
  ["Cover Image"]: string;
};

const ITEMS_PER_PAGE = 6;

export default function RecentBooks(): JSX.Element {
  const [recentBookList, setRecentBookList] = useState<RecentBooksProps[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(recentBookList?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBooks = recentBookList?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (window?.localStorage) {
      const previousBookState = localStorage.getItem("previous-book");
      const previousBook = previousBookState && JSON.parse(previousBookState);

      setRecentBookList(previousBook);
    }
  }, []);

  if (!recentBookList || recentBookList.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">No books available</div>
    );
  }

  return (
    <section className="flex justify-center flex-col mt-16 mx-auto max-w-[1140px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentBooks.map((book) => (
          <Link
            key={book.id}
            href={`/?id=${book.id}`}
            className="text-blue-500 hover:text-blue-300"
          >
            <div className="p-4 border rounded shadow hover:shadow-lg transition">
              <div className="flex justify-center">
                <Image
                  src={book["Cover Image"]}
                  alt="Book cover image"
                  width={200}
                  height={300}
                  loading="lazy"
                />
              </div>
              <div className="mt-3 mb-1">
                <h2 className="text-xl font-semibold overflow-hidden text-ellipsis text-nowrap">
                  {book.Title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}
