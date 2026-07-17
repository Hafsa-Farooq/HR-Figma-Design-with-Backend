export default function FormCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-[10px] bg-white p-6 shadow-[0_6px_30px_rgba(182,186,203,0.15)]">
      <span className="absolute left-0 top-3 h-[52px] w-[8px] bg-[#00A2CA]" />
      <h3 className="mb-5 pl-4 text-[18px] font-bold text-gray-900">{title}</h3>
      {children}
    </div>
  );
}