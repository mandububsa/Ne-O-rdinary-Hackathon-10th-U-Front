import { FEED_RECIPES } from "@/data/feed";
import BottomNavbar from "@/components/BottomNavbar";
import SearchButton from "@/app/search/_components/SearchButton";
import NotificationIcon from "./_components/NotificationIcon";
import MonthlyBanner from "./_components/MonthlyBanner";
import SectionHeading from "./_components/SectionHeading";
import RecipeCard from "./_components/RecipeCard";

export default function MainPage() {
  return (
    <main className="min-h-screen bg-[#101010] text-white">
      <div className="mx-auto flex min-h-screen w-[360px] flex-col pb-[calc(86px+env(safe-area-inset-bottom))]">
        {/* 헤더: 서비스명과 알림 진입점을 모바일 상단에 배치한다. */}
        <header className="flex w-full flex-col gap-7 px-4 pb-3 pt-6">
          <div className="flex h-[42px] items-end justify-between">
            <p className="font-nexon text-[20px] font-bold leading-none text-white">
              드숑마숑
            </p>
            <button
              type="button"
              aria-label="알림 보기"
              className="inline-flex size-8 items-center justify-center text-white"
            >
              <NotificationIcon />
            </button>
          </div>

          {/* 검색: 기존 SearchButton 컴포넌트를 재사용해 검색 페이지로 연결한다. */}
          <SearchButton />
        </header>

        {/* 월간 주제 배너: 피드 최상단의 캠페인 이미지를 강조한다. */}
        <MonthlyBanner />

        <div className="mt-7 flex flex-col gap-7">
          <SectionHeading />

          {/* 추천 피드: 모바일 2열 고정 (360px 기준) */}
          <section className="grid w-full grid-cols-2 gap-x-3 gap-y-7 px-4">
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
