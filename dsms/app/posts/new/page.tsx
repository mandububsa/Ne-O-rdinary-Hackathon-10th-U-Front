'use client'

import { useRecipeForm } from "./hooks/useRecipeForm";
import StepProgressBar from "./components/StepProgressBar";
import RecipeInputView from "./components/RecipeInputView";
import IngredientStepView from "./components/IngredientStepView";
import MeasureStepView from "./components/MeasureStepView";

const STEP_LABELS = ['재료 선택', '비율 입력', '게시물 작성'];

export default function NewPostPage() {
  const {
    step, stepMap,
    goToIngredients, goToMeasure, goToPost,
    title, setTitle,
    content, setContent,
    preview, handleImageChange,
    tags, setTags,
    ingredients, setIngredients,
    handleSubmit,
  } = useRecipeForm();

  const currentStep = stepMap[step];

  const handleBack = () => {
    if (step === 'measure') goToIngredients();
    if (step === 'post') goToMeasure();
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto px-6 py-6 gap-4">

      {/* 상단 헤더 */}
      <div className="flex items-center gap-3">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="p-1 text-gray-500 hover:text-gray-900 transition"
          >
            ←
          </button>
        )}
        <StepProgressBar
          currentStep={currentStep}
          totalSteps={3}
          labels={STEP_LABELS}
        />
      </div>

      {step === 'ingredients' && (
        <IngredientStepView
          value={ingredients}
          onChange={setIngredients}
          onNext={goToMeasure}
        />
      )}

      {step === 'measure' && (
        <MeasureStepView
          ingredients={ingredients}
          onChange={setIngredients}
          onPrev={goToIngredients}
          onNext={goToPost}
        />
      )}

      {step === 'post' && (
        <RecipeInputView
          title={title} onTitleChange={setTitle}
          content={content} onContentChange={setContent}
          preview={preview} onImageChange={handleImageChange}
          tags={tags} onTagsChange={setTags}
          ingredients={ingredients}
          onSubmit={handleSubmit}
          onIngredientClick={goToIngredients}
        />
      )}
    </div>
  );
}