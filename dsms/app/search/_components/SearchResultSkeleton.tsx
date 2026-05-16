const skeletonItems = ["first", "second", "third"];

export default function SearchResultSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-label="검색 결과를 불러오는 중">
      {skeletonItems.map((item) => (
        <div
          key={item}
          className="flex min-h-20 w-full items-center gap-3 rounded-[20px] bg-[var(--Gray6,#212121)] p-4"
        >
          <div className="size-12 shrink-0 rounded-[16px] bg-gray-800" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="h-4 w-2/5 rounded-full bg-gray-800" />
            <div className="h-3 w-4/5 rounded-full bg-gray-900" />
          </div>
        </div>
      ))}
    </div>
  );
}
