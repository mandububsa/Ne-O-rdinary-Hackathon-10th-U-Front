export default function NotificationIcon() {
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
