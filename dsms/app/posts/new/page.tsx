'use client'

import { useRouter } from "next/navigation";
import { useRecipeForm } from "./hooks/useRecipeForm";
import StepProgressBar from "./components/StepProgressBar";
import RecipeInputView from "./components/RecipeInputView";
import IngredientStepView from "./components/IngredientStepView";
import RatioStepView from "./components/RatioStepView";

export default function NewPostPage() {
  const router = useRouter();
  const {
    step, goToRatios, goToRecipe, goToIngredients,
    title, setTitle,
    content, setContent,
    preview, handleImageChange,
    tags, setTags,
    ingredients, setIngredients,
    handleSubmit,
  } = useRecipeForm();

  const handleBack = () => {
    if (step === 'recipe') {
      goToRatios();
      return;
    }

    if (step === 'ratios') {
      goToIngredients();
      return;
    }

    router.back();
  };

  const handleComplete = async () => {
    await handleSubmit();
    router.push('/');
  };

  if (step === 'recipe') {
    return (
      <RecipeInputView
        title={title} onTitleChange={setTitle}
        content={content} onContentChange={setContent}
        preview={preview} onImageChange={handleImageChange}
        tags={tags} onTagsChange={setTags}
        ingredients={ingredients}
        onSubmit={handleComplete}
        onIngredientClick={goToIngredients}
        onBack={handleBack}
      />
    );
  }

  if (step === 'ratios') {
    return (
      <RatioStepView
        value={ingredients}
        onChange={setIngredients}
        onNext={goToRecipe}
        onBack={handleBack}
      />
    );
  }

  return (
    <IngredientStepView
      value={ingredients}
      onChange={setIngredients}
      onNext={goToRatios}
      onBack={handleBack}
    />
  );
}
