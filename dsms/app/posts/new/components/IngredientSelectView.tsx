'use client';

import { MaterialRole, IngredientInput } from '@/types/recipe';
import { useIngredientForm, MAX_INGREDIENTS } from '../hooks/useIngredientForm';

type Props = {
  value: IngredientInput[];
  onChange: (ingredients: IngredientInput[]) => void;
};

export default function IngredientSelectView({ value, onChange }: Props) {
  const {
    topCategories, subCategories, selectedTop,
    addIngredient, removeIngredient, updateIngredient, handleTopChange,
    handleMeasureChange
  } = useIngredientForm();

  return (
    <div className="space-y-4 w-full">
      {value.map((ingredient, index) => (
        <div key={index} className="flex flex-col gap-2 p-4 bg-gray-100 rounded-xl">
          <input
            value={ingredient.name}
            onChange={e => updateIngredient(index, 'name', e.target.value, value, onChange)}
            placeholder="재료명 (예: 카스 맥주)"
            className="w-full rounded-xl px-4 py-3 bg-white text-gray-900 typo-text placeholder:text-gray-400 border-2 border-transparent focus:border-primary-400 outline-none transition"
          />

          <select
            value={selectedTop ?? ''}
            onChange={e => handleTopChange(Number(e.target.value), index, value, onChange)}
            className="w-full rounded-xl px-4 py-3 bg-white text-gray-900 typo-text border-2 border-transparent focus:border-primary-400 outline-none transition cursor-pointer"
          >
            <option value="" disabled>대분류 선택</option>
            {topCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          {selectedTop !== null && (
            <select
              value={ingredient.category_id ?? ''}
              onChange={e => updateIngredient(index, 'category_id', Number(e.target.value), value, onChange)}
              className="w-full rounded-xl px-4 py-3 bg-white text-gray-900 typo-text border-2 border-transparent focus:border-primary-400 outline-none transition cursor-pointer"
            >
              <option value="" disabled>중분류 선택</option>
              {subCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          )}

          <select
            value={ingredient.role}
            onChange={e => updateIngredient(index, 'role', e.target.value as MaterialRole, value, onChange)}
            className="w-full rounded-xl px-4 py-3 bg-white text-gray-900 typo-text border-2 border-transparent focus:border-primary-400 outline-none transition cursor-pointer"
          >
            <option value="MAIN">MAIN (비율 구성)</option>
            <option value="SUB">SUB (부재료)</option>
          </select>

          <input
            value={ingredient.measure}
            onChange={e => handleMeasureChange(index, e.target.value, ingredient.role, value, onChange)}
            placeholder={ingredient.role === 'MAIN' ? '비율 (예: 70)' : '용량 (예: 30.5)'}
            inputMode={ingredient.role === 'MAIN' ? 'numeric' : 'decimal'} // 모바일 키패드 최적화
            className="w-full rounded-xl px-4 py-3 bg-white text-gray-900 typo-text placeholder:text-gray-400 border-2 border-transparent focus:border-primary-400 outline-none transition"
            />

          <button
            type="button"
            onClick={() => removeIngredient(index, value, onChange)}
            className="self-end typo-caption text-gray-400 hover:text-red-500 transition"
          >
            삭제
          </button>
        </div>
      ))}

      {/* 최대 3개 제한 */}
      {value.length < MAX_INGREDIENTS ? (
        <button
          type="button"
          onClick={() => addIngredient(value, onChange)}
          className="w-full rounded-xl py-3 border-2 border-dashed border-gray-300 typo-text text-gray-400 hover:border-primary-400 hover:text-primary-500 transition"
        >
          + 재료 추가 ({value.length}/{MAX_INGREDIENTS})
        </button>
      ) : (
        <p className="text-center typo-caption text-gray-400">
          재료는 최대 {MAX_INGREDIENTS}개까지 추가할 수 있어요
        </p>
      )}
    </div>
  );
}