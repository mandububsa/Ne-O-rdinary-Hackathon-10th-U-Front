"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "피드", href: "/", icon: FeedNavIcon },
  { label: "레시피 생성", href: "/posts/new", icon: CreateRecipeIcon },
];

function FeedNavIcon({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
    >
      <path
        d="M4 10.8 12 4l8 6.8V20h-5.2v-5.8H9.2V20H4v-9.2Z"
        stroke="currentColor"
        strokeWidth={active ? "2" : "1.6"}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CreateRecipeIcon({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
    >
      <path
        d="M6 5h12l-4.5 7v6l-3 1v-7L6 5Z"
        stroke="currentColor"
        strokeWidth={active ? "2" : "1.6"}
        strokeLinejoin="round"
      />
      <path
        d="M8 8h8"
        stroke="currentColor"
        strokeWidth={active ? "2" : "1.6"}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="주요 메뉴"
      className="fixed bottom-0 left-1/2 z-20 flex w-[360px] -translate-x-1/2 justify-center bg-black pb-[max(env(safe-area-inset-bottom),12px)] shadow-[0_-4px_20px_0_rgba(255,255,255,0.15)]"
    >
      {/* navbar 상단 디바이더: 좌우 구분 없이 전체가 균일한 옅은 라인. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />
      <div className="inline-flex h-[50px] w-full max-w-[360px] items-center justify-between px-20">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex min-w-[56px] flex-col items-center justify-center gap-1 typo-caption font-medium ${
                isActive ? "text-primary-500" : "text-gray-300"
              }`}
            >
              <Icon active={isActive} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
