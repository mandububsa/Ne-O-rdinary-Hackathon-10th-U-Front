"use client";

import { useEffect, useState } from "react";
import SearchInput from "./_components/SearchInput";
import SearchResultSkeleton from "./_components/SearchResultSkeleton";
import SearchResultList from "./_components/SearchResultList";
import { useRecipeSearch } from "./_hooks/useRecipeSearch";
import { useMaterialCategories } from "@/hooks/useMaterialCategories";
import BackButton from "@/components/BackButton";

const searchTabs = ["검색어", "재료"] as const;

type SearchTab = (typeof searchTabs)[number];

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState<SearchTab>("검색어");
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [searchResetSignal, setSearchResetSignal] = useState(0);

  // 재료 카테고리 (대분류 → 중분류)
  const { categories, isLoading: isCategoriesLoading } = useMaterialCategories();
  const [selectedTopId, setSelectedTopId] = useState<number | null>(null);
  const [selectedSubId, setSelectedSubId] = useState<number | null>(null);

  // 카테고리가 로드되면 첫 대분류를 기본 선택
  useEffect(() => {
    if (selectedTopId === null && categories.length > 0) {
      setSelectedTopId(categories[0].id);
    }
  }, [categories, selectedTopId]);

  const isKeywordTab = activeTab === "검색어";

  const selectedTop =
    categories.find((category) => category.id === selectedTopId) ?? null;
  const subCategories = selectedTop?.children ?? [];

  // 검색에 쓸 카테고리 id — 중분류(재료)를 골랐으면 그 id, 아니면 대분류 id
  const searchCategoryId = selectedSubId ?? selectedTopId;

  // 탭에 따라 검색 조건 결정
  // - 검색어 탭: keyword 만
  // - 재료 탭: 선택한 카테고리(대분류/중분류) + 검색어로 추가 필터링
  const { results, isLoading, isError } = useRecipeSearch(
    isKeywordTab
      ? { keyword: searchedKeyword }
      : {
          keyword: searchedKeyword,
          categoryIds: searchCategoryId !== null ? [searchCategoryId] : [],
        },
  );

  const hasSearchedKeyword = Boolean(searchedKeyword);

  const handleTabClick = (tab: SearchTab) => {
    setActiveTab(tab);
    setSearchedKeyword("");
    setSelectedSubId(null);
    setSearchResetSignal((signal) => signal + 1);
  };

  const handleTopClick = (topId: number) => {
    setSelectedTopId(topId);
    setSelectedSubId(null);
  };

  const getTabClassName = (tab: SearchTab) =>
    `min-h-10 rounded-[32px] typo-text transition ${
      tab === activeTab
        ? "bg-gray-800 font-semibold text-white"
        : "text-gray-400"
    }`;

  const getCategoryClassName = (topId: number) =>
    `min-h-10 shrink-0 rounded-[20px] px-4 text-left typo-text transition ${
      selectedTopId === topId
        ? "bg-primary-500 font-semibold text-white"
        : "bg-gray-900 text-gray-400"
    }`;

  const getIngredientClassName = (subId: number) =>
    `min-h-10 rounded-[20px] px-4 typo-text transition ${
      selectedSubId === subId
        ? "bg-gray-900 font-semibold text-white"
        : "border border-gray-800 bg-transparent text-gray-400"
    }`;

  // 검색 결과 영역 (로딩/에러/목록)
  const renderResult = () => {
    if (isLoading) return <SearchResultSkeleton />;
    if (isError) {
      return (
        <p className="py-10 text-center typo-text text-gray-400">
          검색 결과를 불러오지 못했습니다.
        </p>
      );
    }
    return <SearchResultList results={results} />;
  };

  return (
    <main className="flex min-h-screen w-full justify-center bg-[var(--SearchPageBackground,#101010)]">
      <section className="flex min-h-screen w-[360px] flex-col items-center gap-7 px-5 pb-6 pt-6">
        <header className="w-full">
          <div className="flex w-full items-center gap-2 sm:gap-3">
            <BackButton className="shrink-0" />

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

        {isKeywordTab ? (
          <div className="flex w-full flex-col gap-4">
            {hasSearchedKeyword ? (
              renderResult()
            ) : (
              <p className="py-10 text-center typo-text text-gray-400">
                검색어를 입력하면 결과를 찾습니다.
              </p>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col gap-6">
            {isCategoriesLoading ? (
              <p className="py-10 text-center typo-text text-gray-400">
                카테고리를 불러오는 중...
              </p>
            ) : (
              <section className="grid w-full gap-4">
                <div className="flex gap-2 overflow-x-auto rounded-[24px] border border-gray-800 bg-[var(--Gray6,#212121)] p-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleTopClick(category.id)}
                      className={getCategoryClassName(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                <div className="rounded-[24px] border border-gray-800 bg-[var(--Gray6,#212121)] p-4">
                  <h1 className="typo-title font-bold text-white">
                    {selectedTop?.name ?? ""}
                  </h1>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {subCategories.map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setSelectedSubId(sub.id)}
                        className={getIngredientClassName(sub.id)}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {searchCategoryId !== null && (
              <div className="flex w-full flex-col gap-4">
                {renderResult()}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
