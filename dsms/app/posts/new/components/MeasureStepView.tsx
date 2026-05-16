// components/MeasureStepView.tsx
'use client'

import { IngredientInput } from '@/types/recipe';
import Button from './Button';

interface MeasureStepViewProps {
  ingredients: IngredientInput[];
  onChange: (ingredients: IngredientInput[]) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function MeasureStepView({ ingredients, onChange, onPrev, onNext }: MeasureStepViewProps) {

  const updateMeasure = (index: number, val: string) => {
    const ingredient = ingredients[index];

    // MAIN: 정수만, SUB: 자유 텍스트
    const filtered = ingredient.role === 'MAIN'
      ? val.replace(/[^0-9]/g, '')
      : val;

    onChange(ingredients.map((item, i) =>
      i === index ? { ...item, measure: filtered } : item
    ));
  };

  const mainIngredients = ingredients.filter(i => i.role === 'MAIN');
  const totalRatio = mainIngredients.reduce((sum, i) => sum + (Number(i.measure) || 0), 0);
  const isRatioValid = mainIngredients.length === 0 || totalRatio === 100;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="typo-heading font-bold text-gray-900">비율 입력</h1>
        <p className="typo-text text-gray-500">
          MAIN 재료의 비율 합계는 100이 되어야 해요
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex flex-col gap-2 p-4 bg-gray-100 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="typo-text font-bold text-gray-900">
                {ingredient.name || `재료 ${index + 1}`}
              </span>
              <span className={`typo-caption px-2 py-0.5 rounded-full ${
                ingredient.role === 'MAIN'
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {ingredient.role}
              </span>
            </div>

            {ingredient.role === 'MAIN' ? (
              <>
                <div className="flex items-center gap-2">
                  <input
                    value={ingredient.measure}
                    onChange={e => updateMeasure(index, e.target.value)}
                    placeholder="비율 (예: 70)"
                    inputMode="numeric"
                    className="flex-1 rounded-xl px-4 py-3 bg-white text-gray-900 typo-text placeholder:text-gray-400 border-2 border-transparent focus:border-primary-400 outline-none transition"
                  />
                  <span className="typo-text text-gray-500">%</span>
                </div>
                {Number(ingredient.measure) > 0 && (
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(Number(ingredient.measure), 100)}%` }}
                    />
                  </div>
                )}
              </>
            ) : (
              <input
                value={ingredient.measure}
                onChange={e => updateMeasure(index, e.target.value)}
                placeholder="용량 또는 설명 (예: 30ml, 2개, 적당량)"
                className="w-full rounded-xl px-4 py-3 bg-white text-gray-900 typo-text placeholder:text-gray-400 border-2 border-transparent focus:border-primary-400 outline-none transition"
              />
            )}
          </div>
        ))}
      </div>

      {mainIngredients.length > 0 && (
        <div className={`flex justify-between items-center px-4 py-3 rounded-xl typo-text ${
          isRatioValid ? 'bg-primary-50 text-primary-600' : 'bg-red-50 text-red-500'
        }`}>
          <span>MAIN 비율 합계</span>
          <span className="font-bold">{totalRatio} / 100%</span>
        </div>
      )}

      <div className="flex gap-3">
        <Button title="이전" variant="secondary" onClick={onPrev} />
        <Button
          title="다음"
          variant="primary"
          onClick={onNext}
        />
      </div>
    </div>
  );
}