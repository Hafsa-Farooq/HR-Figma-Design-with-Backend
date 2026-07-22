interface FormInputProps {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  required?: boolean;
}

export function FormInput({
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}: FormInputProps) {
  return (
    <input
      type={type}
      placeholder={required ? `${placeholder} *` : placeholder}
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      className={`h-[34px] w-full rounded-[6px] border px-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#00A2CA] ${
        required ? "border-[#00A2CA]/40" : "border-[#EAEAEA]"
      }`}
    />
  );
}

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: SelectOption[];
  required?: boolean;
}

export function FormSelect({
  placeholder,
  value,
  onChange,
  options = [],
  required = false,
}: FormSelectProps) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      className={`h-[34px] w-full rounded-[6px] border px-4 text-sm text-gray-400 outline-none focus:border-[#00A2CA] ${
        required ? "border-[#00A2CA]/40" : "border-[#EAEAEA]"
      }`}
    >
      <option value="" disabled>
        {required ? `${placeholder} *` : placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function FileUploadRow({ label }: { label: string }) {
  return (
    <div className="flex h-[34px] items-center gap-[10px]">
      {label && (
        <span className="w-[139px] shrink-0 text-sm text-[#00A2CA]">{label}</span>
      )}
      <div className="flex h-[34px] w-full items-center rounded-[6px] border border-[#EAEAEA]">
        <button
          type="button"
          className="h-full shrink-0 border-r border-[#EAEAEA] px-4 text-xs font-medium text-gray-700"
        >
          Choose Files
        </button>
        <span className="px-3 text-xs text-gray-400">Profile image</span>
      </div>
    </div>
  );
}