type Props = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}

const baseClass = `
  w-full rounded-xl px-4 py-3
  bg-gray-200 hover:bg-gray-300
  text-gray-900 typo-text
  placeholder:text-gray-400
  border-2 border-transparent focus:border-primary-500
  outline-none transition
`;

export default function TextInput({ placeholder, value, onChange, multiline = false }: Props) {
  if (multiline) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`${baseClass} h-32 resize-none`}
      />
    );
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      className={baseClass}
    />
  );
}