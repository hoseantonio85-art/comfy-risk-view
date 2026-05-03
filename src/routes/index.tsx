import { createFileRoute } from "@tanstack/react-router";
import { Bell, ChevronRight, Sparkles } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Главная — НОРМ" },
      { name: "description", content: "Дашборд управления рисками" },
    ],
  }),
});

const donutData = [
  { name: "Законодательство и регуляторы", value: 538, color: "#e8b84d" },
  { name: "Внешняя среда", value: 90, color: "#8bc34a" },
  { name: "Клиенты и продукты", value: 557, color: "#ef5350" },
  { name: "Партнёры и поставки", value: 85, color: "#e0e0e0" },
  { name: "Процессы и контроль", value: 1078, color: "#fdd835" },
  { name: "Персонал и культура", value: 125, color: "#a5d6a7" },
  { name: "Проекты и изменения", value: 210, color: "#ef9a9a" },
  { name: "Технологии и данные", value: 61, color: "#ce93d8" },
];

const categoryIcons: Record<string, string> = {
  "Законодательство и регуляторы": "⚖️",
  "Внешняя среда": "🌐",
  "Клиенты и продукты": "👥",
  "Партнёры и поставки": "🤝",
  "Процессы и контроль": "⚙️",
  "Персонал и культура": "👤",
  "Проекты и изменения": "🚀",
  "Технологии и данные": "💾",
};

const attentionZones = [
  { category: "ИТ и Непрерывность", badge: "Лимит исчерпан", badgeColor: "bg-norm-red-light text-norm-red", title: "Массовые сбои в системе онлайн-расчётов" },
  { category: "ИТ и Непрерывность", badge: "Лимит исчерпан", badgeColor: "bg-norm-red-light text-norm-red", title: "Массовые сбои в системе онлайн-расчётов" },
  { category: "ИТ и Непрерывность", badge: "Лимит исчерпан", badgeColor: "bg-norm-red-light text-norm-red", title: "Массовые сбои в системе онлайн-расчётов" },
];

const newsItems = [
  {
    tags: ["Законодательство", "Персональные данные"],
    tagColors: ["text-norm-orange", "text-norm-green"],
    title: "Обработка персональных данных",
    desc: "Ужесточились требования к обработке персональных данных и существенно выросли штрафы за выявленные нарушения.",
    icon: "📋",
  },
  {
    tags: ["Новость", "Экономика"],
    tagColors: ["text-norm-green", "text-norm-green"],
    title: "Магазин-склад Самоката закрыт Роспотребнадзором",
    desc: "Невский районный суд Петербурга закрыл магазин-склад ООО 'Умный Ритейл' в Ростове-на-Дону по иску Роспотребнадзор…",
    icon: "📰",
  },
  {
    tags: ["Законодательство", "Налоговое право"],
    tagColors: ["text-norm-orange", "text-norm-green"],
    title: "Ужесточение требований к обработке персональных данных",
    desc: "Ужесточились требования к обработке персональных данных и существенно выросли штрафы за выявленные нарушения.",
    icon: "📋",
  },
];

function HomePage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Привет! Я твой риск-менеджер Норм.
        </h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors">
            Выявляю риски
            <Sparkles className="w-4 h-4 text-norm-green" />
          </button>
          <button className="relative p-2 rounded-full hover:bg-accent transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left column */}
        <div className="flex-1 min-w-0">
          {/* Donut chart card */}
          <div className="bg-card rounded-2xl border border-border p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Объекты управления рисками</h2>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg hover:bg-accent"><span className="text-muted-foreground text-sm">⏰</span></button>
                <button className="p-1.5 rounded-lg hover:bg-accent"><span className="text-muted-foreground text-sm">⊞</span></button>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              {/* Category labels around chart */}
              <div className="relative w-full max-w-[500px] aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ResponsiveContainer width={260} height={260}>
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {donutData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Labels around the chart */}
                {donutData.map((item, i) => {
                  const positions = [
                    { top: "5%", left: "35%" },
                    { top: "5%", right: "10%" },
                    { top: "35%", right: "0%" },
                    { top: "60%", right: "5%" },
                    { bottom: "10%", right: "20%" },
                    { bottom: "5%", left: "35%" },
                    { top: "60%", left: "0%" },
                    { top: "35%", left: "5%" },
                  ];
                  const pos = positions[i];
                  return (
                    <div
                      key={item.name}
                      className="absolute text-center"
                      style={{ ...pos, maxWidth: "140px" }}
                    >
                      <div className="text-lg mb-0.5">{categoryIcons[item.name]}</div>
                      <div className="text-xs text-muted-foreground leading-tight">{item.name}</div>
                      <div className="text-xs font-medium text-foreground">{item.value} млн/₽</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-3 h-3 rounded-sm bg-norm-yellow opacity-50" />
                Прямые потери
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-3 h-3 rounded-full border-2 border-muted-foreground/30" />
                Лимит
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
                Прогноз (Потенциальные потери)
              </div>
            </div>
          </div>

          {/* News section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">
                Я собрал важные изменения в законах и СМИ
              </h2>
              <button className="text-sm text-muted-foreground hover:text-foreground">Показать все</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {newsItems.map((item, i) => (
                <div key={i} className="bg-card rounded-2xl border border-norm-purple-light p-5 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm">{item.icon}</span>
                    {item.tags.map((tag, ti) => (
                      <span key={ti} className={`text-xs font-medium ${item.tagColors[ti]}`}>
                        {ti > 0 && <span className="text-muted-foreground mx-1">·</span>}
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                  <button className="flex items-center gap-1 text-xs font-semibold text-norm-green mt-3 hover:underline">
                    Принять меры
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="w-[320px] flex-shrink-0 space-y-4">
          {/* What's happening */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-norm-green flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="font-semibold text-sm text-foreground">Что происходит</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Общие потери</span>
                  <span className="text-[10px] font-bold text-norm-green bg-norm-green-light px-1.5 py-0.5 rounded-full">85%</span>
                </div>
                <div className="text-lg font-bold text-foreground">5.1 <span className="text-xs font-normal text-muted-foreground">млн/₽</span></div>
                <div className="text-[10px] text-muted-foreground mt-0.5">5.35 млн/₽</div>
              </div>
              <div className="rounded-xl border border-border p-3">
                <div className="text-xs text-muted-foreground mb-1">Потенциальные потери</div>
                <div className="text-lg font-bold text-foreground">6.2 <span className="text-xs font-normal text-muted-foreground">млн/₽</span></div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-norm-orange" />
                  <span className="text-[10px] text-muted-foreground">320 тыс./₽</span>
                </div>
              </div>
            </div>

            {/* Attention zones */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-foreground">Зоны внимания</h3>
              <span className="text-xs text-muted-foreground">30 дней</span>
            </div>
            <div className="space-y-2">
              {attentionZones.map((zone, i) => (
                <div key={i} className="rounded-xl border border-border p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-muted-foreground">{zone.category}</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${zone.badgeColor}`}>
                      {zone.badge}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-foreground">{zone.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* High risks */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-sm text-foreground mb-1">
              Высокие риски без мер <span className="font-normal text-muted-foreground">6 из 18</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              11% высоких рисков не имеют эффективных мер
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
