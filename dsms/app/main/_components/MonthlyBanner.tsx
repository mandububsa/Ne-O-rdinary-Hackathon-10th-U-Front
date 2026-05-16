import Image from "next/image";

export default function MonthlyBanner() {
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
