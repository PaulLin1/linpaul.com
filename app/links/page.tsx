const links = [
  {
    title: "GitHub",
    href: "https://github.com/PaulLin1",
    label: "github.com/PaulLin1",
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/plin/",
    label: "linkedin.com/in/plin",
  },
  {
    title: "Email",
    href: "mailto:linp40182@gmail.com",
    label: "linp40182@gmail.com",
  },
];

export default function Links() {
  return (
    <>
      <h1 className="mb-5 font-sans text-4xl text-black">Links</h1>

      <ul className="flex list-none flex-col gap-1 pl-0">
        {links.map((link) => (
          <li key={link.title}>
            <a
              href={link.href}
              className="flex items-center justify-between gap-1 no-underline"
            >
              <h2 className="min-w-0">{link.title}</h2>

              <div className="flex shrink-0 items-center gap-2">
                <span>{link.label}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}