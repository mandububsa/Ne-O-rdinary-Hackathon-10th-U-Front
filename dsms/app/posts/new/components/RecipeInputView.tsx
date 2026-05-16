'use client';

import type { IngredientInput } from '@/types/recipe';
import RecipeFormShell from './RecipeFormShell';

interface RecipeInputViewProps {
  title: string;
  onTitleChange: (value: string) => void;
  content: string;
  onContentChange: (value: string) => void;
  preview: string;
  onImageChange: (file: File | null) => void;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  ingredients: IngredientInput[];
  onSubmit: () => void;
  onIngredientClick: () => void;
  onBack: () => void;
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="size-8" fill="none">
      <circle cx="16" cy="16" r="16" fill="var(--primary-500)" />
      <path
        d="M16 10v12M10 16h12"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CompleteButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex h-12 w-full items-center justify-center rounded-[4px] px-[14px] text-subtitle font-semibold leading-[1.5] text-white transition ${
        disabled ? 'bg-gray-800' : 'bg-primary-500'
      }`}
    >
      완료
    </button>
  );
}

function TextField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex w-full flex-col gap-3 text-title font-semibold leading-[1.2] text-white">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 rounded-lg border border-gray-800 bg-transparent p-3 text-subtitle font-semibold leading-[1.2] text-white outline-none placeholder:font-normal placeholder:text-gray-500 focus:border-primary-500"
      />
    </label>
  );
}

function ImageUploader({
  preview,
  onImageChange,
}: {
  preview: string;
  onImageChange: (file: File | null) => void;
}) {
  return (
    <label className="flex w-full cursor-pointer flex-col text-title-pretendard-3xl font-semibold leading-[1.2] text-white">
      <div
        className="flex min-h-[246px] w-full items-center justify-center rounded-lg bg-[#242424] bg-cover bg-center"
        style={preview ? { backgroundImage: `url(${preview})` } : undefined}
      >
        {!preview && (
          <div className="flex flex-col items-center">
            <PlusIcon />
            <p className="mt-5 text-title-pretendard-3xl font-semibold leading-[1.2] text-white">
              대표 사진 올리기
            </p>
            <p className="mt-2 text-body font-medium leading-[1.2] text-gray-500">
              최대 1MB까지만 가능합니다.
            </p>
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => onImageChange(event.target.files?.[0] ?? null)}
      />
    </label>
  );
}

export default function RecipeInputView({
  title,
  onTitleChange,
  content,
  onContentChange,
  preview,
  onImageChange,
  onSubmit,
  onBack,
}: RecipeInputViewProps) {
  const canSubmit = title.trim().length > 0 && content.trim().length > 0;

  return (
    <RecipeFormShell
      progress={3}
      onBack={onBack}
      footer={<CompleteButton disabled={!canSubmit} onClick={onSubmit} />}
    >
      <div className="flex flex-col gap-8">
        <h1 className="text-title-pretendard-3xl font-bold leading-[1.2] text-white">
          전설이 될 레시피를 알려주세요!
        </h1>

        {/* 레시피 대표 이미지와 피드에 노출될 제목/소제목을 입력한다. */}
        <ImageUploader preview={preview} onImageChange={onImageChange} />
        <TextField
          label="제목"
          value={title}
          placeholder="제목 입력"
          onChange={onTitleChange}
        />
        <TextField
          label="소제목"
          value={content}
          placeholder="소제목 입력"
          onChange={onContentChange}
        />
      </div>
    </RecipeFormShell>
  );
}
