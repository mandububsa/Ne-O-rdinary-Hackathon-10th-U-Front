import Image from "next/image";
import { FEED_RECIPES } from "@/data/feed";
import BottomNavbar from "@/components/BottomNavbar";
import SearchButton from "@/app/search/_components/SearchButton";
import MonthlyBanner from "./_components/MonthlyBanner";
import SectionHeading from "./_components/SectionHeading";
import RecipeCard from "./_components/RecipeCard";

export default function MainPage() {
  return (
    <main className="min-h-screen bg-[#101010] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col pb-[calc(86px+env(safe-area-inset-bottom))]">
        {/* 헤더: 서비스명을 모바일 상단에 배치한다. */}
        <header className="flex w-full flex-col gap-7 px-4 pb-3 pt-6 sm:px-6 sm:pt-10">
          <div className="flex h-[42px] items-end">
            <Image
              src="/logo.svg"
              alt="드숑마숑"
              width={89}
              height={27}
              priority
            />
          </div>

          {/* 검색: 기존 SearchButton 컴포넌트를 재사용해 검색 페이지로 연결한다. */}
          <SearchButton />
        </header>

        {/* 월간 주제 배너: 피드 최상단의 캠페인 이미지를 강조한다. */}
        <MonthlyBanner />

        <div className="mt-7 flex flex-col gap-7">
          <SectionHeading />

          {/* 추천 피드: 모바일 2열을 기본으로 두고 넓은 화면에서는 열 수가 자연스럽게 늘어난다. */}
          <section className="grid w-full grid-cols-2 gap-x-3 gap-y-7 px-4 sm:grid-cols-[repeat(auto-fit,minmax(158px,1fr))] sm:px-6">
            {FEED_RECIPES.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </section>
        </div>
      </div>

      <BottomNavbar />
    </main>
  );
}
