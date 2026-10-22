import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between">
      <Link className="no-underline" href="/">
        Paul Lin
      </Link>

      <ul className="flex list-none items-center gap-5">
        <li>
          <Link className="no-underline" href="/portfolio">
            Portfolio
          </Link>
        </li>
        <li>
          <Link className="no-underline" href="/experiences">
            Experiences
          </Link>
        </li>
        <li>
          <Link className="no-underline" href="/blog">
            Blog
          </Link>
        </li>
        <li>
          <Link className="no-underline" href="/links">
            Links
          </Link>
        </li>
        <li>
          <Link className="no-underline" href="/about">
            About
          </Link>
        </li>
      </ul>
    </div>
  );
}
