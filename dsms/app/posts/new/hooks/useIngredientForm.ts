// new/hooks/useIngredientForm.ts
import { useState, useEffect } from 'react';
import { MaterialCategory, MaterialRole, IngredientInput } from '@/types/recipe';

export const MAX_INGREDIENTS = 3;

export function useIngredientForm() {
  const [topCategories, setTopCategories] = useState<MaterialCategory[]>([]);
  const [subCategories, setSubCategories] = useState<MaterialCategory[]>([]);
  const [selectedTop, setSelectedTop] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/categories?depth=0')
      .then(res => res.json())
      .then(data => setTopCategories(data));
  }, []);

  useEffect(() => {
    if (selectedTop === null) return;
    fetch(`/api/categories?depth=1&parent_id=${selectedTop}`)
      .then(res => res.json())
      .then(data => setSubCategories(data));
  }, [selectedTop]);

  const addIngredient = (value: IngredientInput[], onChange: (v: IngredientInput[]) => void) => {
    if (value.length >= MAX_INGREDIENTS) return;
    onChange([
      ...value,
      { category_id: null, name: '', role: 'MAIN', measure: '', display_order: value.length }
    ]);
  };

  const removeIngredient = (index: number, value: IngredientInput[], onChange: (v: IngredientInput[]) => void) => {
    onChange(
      value
        .filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, display_order: i }))
    );
  };

  const updateIngredient = (
    index: number,
    field: keyof IngredientInput,
    val: string | number | null,
    value: IngredientInput[],
    onChange: (v: IngredientInput[]) => void
  ) => {
    onChange(value.map((item, i) =>
      i === index ? { ...item, [field]: val } : item
    ));
  };

  // MAIN: 정수만, SUB: 숫자 자유 입력
  const handleMeasureChange = (
    index: number,
    val: string,
    role: MaterialRole,
    value: IngredientInput[],
    onChange: (v: IngredientInput[]) => void
  ) => {
    if (role === 'MAIN') {
      const onlyInt = val.replace(/[^0-9]/g, '');         // 정수만 허용
      updateIngredient(index, 'measure', onlyInt, value, onChange);
    } else {
      const onlyNumber = val.replace(/[^0-9.]/g, '')      // 숫자 + 소수점만 허용
        .replace(/(\..*)\./g, '$1');                       // 소수점 중복 방지
      updateIngredient(index, 'measure', onlyNumber, value, onChange);
    }
  };

  const handleTopChange = (
    topId: number,
    index: number,
    value: IngredientInput[],
    onChange: (v: IngredientInput[]) => void
  ) => {
    setSelectedTop(topId);
    updateIngredient(index, 'category_id', null, value, onChange);
  };

  return {
    topCategories,
    subCategories,
    selectedTop,
    addIngredient,
    removeIngredient,
    updateIngredient,
    handleMeasureChange,
    handleTopChange,
  };
}