import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center justify-center items-center">
        <Image
          className=""
          src="https://www.koda.dk/media/224539/koda_rgb.png"
          alt="koda logo"
          width={180}
          height={180}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left">
          Case af Nikolaj Schlüter Nielsen
        </ol>

        <div className="flex gap-4 items-center flex-col">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/signup"
            rel="noopener noreferrer"
          >
            Opret medlemskab (user story)
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/members"
            rel="noopener noreferrer"
          >
            Alle medlemmer
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
