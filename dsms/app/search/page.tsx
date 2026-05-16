'use client'

import { useState } from "react";
import SearchInput from "./_components/SearchInput";
import SearchResultSkeleton from "./_components/SearchResultSkeleton";

const searchTabs = ["검색어", "재료"] as const;

const ingredientCategories = [
  {
    name: "주류",
    items: [
      "위스키",
      "럼",
      "진",
      "보드카",
      "데킬라",
      "브랜디",
      "리큐르",
      "와인",
      "맥주",
      "전통주",
      "기타 주류",
    ],
  },
  {
    name: "음료",
    items: ["탄산", "쥬스", "유제품", "커피", "차", "기타"],
  },
  {
    name: "과일",
    items: [
      "시트러스류",
      "베리류",
      "열대과일",
      "멜론류",
      "사과/배류",
      "핵과류",
      "기타 과일",
    ],
  },
  {
    name: "시럽",
    items: [
      "과일 시럽",
      "허브 시럽",
      "바닐라 시럽",
      "초콜릿 시럽",
      "캐러멜 시럽",
      "메이플 시럽",
      "꿀 / 당류",
      "기타 시럽",
    ],
  },
  {
    name: "기타재료",
    items: ["사용자 입력"],
  },
];

type SearchTab = (typeof searchTabs)[number];

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState<SearchTab>("검색어");
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [searchResetSignal, setSearchResetSignal] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(
    ingredientCategories[0],
  );
  const [selectedIngredient, setSelectedIngredient] = useState(
    ingredientCategories[0].items[0],
  );

  const handleCategoryClick = (
    category: (typeof ingredientCategories)[number],
  ) => {
    setSelectedCategory(category);
    setSelectedIngredient(category.items[0]);
  };

  const handleTabClick = (tab: SearchTab) => {
    setActiveTab(tab);
    setSearchedKeyword("");
    setSearchResetSignal((signal) => signal + 1);
  };

  const isKeywordTab = activeTab === "검색어";
  const isIngredientTab = activeTab === "재료";
  const hasSearchedKeyword = Boolean(searchedKeyword);
  const shouldShowSearchResult = isKeywordTab || hasSearchedKeyword;

  const getTabClassName = (tab: SearchTab) =>
    `min-h-10 rounded-[32px] typo-text transition ${
      tab === activeTab
        ? "bg-gray-800 font-semibold text-white"
        : "text-gray-400"
    }`;

  const getCategoryClassName = (
    category: (typeof ingredientCategories)[number],
  ) =>
    `min-h-10 shrink-0 rounded-[20px] px-4 text-left typo-text transition ${
      selectedCategory.name === category.name
        ? "bg-primary-500 font-semibold text-white"
        : "bg-gray-900 text-gray-400"
    }`;

  const getIngredientClassName = (ingredient: string) =>
    `min-h-10 rounded-[20px] px-4 typo-text transition ${
      selectedIngredient === ingredient
        ? "bg-gray-900 font-semibold text-white"
        : "border border-gray-800 bg-transparent text-gray-400"
    }`;

  const searchResult = (
    <div className="flex w-full flex-col gap-4">
      {hasSearchedKeyword ? (
        <>
          {isIngredientTab && (
            <p className="typo-text text-gray-400">
              재료:{" "}
              <span className="font-semibold text-white">
                {selectedIngredient}
              </span>
            </p>
          )}
          <SearchResultSkeleton />
        </>
      ) : (
        <p className="py-10 text-center typo-text text-gray-400">
          검색어를 입력하면 결과를 찾습니다.
        </p>
      )}
    </div>
  );

  return (
    <main className="flex min-h-screen w-full justify-center bg-[var(--SearchPageBackground,#101010)]">
      <section className="flex min-h-screen w-full max-w-[360px] flex-col items-center gap-7 px-5 pb-6 pt-6 sm:max-w-[720px] sm:px-6 sm:pt-10">
        <header className="w-full">
          <div className="flex w-full items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="이전 페이지로 이동"
              onClick={() => window.history.back()}
              className="inline-flex size-8 shrink-0 items-center justify-center typo-title text-white sm:size-10"
            >
              {"<"}
            </button>

            <div className="min-w-0 flex-1">
              <SearchInput
                key={searchResetSignal}
                onSearch={setSearchedKeyword}
              />
            </div>
          </div>
        </header>

        <nav className="grid w-full grid-cols-2 rounded-[40px] border border-gray-800 bg-[var(--Gray6,#212121)] p-1">
          {searchTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabClick(tab)}
              className={getTabClassName(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        {shouldShowSearchResult ? (
          searchResult
        ) : (
          <section className="grid w-full gap-4 sm:grid-cols-[180px_1fr]">
            <div className="flex gap-2 overflow-x-auto rounded-[24px] border border-gray-800 bg-[var(--Gray6,#212121)] p-3 sm:flex-col sm:overflow-visible">
              {ingredientCategories.map((category) => (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={getCategoryClassName(category)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="rounded-[24px] border border-gray-800 bg-[var(--Gray6,#212121)] p-4">
              <h1 className="typo-title font-bold text-white">
                {selectedCategory.name}
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedCategory.items.map((ingredient) => (
                  <button
                    key={ingredient}
                    type="button"
                    onClick={() => setSelectedIngredient(ingredient)}
                    className={getIngredientClassName(ingredient)}
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
