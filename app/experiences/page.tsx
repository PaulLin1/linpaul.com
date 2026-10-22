import FolderList from "@/app/components/folder-list";

export default function Experiences() {
  return (
    <>
      <h1 className="text-4xl font-sans text-black mb-5">
        Experiences
      </h1>
      <FolderList directory="content/experiences" />
    </>
  );
}
