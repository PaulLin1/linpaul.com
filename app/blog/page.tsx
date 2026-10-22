import FolderList from "@/app/components/folder-list";

export default function Blog() {
  return (
    <>
      <h1 className="text-4xl font-sans text-black mb-5">
        Blog
      </h1>
      <FolderList directory="content/blog" />
    </>
  );
}
