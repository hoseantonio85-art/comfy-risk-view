import { ChevronLeft, Check } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "янв", direct: 55, indirect: 45 },
  { month: "фев", direct: 60, indirect: 50 },
  { month: "мар", direct: 70, indirect: 55 },
  { month: "апр", direct: 50, indirect: 40 },
  { month: "май", direct: 75, indirect: 60 },
  { month: "июн", direct: 65, indirect: 50 },
  { month: "июл", direct: 60, indirect: 45 },
  { month: "авг", direct: 80, indirect: 70 },
  { month: "сен", direct: 95, indirect: 85 },
  { month: "окт", direct: 70, indirect: 60 },
  { month: "ноя", direct: 65, indirect: 55 },
  { month: "дек", direct: 60, indirect: 50 },
  { month: "янв 26", direct: 55, indirect: 45 },
];

const events = [
  { title: "Недобросовестные практики продаж продуктов и услуг", code: "EVE-171185", date: "20.02.2024", status: "Расследование" },
  { title: "Повреждение / утрата имущества", code: "EVE-171185", date: "20.02.2024", status: "Расследование" },
  { title: "Недобросовестные практики продаж продуктов и услуг", code: "EVE-171185", date: "20.02.2024", status: "Расследование" },
  { title: "Повреждение / утрата имущества", code: "EVE-171185", date: "20.02.2024", status: "Расследование" },
  { title: "Недобросовестные практики продаж продуктов и услуг", code: "EVE-171185", date: "20.02.2024", status: "Утверждено" },
];

interface LimitDrawerProps {
  onClose: () => void;
}

export function LimitDrawer({ onClose }: LimitDrawerProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-end">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 bg-card h-full w-full max-w-[640px] shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="p-6">
          {/* Header */}
          <button onClick={onClose} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-xl font-bold text-foreground mb-6">Утилизация лимита</h2>

          {/* Period tabs */}
          <div className="flex items-center gap-1 mb-6">
            {["Год", "Квартал", "Месяц", "Неделя", "Сегодня"].map((tab, i) => (
              <button
                key={tab}
                className={`px-3 py-1.5 rounded-lg text-sm ${i === 0 ? "bg-accent font-medium text-foreground" : "text-muted-foreground hover:bg-accent/50"}`}
              >
                {tab}
              </button>
            ))}
            <span className="text-sm text-muted-foreground ml-2">01 янв - 14 апр ▾</span>
          </div>

          {/* Loss cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Прямые потери</span>
                </div>
                <span className="text-xs font-bold text-norm-red bg-norm-red-light px-1.5 py-0.5 rounded-full">85%</span>
              </div>
              <div className="text-xl font-bold text-foreground">12 500 000 ₽</div>
              <div className="text-xs text-muted-foreground">из 1 000 000</div>
            </div>
            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Косвенные потери</span>
                </div>
                <span className="text-xs font-bold text-norm-green bg-norm-green-light px-1.5 py-0.5 rounded-full">17%</span>
              </div>
              <div className="text-xl font-bold text-foreground">500 000 ₽</div>
              <div className="text-xs text-muted-foreground">из 1 000 000</div>
            </div>
          </div>

          {/* Chart */}
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Bar dataKey="direct" fill="#c4b5fd" radius={[2, 2, 0, 0]} />
                <Bar dataKey="indirect" fill="#ddd6fe" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Events */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">События</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Показать невошедшие в утилизацию</span>
              <div className="w-9 h-5 rounded-full bg-border relative">
                <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-card shadow-sm" />
              </div>
            </div>
          </div>
          <div className="space-y-0">
            {events.map((ev, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                <div>
                  <div className="text-sm text-foreground">{ev.title}</div>
                  <div className="text-xs text-muted-foreground">{ev.code} · Дата: {ev.date}</div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                  ev.status === "Утверждено" ? "text-norm-green bg-norm-green-light" : "text-primary bg-primary/10"
                }`}>{ev.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
