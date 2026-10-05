type DropdownProps = {
  options: { id: string; label: string }[];
  onSelect: (id: string) => void;
  label: string;
};

function Dropdown({ options, onSelect, label }: DropdownProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-ink">{label}</label>
      <select
        className="w-full rounded-[12px] border border-line bg-surface px-3 py-2.5 text-base text-ink outline-none transition focus:border-accent"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Choose</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
