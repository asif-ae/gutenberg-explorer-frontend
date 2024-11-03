import BookViewer from "@/components/Homepage/BookViewer";
import Home from "@/components/Homepage/Home";
import MetadataContainer from "@/components/Homepage/MetadataContainer";
import { HomepageProps } from "@/types/homepage.type";
import addSearchParams from "@/utils/addSearchParams";
import { PageProps } from "../../.next/types/app/layout";

export default async function Homepage({
  searchParams,
}: HomepageProps & PageProps): Promise<JSX.Element> {
  const allSearchParams = await searchParams;

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
    </>
  );
}
