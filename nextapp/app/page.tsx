import Image from "next/image";

export default function Home() {
  return (
    <div>
      <header>
        <h1 className="text-center text-5xl font-bold py-20">
          AereoDB
        </h1>
      </header>
      <main className="flex flex-col items-center">
        <Image
          className="rounded-lg"
          src="/wtc.jpg"
          alt="Airplanes image"
          width={525}
          height={295} />
      </main>
    </div>
  );
}
