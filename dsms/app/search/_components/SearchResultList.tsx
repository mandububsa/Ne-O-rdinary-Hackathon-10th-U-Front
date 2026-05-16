import { assetUrl } from "@/lib/api";
import { RecipeSearchItem } from "@/lib/recipes";

type SearchResultListProps = {
  results: RecipeSearchItem[];
};

export default function SearchResultList({ results }: SearchResultListProps) {
  if (results.length === 0) {
    return (
      <p className="py-10 text-center typo-text text-gray-400">
        검색 결과가 없습니다.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3" aria-label="검색 결과">
      {results.map((recipe, index) => (
        <li
          key={`${recipe.name}-${index}`}
          className="flex min-h-20 w-full items-center gap-3 rounded-[20px] bg-[var(--Gray6,#212121)] p-4"
        >
          <div className="size-12 shrink-0 overflow-hidden rounded-[16px] bg-gray-800">
            {recipe.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={assetUrl(recipe.imageUrl)}
                alt=""
                className="size-full object-cover"
              />
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="truncate typo-text font-semibold text-white">
              {recipe.name}
            </p>
            {recipe.description && (
              <p className="truncate typo-text text-gray-400">
                {recipe.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
