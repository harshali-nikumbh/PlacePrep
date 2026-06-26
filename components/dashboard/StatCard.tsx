type StatCardProps = {
  title: string;
  value: number;
};

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div
      className="
        bg-[#1E293B]
        border
        border-white/10
        rounded-2xl
        p-6
        hover:border-[#719DBC]
        transition-all
      "
    >
      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-white mt-3">
        {value}
      </h2>
    </div>
  );
}