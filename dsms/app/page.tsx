import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center font-sans">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-12 px-5 py-12 sm:items-start sm:px-8 sm:py-20 md:px-16 md:py-32">
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          style={{ width: 100, height: 20 }}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium underline underline-offset-4"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium underline underline-offset-4"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex w-full max-w-sm flex-col gap-3 text-sm font-medium sm:max-w-none sm:flex-row sm:text-base">
          <a
            className="inline-flex min-h-12 w-full min-w-0 items-center justify-center gap-2 rounded-full border border-current px-5 text-center leading-none transition sm:w-auto sm:min-w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
              style={{ width: 16, height: 16 }}
            />
            Deploy Now
          </a>
          <a
            className="inline-flex min-h-12 w-full min-w-0 items-center justify-center rounded-full border border-current px-5 text-center leading-none transition sm:w-auto sm:min-w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
