export function FormInput({ placeholder }: { placeholder: string }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="h-[34px] w-full rounded-[6px] border border-[#EAEAEA] px-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#00A2CA]"
    />
  );
}

export function FormSelect({ placeholder }: { placeholder: string }) {
  return (
    <select className="h-[34px] w-full rounded-[6px] border border-[#EAEAEA] px-4 text-sm text-gray-400 outline-none focus:border-[#00A2CA]">
      <option>{placeholder}</option>
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
        <button className="h-full shrink-0 border-r border-[#EAEAEA] px-4 text-xs font-medium text-gray-700">
          Choose Files
        </button>
        <span className="px-3 text-xs text-gray-400">Profile image</span>
      </div>
    </div>
  );
}