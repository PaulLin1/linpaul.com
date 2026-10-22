import FolderList from "@/app/components/folder-list";

export default function Portfolio() {
  return (
    <>
      <h1 className="text-4xl font-sans text-black mb-5">
        Portfolio
      </h1>
      <FolderList directory="content/portfolio" />
    </>
  );
}
