'use client';

import type { ReactNode } from 'react';

type RecipeFormShellProps = {
  progress: 1 | 2 | 3;
  onBack: () => void;
  children: ReactNode;
  footer: ReactNode;
};

function BackIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none">
      <path
        d="M15 18 9 12l6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function RecipeFormShell({
  progress,
  onBack,
  children,
  footer,
}: RecipeFormShellProps) {
  return (
    <main className="min-h-screen bg-[#101010] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[960px] flex-col px-4 py-6 font-pretendard sm:px-6 lg:px-8">
        {/* 웹앱 상단 영역: 뒤로가기 액션만 간결하게 보여준다. */}
        <header className="flex items-center py-2">
          <button
            type="button"
            aria-label="이전 화면으로 이동"
            onClick={onBack}
            className="inline-flex size-10 items-center justify-center text-white transition hover:text-primary-500"
          >
            <BackIcon />
          </button>
        </header>

        {/* 생성 단계 진행도를 3분할 프로그레스 바로 보여준다. */}
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-[#242424]">
          <div
            className="h-full bg-primary-500 transition-[width]"
            style={{ width: `${(progress / 3) * 100}%` }}
          />
        </div>

        <section className="mx-auto w-full max-w-[720px] flex-1 pb-8 pt-10 sm:pt-12">
          {children}
        </section>

        <div className="sticky bottom-0 -mx-4 bg-[#101010]/95 px-4 pb-[calc(18px+env(safe-area-inset-bottom))] pt-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mx-auto w-full max-w-[720px]">{footer}</div>
        </div>
      </div>
    </main>
  );
}
