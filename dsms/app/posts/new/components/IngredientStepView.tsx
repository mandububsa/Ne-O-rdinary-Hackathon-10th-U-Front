// IngredientStepView.tsx
import { IngredientInput } from '@/types/recipe';

import Button from './Button';
import IngredientSelectView from './IngredientSelectView';

interface IngredientStepViewProps {
  value: IngredientInput[];
  onChange: (ingredients: IngredientInput[]) => void;
  onNext: () => void;
}

export default function IngredientStepView({ value, onChange, onNext }: IngredientStepViewProps) {
  return (
    <div className="flex flex-col items-center px-6 py-16 gap-6 w-full max-w-lg mx-auto">
      <h1 className="typo-heading font-bold text-gray-900 self-start">재료 선택</h1>
      <IngredientSelectView value={value} onChange={onChange} />
      <Button title="다음" variant="primary" onClick={onNext} />
    </div>
  );
}