import Image from "next/image";
import Link from "next/link";
import { type RecipeItem } from "@/app/posts/hooks/useRecipes";

const BASE_IMAGE_URL = "https://zxcv9203.duckdns.org";

function RecipeImage({ recipe }: { recipe: RecipeItem }) {
  if (!recipe.imageUrl) {
    return <div className="aspect-[158/110] w-full bg-[#D9D9D9]" />;
  }

  return (
    <div className="relative aspect-[158/110] w-full overflow-hidden">
      <Image
        src={`${BASE_IMAGE_URL}${recipe.imageUrl}`}
        alt={`${recipe.name} 이미지`}
        fill
        sizes="(max-width: 720px) 50vw, 170px"
        className="object-cover"
      />
    </div>
  );
}

export default function RecipeCard({ recipe }: { recipe: RecipeItem }) {
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
    </Link>
  );
}