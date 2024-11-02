import Link from "next/link";

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gutenberg Explorer</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;