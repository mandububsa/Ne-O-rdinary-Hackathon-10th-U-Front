'use client'

import { useRecipeForm } from "./hooks/useRecipeForm";
import RecipeInputView from "./components/RecipeInputView";
import IngredientStepView from "./components/IngredientStepView";

export default function NewPostPage() {
  const {
    step, goToRecipe, goToIngredients,
    title, setTitle,
    content, setContent,
    preview, handleImageChange,
    tags, setTags,
    ingredients, setIngredients,
    handleSubmit,
  } = useRecipeForm();

  if (step === 'recipe') {
    return (
      <RecipeInputView
        title={title} onTitleChange={setTitle}
        content={content} onContentChange={setContent}
        preview={preview} onImageChange={handleImageChange}
        tags={tags} onTagsChange={setTags}
        ingredients={ingredients}
        onSubmit={handleSubmit}
        onIngredientClick={goToIngredients}
      />
    );
  }

  return (
    <IngredientStepView
      value={ingredients}
      onChange={setIngredients}
      onNext={goToRecipe}
    />
  );
}