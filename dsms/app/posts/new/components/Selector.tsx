'use client';

import { useState, useEffect } from 'react';

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
};

export default function Selector({ value, onChange }: Props) {
  const [options, setOptions] = useState<string[]>(['tag1', 'tag2']);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   fetch('/api/tags')
  //     .then(res => res.json())
  //     .then(data => setOptions(data));
  // }, []);

  useEffect(() => {
    // TODO: 실제 API 연결 시 fetch로 교체
    setOptions(['맥주', '소주', '폭탄주', '양주', '막걸리']);
  }, []);

  // 입력값으로 필터링된 옵션 (이미 선택된 것 제외)
  const filtered = options.filter(opt =>
    opt.includes(input) && !value.includes(opt)
  );

  const selectItem = (item: string) => {
    if (value.includes(item)) return;
    onChange([...value, item]);
    setInput('');
    setIsOpen(false);
  };

  const addItem = () => {
    const normalized = input.trim().replace(/\s+/g, '_');
    if (!normalized || value.includes(normalized)) return;
    onChange([...value, normalized]);
    setInput('');
    setIsOpen(false);
  };

  const removeItem = (item: string) => {
    onChange(value.filter(t => t !== item));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // 필터된 옵션이 있으면 첫 번째 선택, 없으면 직접 추가
      if (filtered.length > 0) selectItem(filtered[0]);
      else addItem();
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="space-y-3 w-full">

      {/* 입력창 + 추가 버튼 */}
      <div className="relative flex gap-2">
        <input
          value={input}
          onChange={e => { setInput(e.target.value); setIsOpen(true); }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)} // 클릭 이벤트 처리 후 닫기
          placeholder="태그 검색 또는 직접 입력"
          className="
            flex-1 rounded-xl px-4 py-3
            bg-gray-100 hover:bg-gray-200
            text-gray-900 typo-text
            placeholder:text-gray-400
            border-2 border-transparent focus:border-primary-400
            outline-none transition
          "
        />
        <button
          type="button"
          onClick={addItem}
          className="
            px-4 rounded-xl whitespace-nowrap
            bg-primary-500 hover:bg-primary-600
            text-white typo-text font-semibold
            transition
          "
        >
          추가
        </button>

        {/* 자동완성 드롭다운 */}
        {isOpen && filtered.length > 0 && (
          <ul className="
            absolute top-full left-0 right-16 mt-1 z-10
            bg-white border border-gray-200
            rounded-xl shadow-md overflow-hidden
          ">
            {filtered.map(opt => (
              <li
                key={opt}
                onMouseDown={() => selectItem(opt)} // onBlur 보다 먼저 실행되도록 onMouseDown 사용
                className="
                  px-4 py-3 cursor-pointer
                  typo-text text-gray-900
                  hover:bg-primary-50 hover:text-primary-700
                  transition
                "
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}