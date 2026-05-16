'use client';

import Image from 'next/image';
import {
  useMemo,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import type { IngredientInput, MaterialRole } from '@/types/recipe';
import RecipeFormShell from './RecipeFormShell';

type IngredientStepViewProps = {
  value: IngredientInput[];
  onChange: (ingredients: IngredientInput[]) => void;
  onNext: () => void;
  onBack: () => void;
};

type CategoryOption = {
  id: number;
  name: string;
  children: CategoryOption[];
};

type DraftIngredient = {
  typeId: number | null;
  categoryId: number | null;
  name: string;
};

const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    id: 1,
    name: '주류',
    children: [
      { id: 101, name: '진', children: [] },
      { id: 102, name: '소주', children: [] },
      { id: 103, name: '위스키', children: [] },
      { id: 104, name: '럼', children: [] },
    ],
  },
  {
    id: 2,
    name: '음료',
    children: [
      { id: 201, name: '탄산수', children: [] },
      { id: 202, name: '토닉워터', children: [] },
      { id: 203, name: '주스', children: [] },
    ],
  },
  {
    id: 3,
    name: '과일',
    children: [
      { id: 301, name: '키위', children: [] },
      { id: 302, name: '레몬', children: [] },
      { id: 303, name: '석류', children: [] },
    ],
  },
  {
    id: 4,
    name: '시럽',
    children: [
      { id: 401, name: '심플 시럽', children: [] },
      { id: 402, name: '허브 시럽', children: [] },
    ],
  },
  {
    id: 5,
    name: '기타 재료',
    children: [
      { id: 501, name: '민트', children: [] },
      { id: 502, name: '향신료', children: [] },
    ],
  },
];

function PlusIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
    >
      <circle cx="12" cy="12" r="12" fill="var(--primary-500)" />
      <path
        d="M12 7v10M7 12h10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none">
      <path
        d="m7 7 10 10M17 7 7 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`size-6 transition-transform ${open ? 'rotate-180' : ''}`}
      fill="none"
    >
      <path
        d="m7 10 5 5 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GhostButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-800 px-3 py-3 text-subtitle font-normal leading-[1.2] text-white"
    >
      <PlusIcon />
      재료 추가
    </button>
  );
}

function BottomButton({
  children,
  disabled,
  onClick,
}: {
  children: string;
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
      {children}
    </button>
  );
}

function IngredientChip({
  ingredient,
  onRemove,
}: {
  ingredient: IngredientInput;
  onRemove?: () => void;
}) {
  const content = (
    <>
      {ingredient.role === 'SUB' && ingredient.measure
        ? `${ingredient.name} ${ingredient.measure}`
        : ingredient.name}
      {onRemove && <CloseIcon />}
    </>
  );

  if (!onRemove) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-primary-500 px-3 py-2 text-subtitle font-semibold leading-[1.2] text-white">
        {content}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-1 rounded-full border border-primary-500 px-3 py-2 text-subtitle font-semibold leading-[1.2] text-white"
    >
      {content}
    </button>
  );
}

function IngredientSection({
  title,
  ingredients,
  onAdd,
  onRemove,
}: {
  title: string;
  ingredients: IngredientInput[];
  onAdd: () => void;
  onRemove: (ingredient: IngredientInput) => void;
}) {
  return (
    <section className="flex w-full flex-col gap-3">
      <h2 className="text-title font-semibold leading-[1.2] text-white">
        {title}
      </h2>
      <div className="flex flex-wrap gap-x-2.5 gap-y-3">
        {ingredients.map((ingredient) => (
          <IngredientChip
            key={`${ingredient.display_order}-${ingredient.name}`}
            ingredient={ingredient}
            onRemove={() => onRemove(ingredient)}
          />
        ))}
      </div>
      <GhostButton onClick={onAdd} />
    </section>
  );
}

