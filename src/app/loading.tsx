import Image from "next/image";

function Loading() {
  return (
    <div
      className="w-screen flex items-center justify-center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <Image
        src="https://www.gutenberg.org/gutenberg/pg-logo-129x80.png"
        width={129}
        height={80}
        alt="Gutenberg Explorer"
        priority
        loading="eager"
      />
    </div>
  );
}

export default Loading;
