'use client';

type BackButtonProps = {
  /** 클릭 동작. 생략 시 브라우저 히스토리에서 뒤로 이동한다. */
  onClick?: () => void;
  /** 위치·블러 등 추가 스타일을 덧붙일 때 사용한다. */
  className?: string;
  ariaLabel?: string;
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

/** 피드·검색·레시피 생성 등에서 공통으로 쓰는 뒤로가기 버튼. */
export default function BackButton({
  onClick,
  className = '',
  ariaLabel = '이전 화면으로 이동',
}: BackButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick ?? (() => window.history.back())}
      className={`inline-flex size-10 items-center justify-center text-white transition hover:text-primary-500 ${className}`}
    >
      <BackIcon />
    </button>
  );
}
