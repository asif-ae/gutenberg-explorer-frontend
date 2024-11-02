import { MainProps } from "@/types/homepage.type";
import SearchContainer from "./SearchContainer";

function Home({ bookId }: MainProps): JSX.Element {
  return (
    <>
      <SearchContainer bookId={bookId} />
    </>
  );
}

export default Home;
