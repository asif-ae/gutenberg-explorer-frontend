import BookViewer from "@/components/Homepage/BookViewer";
import Home from "@/components/Homepage/Home";
import MetadataContainer from "@/components/Homepage/MetadataContainer";
import { HomepageProps } from "@/types/homepage.type";
import addSearchParams from "@/utils/addSearchParams";

export default async function Homepage({
  searchParams,
}: HomepageProps): Promise<JSX.Element> {
  const allSearchParams = await searchParams;
  // const [bookId, setBookId] = useState<string>("");
  // const [bookData, setBookData] = useState<Book | null>(null);
  // const [previousBooks, setPreviousBooks] = useState<Book[]>([]);

  // const fetchBook = async (id: string) => {
  //   try {
  //     const { content, metadataHtml } = await fetch(
  //       `${window.location.origin}/api/readRemoteFile`
  //     ).then((response) => response.json());

  //     const titleMatch = metadataHtml.match(/<h1>(.*?)<\/h1>/);
  //     const title = titleMatch ? titleMatch[1] : "Unknown Title";

  //     const newBook: Book = { id, title, content };
  //     setBookData(newBook);
  //     setPreviousBooks((prev) => [...prev, newBook]);
  //   } catch (error) {
  //     console.error("Error fetching book:", error);
  //   }
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (bookId) {
  //     fetchBook(bookId);
  //   }
  // };

  const url = addSearchParams(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/book/getMetadata`,
    {
      id: allSearchParams?.id || "",
    }
  );

  const bookMetadata = await fetch(url, { method: "GET" }).then(
    async (response) => {
      const isOk = await response.ok;
      if (!isOk) {
        return null;
      }

      const data = await response.json();

      return data;
    }
  );

  return (
    <>
      <Home bookId={allSearchParams?.id} />
      <MetadataContainer
        bookId={allSearchParams?.id}
        bookMetadata={bookMetadata}
      />
      <BookViewer bookId={allSearchParams?.id} bookMetadata={bookMetadata} />

      {/* <main>
        <div className="p-4">
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              placeholder="Enter Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              className="border p-2 rounded mr-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Fetch Book
            </button>
          </form>

          {bookData && (
            <div className="mb-4">
              <h2 className="text-xl font-bold">{bookData.title}</h2>
              <pre className="whitespace-pre-wrap border p-4">
                {bookData.content}
              </pre>
            </div>
          )}

          <h3 className="font-bold">Previously Accessed Books:</h3>
          <ul>
            {previousBooks.map((book) => (
              <li key={book.id}>
                {book.title} (ID: {book.id})
              </li>
            ))}
          </ul>
        </div>
      </main> */}
    </>
  );
}
