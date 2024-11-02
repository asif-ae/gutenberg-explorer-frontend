export type HomepageProps = {
  searchParams?: { id?: string };
};

export type MainProps = {
  bookId?: string;
};

export type MainMetadataProps = {
  bookMetadata?: {
    [key: string]: string | undefined;
    ["Cover Image"]?: string;
    ["Author"]?: string;
    ["Title"]?: string;
    ["Original Publication"]?: string;
    ["Credits"]?: string;
    ["Language"]?: string;
    ["Category"]?: string;
    ["Ebook No."]?: string;
    ["Release Date"]?: string;
    ["Copyright Status"]?: string;
    ["Downloads"]?: string;
  } | null;
};
