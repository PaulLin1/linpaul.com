import Image from "next/image";

export default function About() {
  return (
    <>
      <h1 className="text-4xl font-sans text-black mb-5">About</h1>
      <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <p>
          I am pursuing a Bachelor's in Computer Science from Michigan State
          University. In my free time I like listening to Belle and Sebastian,
          Jon Brion, and the Beatles. I also like Leonard Cohen's poetry and
          creative design done my campaign ltd..
        </p>
        <Image
          src="/about.jpg"
          alt="About"
          width={800}
          height={600}
          className="object-contain"
        ></Image>
      </div>
    </>
  );
}
