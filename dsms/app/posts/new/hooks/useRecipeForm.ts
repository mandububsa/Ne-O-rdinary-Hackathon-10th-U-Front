// new/hooks/useRecipeForm.ts
'use client'

import { useState } from 'react';
import { IngredientInput } from '@/types/recipe';

type Step = 'ingredients' | 'ratios' | 'recipe';

export function useRecipeForm() {
  // --- Step ---
  const [step, setStep] = useState<Step>('ingredients');

  // --- Form 상태 ---
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IngredientInput[]>([]);

  // --- 이미지 핸들러 ---
  const handleImageChange = (file: File | null) => {
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : '');
  };

  // --- Step 이동 ---
  const goToRatios = () => setStep('ratios');
  const goToRecipe = () => setStep('recipe');
  const goToIngredients = () => setStep('ingredients');

  // --- 제출 ---
  const handleSubmit = async () => {
    const { createRecipe } = await import('@/lib/api');
    
    // IngredientInput을 Material 타입으로 변환
    const mainMaterials = ingredients
      .filter((ing) => ing.role === 'MAIN')
      .map((ing) => ({
        categoryId: ing.category_id || 1, // 서버 스펙상 필수, 없으면 기본값
        name: ing.name,
        measure: ing.measure || '0', // 서버는 % 기호 없이 숫자만 요구함
      }));

    const subMaterials = ingredients
      .filter((ing) => ing.role === 'SUB')
      .map((ing) => ({
        categoryId: ing.category_id || 1, // 서버 스펙상 필수, 없으면 기본값
        name: ing.name,
        measure: ing.measure || '',
      }));

    const requestPayload = {
      name: title,
      description: content,
      mainMaterials,
      subMaterials,
    };

    const result = await createRecipe(requestPayload, image);
    console.log('Recipe created:', result);
    return result;
  };

  return {
    // Step
    step,
    goToRatios, goToRecipe,
    goToIngredients,
    // 상태값
    title, content, image, preview, tags, ingredients,
    // 핸들러
    setTitle, setContent, setTags, setIngredients,
    handleImageChange,
    handleSubmit,
  };
}
