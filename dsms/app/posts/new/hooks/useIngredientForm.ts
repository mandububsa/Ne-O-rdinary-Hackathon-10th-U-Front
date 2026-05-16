// new/hooks/useIngredientForm.ts
'use client'

import { useState } from 'react';
import { MaterialRole, IngredientInput, MaterialCategoryWithChildren } from '@/types/recipe';
import { useMaterialCategories } from '@/hooks/useMaterialCategories';

export const MAX_INGREDIENTS = 3;

export function useIngredientForm() {
  const { categories } = useMaterialCategories();
  const [selectedTop, setSelectedTop] = useState<number | null>(null);

  // 대분류: categories 자체
  const topCategories: MaterialCategoryWithChildren[] = categories;

  // 중분류: 선택된 대분류의 children
  const subCategories: MaterialCategoryWithChildren[] =
    selectedTop !== null
      ? (categories.find(cat => cat.id === selectedTop)?.children ?? [])
      : [];

  const addIngredient = (value: IngredientInput[], onChange: (v: IngredientInput[]) => void) => {
    if (value.length >= MAX_INGREDIENTS) return;
    onChange([
      ...value,
      { category_id: null, name: '', role: 'MAIN', measure: '', display_order: value.length }
    ]);
  };

  const removeIngredient = (
    index: number,
    value: IngredientInput[],
    onChange: (v: IngredientInput[]) => void
  ) => {
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

  const handleMeasureChange = (
    index: number,
    val: string,
    role: MaterialRole,
    value: IngredientInput[],
    onChange: (v: IngredientInput[]) => void
  ) => {
    if (role === 'MAIN') {
      const onlyInt = val.replace(/[^0-9]/g, '');
      updateIngredient(index, 'measure', onlyInt, value, onChange);
    } else {
      const onlyNumber = val.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
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