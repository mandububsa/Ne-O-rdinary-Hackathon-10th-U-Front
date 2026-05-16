import Image from "next/image";
import Link from "next/link";
import { type FeedRecipe } from "@/data/feed";

function RecipeImage({ recipe }: { recipe: FeedRecipe }) {
  if (!recipe.imageUrl) {
    return <div className="aspect-[158/110] w-full bg-[#D9D9D9]" />;
  }

  return (
    <div className="relative aspect-[158/110] w-full overflow-hidden">
      <Image
        src={recipe.imageUrl}
        alt={`${recipe.name} 이미지`}
        fill
        sizes="170px"
        className="object-cover"
      />
    </div>
  );
}

export default function RecipeCard({ recipe }: { recipe: FeedRecipe }) {
  return (
    <Link
      href={`/posts/${recipe.id}`}
      className="flex w-full min-w-0 flex-col items-start gap-3"
      aria-label={`${recipe.name} 상세 페이지로 이동`}
    >
      <RecipeImage recipe={recipe} />
      <div className="flex w-full flex-col gap-1">
        <h3 className="truncate text-subtitle font-medium leading-[1.2] text-white">
          {recipe.name}
        </h3>
        <p className="line-clamp-1 text-body font-medium leading-[1.2] text-gray-400">
          {recipe.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {recipe.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center justify-center rounded-[2px] border border-white/50 bg-gray-800 px-1.5 py-0.5 text-body font-medium leading-[1.2] text-white"
          >
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
