"use client";

import Image from "next/image";
import BottomNavbar from "@/components/BottomNavbar";
import SearchButton from "@/app/search/_components/SearchButton";
import MonthlyBanner from "./_components/MonthlyBanner";
import SectionHeading from "./_components/SectionHeading";
import RecipeCard from "./_components/RecipeCard";
import { useRecipes } from "./posts/hooks/useRecipes";

export default function MainPage() {
  const { data: recipes, isLoading, error } = useRecipes();

  return (
    <main className="min-h-screen bg-[#101010] text-white">
      <div className="mx-auto flex min-h-screen w-[360px] flex-col pb-[calc(86px+env(safe-area-inset-bottom))]">
        <header className="flex w-full flex-col gap-7 px-4 pb-3 pt-6">
          <div className="flex h-[42px] items-end">
            <Image
              src="/logo.svg"
              alt="드숑마숑"
              width={89}
              height={27}
              priority
            />
          </div>
          <SearchButton />
        </header>

        <MonthlyBanner />

        <div className="mt-7 flex flex-col gap-7">
          <SectionHeading />

          <section className="grid w-full grid-cols-2 gap-x-3 gap-y-7 px-4">
            {isLoading && (
              <p className="col-span-2 text-center text-[#606060]">불러오는 중...</p>
            )}
            {error && (
              <p className="col-span-2 text-center text-[#606060]">오류가 발생했어요</p>
            )}
            {!isLoading && !error && recipes?.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </section>
        </div>
      </div>

      <BottomNavbar />
    </main>
  );
}
