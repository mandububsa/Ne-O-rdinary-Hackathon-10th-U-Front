'use client';

import { useMemo } from 'react';
import type { IngredientInput } from '@/types/recipe';
import RecipeFormShell from './RecipeFormShell';

type RatioStepViewProps = {
  value: IngredientInput[];
  onChange: (ingredients: IngredientInput[]) => void;
  onNext: () => void;
  onBack: () => void;
};

function BottomButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex h-12 w-full items-center justify-center rounded-[4px] px-[14px] text-subtitle font-semibold leading-[1.5] text-white transition ${
        disabled ? 'bg-gray-800' : 'bg-primary-500'
      }`}
    >
      다음으로
    </button>
  );
}

function IngredientPill({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-800 px-3 py-3 text-subtitle font-semibold leading-[1.2] text-white">
      {name}
    </span>
  );
}

function RatioInputRow({
  ingredient,
  onRatioChange,
}: {
  ingredient: IngredientInput;
  onRatioChange: (value: string) => void;
}) {
  return (
    <div className="flex min-h-11 w-full items-center justify-between gap-4">
      <IngredientPill name={ingredient.name} />
      <label className="flex min-w-[96px] items-center justify-end gap-2 rounded-full px-3 py-2 text-right">
        <input
          aria-label={`${ingredient.name} 비율`}
          value={ingredient.measure}
          inputMode="numeric"
          maxLength={3}
          onChange={(event) => {
            const onlyNumber = event.target.value.replace(/[^0-9]/g, '');
            const clamped = Math.min(Number(onlyNumber || 0), 100);
            onRatioChange(onlyNumber ? String(clamped) : '');
          }}
          placeholder="-----"
          className="w-[58px] bg-transparent text-right text-title-pretendard-3xl font-semibold leading-[1.2] text-primary-500 outline-none placeholder:text-gray-500"
        />
        <span className="text-subtitle font-semibold leading-[1.2] text-white">
          %
        </span>
      </label>
    </div>
  );
}

export default function RatioStepView({
  value,
  onChange,
  onNext,
  onBack,
}: RatioStepViewProps) {
  const mainIngredients = useMemo(
    () => value.filter((ingredient) => ingredient.role === 'MAIN'),
    [value],
  );
  const subIngredients = useMemo(
    () => value.filter((ingredient) => ingredient.role === 'SUB'),
    [value],
  );
  const totalRatio = mainIngredients.reduce(
    (sum, ingredient) => sum + Number(ingredient.measure || 0),
    0,
  );
  const canContinue =
    mainIngredients.length > 0 &&
    mainIngredients.every((ingredient) => ingredient.measure !== '') &&
    totalRatio === 100;

  const updateRatio = (displayOrder: number, measure: string) => {
    onChange(
      value.map((ingredient) =>
        ingredient.display_order === displayOrder
          ? { ...ingredient, measure }
          : ingredient,
      ),
    );
  };

  return (
    <RecipeFormShell
      progress={2}
      onBack={onBack}
      footer={<BottomButton disabled={!canContinue} onClick={onNext} />}
    >
      <div className="flex flex-col gap-8">
        <h1 className="text-title-pretendard-3xl font-bold leading-[1.2] text-white">
          재료 비율을 입력해주세요
        </h1>

        {/* 주 재료는 합계가 100%가 되도록 입력해야 다음 단계로 넘어간다. */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-title font-semibold leading-[1.2] text-white">
              주 재료
            </h2>
            <p className="text-body font-medium leading-[1.2] text-gray-400">
              <span className="font-semibold text-primary-500">
                총 합이 100%
              </span>
              가 되도록 설정해주세요!
            </p>
          </div>
          <div className="flex flex-col gap-[11px]">
            {mainIngredients.map((ingredient) => (
              <RatioInputRow
                key={`${ingredient.display_order}-${ingredient.name}`}
                ingredient={ingredient}
                onRatioChange={(measure) =>
                  updateRatio(ingredient.display_order, measure)
                }
              />
            ))}
          </div>
          <p
            className={`text-right text-caption font-medium ${
              totalRatio === 100 ? 'text-primary-500' : 'text-gray-500'
            }`}
          >
            현재 합계 {totalRatio}%
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-title font-semibold leading-[1.2] text-white">
            부 재료
          </h2>
          <div className="flex flex-wrap gap-3">
            {subIngredients.length > 0 ? (
              subIngredients.map((ingredient) => (
                <IngredientPill
                  key={`${ingredient.display_order}-${ingredient.name}`}
                  name={
                    ingredient.measure
                      ? `${ingredient.name} ${ingredient.measure}`
                      : ingredient.name
                  }
                />
              ))
            ) : (
              <p className="text-body font-medium text-gray-500">
                입력된 부 재료가 없습니다
              </p>
            )}
          </div>
        </section>
      </div>
    </RecipeFormShell>
  );
}
