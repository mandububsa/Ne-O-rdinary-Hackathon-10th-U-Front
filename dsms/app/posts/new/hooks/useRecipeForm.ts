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
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', JSON.stringify(tags));
    formData.append('ingredients', JSON.stringify(ingredients));
    if (image) formData.append('image', image);

    await fetch('/api/recipes', {
      method: 'POST',
      body: formData,
    });
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
