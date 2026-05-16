"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";

const SEARCH_DEBOUNCE_DELAY = 300;
const SEARCH_KEYWORD_MAX_LENGTH = 8;

type SearchInputProps = {
  onSearch?: (keyword: string) => void;
};

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      onSearch?.("");
      return;
    }

    const timeoutId = window.setTimeout(
      () => onSearch?.(trimmedKeyword),
      SEARCH_DEBOUNCE_DELAY,
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [keyword, onSearch]);

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextKeyword = event.target.value.slice(0, SEARCH_KEYWORD_MAX_LENGTH);

    setKeyword(nextKeyword);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      return;
    }

    onSearch?.(trimmedKeyword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex h-[42px] w-full items-center justify-center gap-2 rounded-[40px] border border-gray-800 bg-[var(--Gray6,#212121)] px-4 py-3"
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
        onChange={handleKeywordChange}
        placeholder="검색어 입력"
        maxLength={SEARCH_KEYWORD_MAX_LENGTH}
        className="min-w-0 flex-1 bg-transparent text-body leading-typography text-white outline-none placeholder:text-gray-400"
      />
    </form>
  );
}
