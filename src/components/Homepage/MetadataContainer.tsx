import { MainMetadataProps, MainProps } from "@/types/homepage.type";
import Image from "next/image";

async function MetadataContainer({
  bookId,
  bookMetadata,
}: MainProps & MainMetadataProps): Promise<JSX.Element> {
  const metadataKeys = !bookMetadata ? [] : Object.keys(bookMetadata);

  if (!bookId || !bookMetadata || metadataKeys.length === 0) {
    return <></>;
  }

  return (
    <section>
      {bookMetadata?.["Cover Image"] ? (
        <div className="flex justify-center items-center">
          <Image
            src={bookMetadata["Cover Image"]}
            alt="book-cover"
            width={200}
            height={300}
            loading="eager"
          />
        </div>
      ) : (
        <></>
      )}
      <div className="bg-gray-100 p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-blue-500">
            Book Metadata
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <tbody>
                {metadataKeys.map((key) => {
                  if (key === "Cover Image") {
                    return;
                  }
                  return (
                    <tr className="border-b border-gray-200" key={key}>
                      <th className="py-3 px-6 text-gray-700 text-left">
                        {key}
                      </th>
                      <td className="py-3 px-6 text-gray-900">
                        {bookMetadata[key]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MetadataContainer;
