"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

// 디바운싱은 주석 처리. 검색했을 때 추천 검색어 뜨게 하는 게 아니라면
// const SEARCH_DEBOUNCE_DELAY = 300;

const searchKeyword = (keyword: string) => {
  console.log("검색어:", keyword);
};

export default function SearchInput() {
  const [keyword, setKeyword] = useState("");
  // const [debouncedKeyword, setDebouncedKeyword] = useState("");

  // useEffect(() => {
  //   const timeoutId = window.setTimeout(() => {
  //     setDebouncedKeyword(keyword.trim());
  //   }, SEARCH_DEBOUNCE_DELAY);

  //   return () => {
  //     window.clearTimeout(timeoutId);
  //   };
  // }, [keyword]);

  // useEffect(() => {
  //   if (!debouncedKeyword) {
  //     return;
  //   }

  //   searchKeyword(debouncedKeyword);
  // }, [debouncedKeyword]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      return;
    }

    searchKeyword(trimmedKeyword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex min-h-[42px] w-full max-w-[327px] items-center justify-center gap-2 rounded-[40px] border border-gray-700 bg-gray-900 px-4 py-3"
    >
      <button
        type="submit"
        aria-label="검색"
        className="inline-flex size-6 shrink-0 items-center justify-center"
      >
        <Image src="/search-icon.svg" alt="" width={24} height={24} />
      </button>
      <input
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="검색어를 입력하세요"
        className="min-w-0 flex-1 bg-transparent text-body leading-typography text-white outline-none placeholder:text-gray-400"
      />
    </form>
  );
}
