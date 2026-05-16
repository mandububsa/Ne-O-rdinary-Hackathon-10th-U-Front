"use client";

import { FormEvent, useState } from "react";

export default function SearchInput() {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      return;
    }

    console.log("검색어:", trimmedKeyword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl items-center gap-2 rounded-lg border border-current p-2"
    >
      <input
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="검색어를 입력하세요"
        className="min-h-11 min-w-0 flex-1 px-3 py-2 text-base outline-none sm:text-sm"
      />
      <button
        type="submit"
        className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-md border border-current px-4 py-2 text-sm font-medium transition"
      >
        검색
      </button>
    </form>
  );
}
