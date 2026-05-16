// components/StepProgressBar.tsx

interface StepProgressBarProps {
  currentStep: number; // 1부터 시작
  totalSteps: number;
  labels?: string[];   // 선택적 단계 라벨
}

export default function StepProgressBar({ currentStep, totalSteps, labels }: StepProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full flex flex-col gap-1">
      {labels && (
        <p className="typo-caption text-gray-500">
          {labels[currentStep - 1]}
        </p>
      )}
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="typo-caption text-gray-400 text-right">
        {currentStep} / {totalSteps}
      </p>
    </div>
  );
}