import Image from "next/image";
import Link from "next/link";
import { FEED_RECIPES, type FeedRecipe } from "@/data/feed";
import BottomNavbar from "@/components/BottomNavbar";
import SearchButton from "@/app/search/_components/SearchButton";

function NotificationIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
    >
      <path
        d="M18 16.5H6l1.3-1.9V10a4.7 4.7 0 0 1 9.4 0v4.6L18 16.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M10 19h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="7.5" cy="6.2" r="2.5" fill="var(--primary-500)" />
    </svg>
  );
}

function MonthlyBanner() {
  return (
    <section className="relative h-[280px] w-full overflow-hidden sm:rounded-lg">
      <Image
        src="/images/red-kiwi-month.png"
        alt="레드키위 월간 주제"
        fill
        priority
        sizes="(max-width: 720px) 100vw, 720px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <span className="absolute left-[13px] top-5 inline-flex items-center justify-center rounded-full bg-[#FF4063] px-2 py-1.5 font-nexon text-[12px] font-bold leading-none text-white">
        RED KIWI MONTH
      </span>
      <h1 className="absolute bottom-[27px] left-[26px] max-w-[270px] font-nexon text-heading font-bold leading-[1.4] text-white">
        레드키위로
        <br />
        어디까지 마숑봤어요?
      </h1>
    </section>
  );
}

function SectionHeading() {
  return (
    <section className="flex w-full flex-col gap-2 px-4 sm:px-6">
      <h2 className="font-nexon text-title font-bold leading-[1.2] text-white">
        당신을 위한 추천 레시피
      </h2>
      <p className="font-nexon text-body font-normal leading-[1.2] text-gray-300">
        용감한 사람들이 먼저 마셨습니다
      </p>
    </section>
  );
}

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
        sizes="(max-width: 720px) 50vw, 170px"
        className="object-cover"
      />
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: FeedRecipe }) {
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

export default function FeedPage() {
  return (
    <main className="min-h-screen bg-[#101010] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col pb-[calc(86px+env(safe-area-inset-bottom))]">
        {/* 헤더: 서비스명과 알림 진입점을 모바일 상단에 배치한다. */}
        <header className="flex w-full flex-col gap-7 px-4 pb-3 pt-6 sm:px-6 sm:pt-10">
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
