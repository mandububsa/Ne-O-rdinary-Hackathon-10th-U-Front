import SearchInput from "./_components/SearchInput";

export default function SearchPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-5 py-12 sm:px-6 sm:py-20">
      <section className="flex w-full max-w-3xl flex-col gap-6">
        <SearchInput />
      </section>
    </main>
  );
}
