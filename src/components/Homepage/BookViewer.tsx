"use client";

import { MainMetadataProps, MainProps } from "@/types/homepage.type";
import addSearchParams from "@/utils/addSearchParams";
import { useEffect, useRef, useState } from "react";

type BookContent = {
  content: string;
};

function BookViewer({
  bookId,
  bookMetadata,
}: MainProps & MainMetadataProps): JSX.Element {
  const bookLoadingRef = useRef<HTMLDivElement>(null);
  const bookViewerContainerRef = useRef<HTMLDivElement>(null);

  const [openBook, setOpenBook] = useState(false);
  const [bookContent, setBookContent] = useState<BookContent | null>(null);

  useEffect(() => {
    if (!bookId || !openBook) {
      setBookContent(null);
      setOpenBook(false);
    } else {
      (async () => {
        if (bookLoadingRef.current) {
          window.scrollTo({
            top: bookLoadingRef.current.offsetTop,
            behavior: "smooth",
          });
        }
        try {
          const url = addSearchParams(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/book/getContent`,
            {
              id: bookId,
            }
          );

          const contentResponse = await fetch(url, {
            method: "GET",
          });
          if (!contentResponse.ok) {
            throw new Error(`HTTP error! status: ${contentResponse.status}`);
          }
          const data = await contentResponse.json();
          setBookContent(data);
        } catch (error) {
          console.log({ error });
        }
      })();
    }
  }, [openBook]);

  useEffect(() => {
    if (bookMetadata?.["Ebook No."]) {
      const cacheData = {
        id: bookMetadata["Ebook No."],
        Title: bookMetadata["Title"],
        ["Cover Image"]: bookMetadata["Cover Image"],
      };

      const previousBooks = localStorage.getItem("previous-book");

      if (!previousBooks) {
        localStorage.setItem("previous-book", JSON.stringify([cacheData]));
      } else {
        const newRecentBookList = [cacheData, ...JSON.parse(previousBooks)];
        const uniqueBooks = newRecentBookList.filter(
          (book, index, self) =>
            index === self.findIndex((b) => b.id === book.id)
        );
        localStorage.setItem("previous-book", JSON.stringify(uniqueBooks));
      }
    }
  }, [bookMetadata]);

  useEffect(() => {
    if (!bookId || !bookMetadata) {
      setBookContent(null);
      setOpenBook(false);
    }
  }, [bookId, bookMetadata]);

  useEffect(() => {
    if (bookViewerContainerRef.current) {
      window.scrollTo({
        top: bookViewerContainerRef.current.offsetTop - 60,
        behavior: "smooth",
      });
    }
  }, [bookContent]);

  return (
    <>
      {!openBook ? (
        !bookMetadata ? (
          <></>
        ) : !bookId ? (
          <></>
        ) : (
          <div className="text-center mb-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => {
                setOpenBook(true);
              }}
            >
              Open Book
            </button>
          </div>
        )
      ) : (
        <>
          {!bookContent?.content ? (
            <>
              <div className="text-blue-700 text-xl mb-3 h-52 flex items-center justify-center">
                Loading book content...
              </div>
              <div ref={bookLoadingRef}></div>
            </>
          ) : (
            <div className="bg-gray-100 p-6" ref={bookViewerContainerRef}>
              <div className="container mx-auto">
                <h1 className="text-3xl text-blue-500 font-bold mb-6">
                  Book Viewer
                </h1>
                <div className="prose max-w-none text-black bg-white p-6 rounded-lg shadow-md">
                  {bookContent.content
                    .split("\n")
                    .map((line: string, index: number) => (
                      <p key={index}>{line}</p>
                    ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default BookViewer;
