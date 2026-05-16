'use client'

import TagInput from "./TagInput";
import TextInput from "./TextInput";
import ImageInput from "./ImageInput";
import Button from "./Button";
import { IngredientInput } from "@/types/recipe";

interface RecipeInputViewProps {
  title: string;
  onTitleChange: (value: string) => void;
  content: string;
  onContentChange: (value: string) => void;
  preview: string;
  onImageChange: (file: File | null) => void;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  ingredients: IngredientInput[];   // 추가
  onSubmit: () => void;
  onIngredientClick: () => void;
}

export default function RecipeInputView({
  title, onTitleChange,
  content, onContentChange,
  preview, onImageChange,
  ingredients,
  onSubmit,
  onIngredientClick,
}: RecipeInputViewProps) {

  return (
    <div className="
      flex flex-col items-center
      px-6 py-16 gap-6
      w-full max-w-lg mx-auto
    ">
      <h1 className="typo-heading font-bold text-gray-900 self-start">
        데이터 추가하기
      </h1>

      {/* 제목 */}
      <div className="w-full flex flex-col gap-1">
        <label className="typo-subtitle-nexon font-bold text-gray-700">제목</label>
        <TextInput
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={onTitleChange}
        />
      </div>

      {/* 내용 */}
      <div className="w-full flex flex-col gap-1">
        <label className="typo-subtitle-nexon font-bold text-gray-700">내용</label>
        <TextInput
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={onContentChange}
          multiline={true}
        />
      </div>

      {/* 재료 */}
      <div className="w-full flex flex-col gap-1">
        <label className="typo-subtitle-nexon font-bold text-gray-700">재료</label>

        {/* 입력된 재료 목록 */}
        {ingredients.length > 0 && (
          <ul className="w-full flex flex-col gap-2 mb-2">
            {ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="
                  flex justify-between items-center
                  px-4 py-3 rounded-xl
                  bg-gray-100 typo-text text-gray-900
                "
              >
                <span>{ingredient.name}</span>
                <span className="typo-caption text-gray-400">{ingredient.measure}</span>
              </li>
            ))}
          </ul>
        )}

        <Button
          title={ingredients.length > 0 ? "재료 수정하기" : "재료 선택하기"}
          variant="secondary"
          onClick={onIngredientClick}
        />
      </div>

      {/* 사진 */}
      <div className="w-full flex flex-col gap-1">
        <label className="typo-subtitle-nexon font-bold text-gray-700">사진</label>
        <ImageInput onChange={onImageChange} preview={preview} />
      </div>

      <Button title="저장" variant="primary" onClick={onSubmit} />
    </div>
  );
}