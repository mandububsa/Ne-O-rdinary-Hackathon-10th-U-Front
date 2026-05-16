'use client';

import { useState, useEffect } from 'react';

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
};

export default function TagInput({ value, onChange }: Props) {
  const [options, setOptions] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isAdding, setIsAdding] = useState(false); // 직접 입력 모드

  // API에서 태그 목록 불러오기
  useEffect(() => {
    fetch('/api/tags')
      .then(res => res.json())
      .then(data => setOptions(data));
  }, []);

  const selectTag = (tag: string) => {
    if (value.includes(tag)) return;
    onChange([...value, tag]);
  };

  const addTag = () => {
    const normalized = input.trim().replace(/\s+/g, '_');
    if (!normalized || value.includes(normalized)) return;
    onChange([...value, normalized]);
    setInput('');
    setIsAdding(false);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter(t => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 한글 IME 조합 중인 Enter는 무시한다(조합 확정용 keydown이라 태그가 중복 생성됨).
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
    if (e.key === 'Escape') {
      setIsAdding(false);
      setInput('');
    }
  };

  // 선택 안 된 옵션만 표시
  const availableOptions = options.filter(opt => !value.includes(opt));

  return (
    <div className="space-y-3 w-full">

      {/* select + 추가 버튼 */}
      <div className="flex gap-2">
        <select
          onChange={e => selectTag(e.target.value)}
          value=""
          className="
            flex-1 rounded-xl px-4 py-3
            bg-gray-100 hover:bg-gray-200
            text-gray-900 typo-text
            border-2 border-transparent focus:border-primary-400
            outline-none transition cursor-pointer
          "
        >
          <option value="" disabled>태그 선택</option>
          {availableOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="
            px-4 rounded-xl
            bg-primary-500 hover:bg-primary-600
            text-white typo-text font-semibold
            transition whitespace-nowrap
          "
        >
          직접 추가
        </button>
      </div>

      {/* 직접 입력 모드 */}
      {isAdding && (
        <div className="flex gap-2">
          <input
            autoFocus
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="태그 입력 후 Enter (Esc로 취소)"
            className="
              flex-1 rounded-xl px-4 py-3
              bg-gray-100 hover:bg-gray-200
              text-gray-900 typo-text
              placeholder:text-gray-400
              border-2 border-primary-400
              outline-none transition
            "
          />
          <button
            type="button"
            onClick={addTag}
            className="
              px-4 rounded-xl
              bg-primary-500 hover:bg-primary-600
              text-white typo-text font-semibold
              transition
            "
          >
            추가
          </button>
        </div>
      )}

      {/* 선택된 태그 */}
      <div className="flex flex-wrap gap-2">
        {value.map(tag => (
          <span
            key={tag}
            className="
              flex items-center gap-1
              bg-primary-100 text-primary-700
              typo-caption font-medium
              px-3 py-1 rounded-full
            "
          >
            #{tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-primary-400 hover:text-primary-700 transition"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}