function SelectField({
  label,
  value,
  placeholder,
  options,
  open,
  disabled,
  onToggle,
  onSelect,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: CategoryOption[];
  open: boolean;
  disabled?: boolean;
  onToggle: () => void;
  onSelect: (option: CategoryOption) => void;
}) {
  return (
    <div className="relative flex flex-col gap-3">
      <label className="text-title-pretendard-3xl font-bold leading-[1.2] text-white">
        {label}
      </label>
      <button
        type="button"
        disabled={disabled}
        onClick={onToggle}
        className="flex h-11 w-full items-center justify-between rounded-lg border border-gray-800 p-3 text-left text-subtitle leading-[1.2] disabled:opacity-60"
      >
        <span className={value ? 'font-semibold text-white' : 'text-gray-500'}>
          {value || placeholder}
        </span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-[82px] z-30 overflow-hidden rounded-b-xl border border-gray-700 bg-[#323437]">
          {options.map((option, index) => (
            <button
              type="button"
              key={option.id}
              onClick={() => onSelect(option)}
              className={`flex h-11 w-full items-center justify-center text-subtitle font-semibold leading-[1.5] text-white ${
                index === 0 ? 'bg-primary-500' : 'border-t border-gray-700'
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TextField({
  label,
  value,
  placeholder,
  inputMode,
  action,
  onChange,
  onEnter,
}: {
  label: string;
  value: string;
  placeholder: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
  action?: ReactNode;
  onChange: (value: string) => void;
  onEnter?: () => void;
}) {
  return (
    <label className="flex flex-col gap-3 text-title-pretendard-3xl font-bold leading-[1.2] text-white">
      {label}
      <span
        className={`flex h-11 items-center rounded-lg border bg-transparent pr-3 ${
          value ? 'border-primary-500' : 'border-gray-800'
        } focus-within:border-primary-500`}
      >
        <input
          value={value}
          inputMode={inputMode}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              onEnter?.();
            }
          }}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent p-3 text-subtitle font-semibold leading-[1.2] text-white outline-none placeholder:font-normal placeholder:text-gray-500"
        />
        {action}
      </span>
    </label>
  );
}

function AddIngredientSheet({
  role,
  ingredients,
  onClose,
  onDone,
  onRemove,
}: {
  role: MaterialRole;
  ingredients: IngredientInput[];
  onClose: () => void;
  onDone: (ingredient: IngredientInput) => void;
  onRemove: (ingredient: IngredientInput) => void;
}) {
  const [openSelect, setOpenSelect] = useState<'type' | 'category' | null>(
    null,
  );
  const [draft, setDraft] = useState<DraftIngredient>({
    typeId: null,
    categoryId: null,
    name: '',
  });

  const selectedType = CATEGORY_OPTIONS.find(
    (option) => option.id === draft.typeId,
  );
  const selectedCategory = selectedType?.children.find(
    (option) => option.id === draft.categoryId,
  );
  const selectedChips = ingredients.filter((item) => item.role === role);
  const canAdd =
    draft.typeId !== null &&
    draft.categoryId !== null &&
    draft.name.trim().length > 0;
  const canComplete = selectedChips.length > 0;

  const addDraftIngredient = () => {
    if (!canAdd) return;

    onDone({
      category_id: draft.categoryId,
      name: draft.name.trim(),
      role,
      measure: '',
      display_order: ingredients.length,
    });
    setDraft((current) => ({ ...current, name: '' }));
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-end justify-center bg-black/60 px-4 pt-6"
      onClick={(event) => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      }}
    >
      <div className="recipe-sheet-up relative flex h-[min(77vh,652px)] max-h-[calc(100vh-108px)] w-full max-w-[720px] flex-col overflow-y-auto rounded-t-[24px] bg-[#242424] p-5 shadow-2xl sm:p-6">
        {/* 재료 추가 시트: 아래에서 올라오며 타입, 세부 재료, 상품명을 한 번에 입력한다. */}
        <button
          type="button"
          aria-label="재료 추가 닫기"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 inline-flex size-9 items-center justify-center rounded-lg text-white transition hover:bg-white/10"
        >
          <CloseIcon />
        </button>

        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-8">
            <SelectField
              label="재료 타입"
              value={selectedType?.name ?? ''}
              placeholder="어떤 종류인가요?"
              options={CATEGORY_OPTIONS}
              open={openSelect === 'type'}
              onToggle={() =>
                setOpenSelect(openSelect === 'type' ? null : 'type')
              }
              onSelect={(option) => {
                setDraft((current) => ({
                  ...current,
                  typeId: option.id,
                  categoryId: null,
                }));
                setOpenSelect(null);
              }}
            />

            <SelectField
              label="재료 선택"
              value={selectedCategory?.name ?? ''}
              placeholder="어떤 재료인가요?"
              options={selectedType?.children ?? []}
              open={openSelect === 'category'}
              disabled={!selectedType}
              onToggle={() =>
                setOpenSelect(openSelect === 'category' ? null : 'category')
              }
              onSelect={(option) => {
                setDraft((current) => ({
                  ...current,
                  categoryId: option.id,
                }));
                setOpenSelect(null);
              }}
            />

            <TextField
              label="재료 이름 입력"
              value={draft.name}
              placeholder="상품명을 입력해주세요"
              action={
                <button
                  type="button"
                  aria-label="재료 태그 추가"
                  disabled={!canAdd}
                  onClick={addDraftIngredient}
                  className="inline-flex size-6 shrink-0 items-center justify-center disabled:opacity-40"
                >
                  <Image src="/add.svg" alt="" width={24} height={24} />
                </button>
              }
              onChange={(name) =>
                setDraft((current) => ({ ...current, name }))
              }
              onEnter={addDraftIngredient}
            />
          </div>

          {selectedChips.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-x-2.5 gap-y-3">
              {selectedChips.map((ingredient) => (
                <IngredientChip
                  key={`${ingredient.display_order}-${ingredient.name}`}
                  ingredient={ingredient}
                  onRemove={() => onRemove(ingredient)}
                />
              ))}
            </div>
          )}

          <div className="mt-auto pt-8">
            <BottomButton disabled={!canComplete} onClick={onClose}>
              완료
            </BottomButton>
          </div>
        </div>
        <style jsx>{`
          .recipe-sheet-up {
            animation: recipe-sheet-up 180ms ease-out both;
          }

          @keyframes recipe-sheet-up {
            from {
              opacity: 0.85;
              transform: translateY(100%);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

function renumberIngredients(ingredients: IngredientInput[]) {
  return ingredients.map((ingredient, index) => ({
    ...ingredient,
    display_order: index,
  }));
}

export default function IngredientStepView({
  value,
  onChange,
  onNext,
  onBack,
}: IngredientStepViewProps) {
  const [sheetRole, setSheetRole] = useState<MaterialRole | null>(null);
  const mainIngredients = useMemo(
    () => value.filter((ingredient) => ingredient.role === 'MAIN'),
    [value],
  );
  const subIngredients = useMemo(
    () => value.filter((ingredient) => ingredient.role === 'SUB'),
    [value],
  );
  const canContinue = mainIngredients.length > 0;

  const addIngredient = (ingredient: IngredientInput) => {
    onChange(renumberIngredients([...value, ingredient]));
  };

  const removeIngredient = (target: IngredientInput) => {
    onChange(
      renumberIngredients(
        value.filter(
          (ingredient) => ingredient.display_order !== target.display_order,
        ),
      ),
    );
  };

  return (
    <RecipeFormShell
      progress={1}
      onBack={onBack}
      footer={
        <BottomButton disabled={!canContinue} onClick={onNext}>
          다음으로
        </BottomButton>
      }
    >
      <div className="flex flex-col gap-8">
        <h1 className="text-title-pretendard-3xl font-bold leading-[1.2] text-white">
          재료를 입력해주세요
        </h1>

        {/* 주 재료와 부 재료를 역할별로 분리해 입력한다. */}
        <IngredientSection
          title="주 재료"
          ingredients={mainIngredients}
          onAdd={() => setSheetRole('MAIN')}
          onRemove={removeIngredient}
        />
        <IngredientSection
          title="부 재료"
          ingredients={subIngredients}
          onAdd={() => setSheetRole('SUB')}
          onRemove={removeIngredient}
        />
      </div>

      {sheetRole && (
        <AddIngredientSheet
          role={sheetRole}
          ingredients={value}
          onClose={() => setSheetRole(null)}
          onDone={addIngredient}
          onRemove={removeIngredient}
        />
      )}
    </RecipeFormShell>
  );
}
