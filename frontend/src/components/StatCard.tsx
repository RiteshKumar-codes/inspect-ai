
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{title}</p>

        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Icon size={21} />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-slate-900 mt-4">
        {value}
      </h2>

      <p className="text-sm text-slate-500 mt-2">
        {description}
      </p>

    </div>
  );
}
