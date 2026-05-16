import Image from "next/image";
import Link from "next/link";

export default function SearchButton() {
  return (
    <Link
      href="/search"
      aria-label="검색 페이지로 이동"
      className="inline-flex h-[42px] w-full items-center justify-center gap-2 rounded-[40px] border border-gray-800 bg-[var(--Gray6,#212121)] px-4 py-3"
    >
      <Image src="/search-icon.svg" alt="" width={24} height={24} />
      <span className="min-w-0 flex-1 text-left text-body leading-typography text-gray-400">
        글 제목, 내용, #해시태그
      </span>
    </Link>
  );
}
