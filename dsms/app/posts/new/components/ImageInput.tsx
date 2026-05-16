type Props = {
  onChange: (file: File | null) => void;
  preview?: string;
}

export default function ImageInput({ onChange, preview }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
  };

  return (
    <label className={`
        w-full
        flex flex-col items-center justify-center 
        rounded-xl aspect-square cursor-pointer
        overflow-hidden transition
        ${preview
          ? "border-none"
          : "border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200"
        }
      `}
    >
      {preview ? (
        <img src={preview} alt="썸네일 미리보기" className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center gap-2">
          <span className="typo-text text-gray-400">완성된 이미지를 올려주세요</span>
          <span className="typo-caption text-gray-300">클릭하여 업로드</span>
        </div>
      )}
      <input type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </label>
  );
}