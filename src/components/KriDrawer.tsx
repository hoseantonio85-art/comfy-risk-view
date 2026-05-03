import { ChevronLeft } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const kriData = [
  { month: "Окт 24", value: 0.06 },
  { month: "Ноя 24", value: 0.07 },
  { month: "Дек 24", value: 0.055 },
  { month: "Янв 25", value: 0.06 },
  { month: "Фев 25", value: 0.05 },
  { month: "Мар 25", value: 0.06 },
  { month: "Апр 25", value: 0.12 },
];

interface KriDrawerProps {
  onClose: () => void;
}

export function KriDrawer({ onClose }: KriDrawerProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-end">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 bg-card h-full w-full max-w-[640px] shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="p-6">
          <button onClick={onClose} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-xl font-bold text-foreground mb-6">Ключевой индикатор риска</h2>

          {/* Status */}
          <div className="flex items-center gap-2 mb-6 bg-accent rounded-lg p-3">
            <span className="text-xs font-medium text-norm-red bg-norm-red-light px-2 py-0.5 rounded">Контроль</span>
            <span className="text-sm text-foreground">Превышение требует немедленных мер и обязательной эскалации</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="rounded-xl border border-border p-4">
              <div className="text-xs text-muted-foreground mb-1">Объём всех потерь</div>
              <div className="text-lg font-bold text-foreground">1 000 000 ₽</div>
            </div>
            <div className="rounded-xl border border-border p-4">
              <div className="text-xs text-muted-foreground mb-1">Выручка за 12 месяцев</div>
              <div className="text-lg font-bold text-foreground">11 200 000 ₽</div>
            </div>
            <div className="rounded-xl border border-border p-4">
              <div className="text-xs text-muted-foreground mb-1">Доля убытков к выручке</div>
              <div className="text-lg font-bold text-foreground">0,11 %</div>
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-xl border border-border p-4 mb-6">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={kriData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `${(v * 100).toFixed(2)}%`}
                  domain={[0, 0.2]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4ade80"
                  strokeWidth={2}
                  dot={{ fill: "#4ade80", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
