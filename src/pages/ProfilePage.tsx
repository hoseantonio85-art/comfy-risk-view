import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp, Building2, Settings, Scale, Users, AlertTriangle,
  Check, Clock, XCircle, FileText, Bot, User, Upload, MessageSquare,
  ChevronRight, Shield, ExternalLink, Info
} from "lucide-react";
import { profileAreas, companyName, type ProfileArea, type ProfileAttribute } from "../data/companyProfileData";
import { NormFab } from "../components/NormFab";

const iconMap: Record<string, React.ComponentType<any>> = {
  TrendingUp, Building2, Settings, Scale, Users, AlertTriangle,
};

const statusConfig = {
  verified: { label: "Подтверждено", color: "text-norm-green", bg: "bg-norm-green-light", icon: Check },
  unverified: { label: "Не верифицировано", color: "text-norm-orange", bg: "bg-norm-orange-light", icon: Clock },
  outdated: { label: "Устарело", color: "text-norm-yellow", bg: "bg-norm-yellow-light", icon: Clock },
  missing: { label: "Отсутствует", color: "text-norm-red", bg: "bg-norm-red-light", icon: XCircle },
};

const sourceConfig = {
  agent: { label: "Агент", icon: Bot },
  registry: { label: "Реестр", icon: FileText },
  user: { label: "Пользователь", icon: User },
  document: { label: "Документ", icon: FileText },
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"card" | "map" | "facts" | "processes">("map");
  const [selectedArea, setSelectedArea] = useState<ProfileArea | null>(null);
  const navigate = useNavigate();

  const totalPending = profileAreas.reduce((s, a) => s + (a.pendingCount || 0), 0);
  const criticalAreas = profileAreas.filter((a) => a.state === "critical").length;
  const reliabilityState = criticalAreas > 0 ? "critical" : totalPending > 0 ? "attention" : "reliable";

  const tabs = [
    { id: "card" as const, label: "Карточка компании" },
    { id: "map" as const, label: "Карта профиля" },
    { id: "facts" as const, label: "Факты" },
    { id: "processes" as const, label: "Процессы" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border px-8 pt-8 pb-0">
        <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
          <span>Главная</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">Профиль компании</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">— {companyName}</h1>
        <p className="text-sm text-muted-foreground mb-5">База структурированных знаний о компании</p>

        <div className="grid grid-cols-4 gap-4 mb-5">
          <SummaryCard
            icon={
              <div className={`w-3 h-3 rounded-full ${
                reliabilityState === "reliable" ? "bg-norm-green" :
                reliabilityState === "attention" ? "bg-norm-yellow" : "bg-norm-red"
              }`} />
            }
            label="Надёжность профиля"
            value={
              reliabilityState === "reliable" ? "Профиль надёжен" :
              reliabilityState === "attention" ? `Требует внимания — ${totalPending} полей не верифицировано` :
              "Данные неполны — анализ может быть неточным"
            }
            valueClass={
              reliabilityState === "reliable" ? "text-norm-green" :
              reliabilityState === "attention" ? "text-norm-yellow" : "text-norm-red"
            }
          />
          <SummaryCard
            icon={<Bot className="w-4 h-4 text-norm-iris" />}
            label="Ожидают подтверждения"
            value={`${totalPending} атрибутов от Норма`}
            clickable
          />
          <SummaryCard
            icon={<Clock className="w-4 h-4 text-muted-foreground" />}
            label="Обновлено"
            value="03 мая 2026"
          />
          <SummaryCard
            icon={<Shield className="w-4 h-4 text-norm-coral" />}
            label="Влияет на риски"
            value="3 активных риска"
            clickable
            onClick={() => navigate("/risks")}
          />
        </div>

        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedArea(null); }}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-foreground font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 py-6">
        {activeTab === "map" && !selectedArea && <ProfileMap onSelectArea={setSelectedArea} />}
        {activeTab === "map" && selectedArea && (
          <AreaDetail area={selectedArea} onBack={() => setSelectedArea(null)} />
        )}
        {activeTab === "card" && <CardTab />}
        {activeTab === "facts" && <PlaceholderTab title="Факты" />}
        {activeTab === "processes" && <PlaceholderTab title="Процессы" />}
      </div>

      <NormFab onOpenProfile={() => navigate("/profile")} />
    </div>
  );
}

function SummaryCard({ icon, label, value, valueClass, clickable, onClick }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
  clickable?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border border-border bg-card p-4 ${clickable ? "cursor-pointer hover:border-primary/30 hover:shadow-sm transition-all" : ""}`}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className={`text-sm font-medium ${valueClass || "text-foreground"}`}>{value}</div>
    </div>
  );
}

function ProfileMap({ onSelectArea }: { onSelectArea: (area: ProfileArea) => void }) {
  const stateStyles = {
    reliable: { border: "border-border", bg: "bg-card", accent: "text-norm-green", badge: "bg-norm-green-light text-norm-green" },
    attention: { border: "border-norm-yellow", bg: "bg-norm-yellow-light/30", accent: "text-norm-yellow", badge: "bg-norm-yellow-light text-norm-yellow" },
    critical: { border: "border-norm-red", bg: "bg-norm-red-light/30", accent: "text-norm-red", badge: "bg-norm-red-light text-norm-red" },
    empty: { border: "border-dashed border-border", bg: "bg-muted/30", accent: "text-muted-foreground", badge: "bg-muted text-muted-foreground" },
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {profileAreas.map((area) => {
        const style = stateStyles[area.state];
        const Icon = iconMap[area.icon] || AlertTriangle;

        return (
          <div
            key={area.id}
            onClick={() => onSelectArea(area)}
            className={`rounded-2xl border ${style.border} ${style.bg} p-5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3`}
            style={{ borderRadius: "14px" }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  area.state === "empty" ? "bg-muted" : area.state === "critical" ? "bg-norm-red-light" : area.state === "attention" ? "bg-norm-yellow-light" : "bg-norm-green-light"
                }`}>
                  <Icon className={`w-5 h-5 ${style.accent}`} />
                </div>
                <h3 className="text-sm font-bold text-foreground">{area.name}</h3>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">{area.description}</p>

            {area.state !== "empty" && (
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      area.state === "critical" ? "bg-norm-red" : area.state === "attention" ? "bg-norm-yellow" : "bg-norm-green"
                    }`}
                    style={{ width: `${area.filledPercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">{area.filledPercent}%</span>
              </div>
            )}

            <div className={`text-xs font-medium ${style.accent}`}>
              {area.state === "reliable" && `✓ Верифицировано · обновлено ${area.updatedAgo}`}
              {area.state === "attention" && `⚠ ${area.pendingCount} атрибутов ждут подтверждения`}
              {area.state === "critical" && `● Влияет на анализ рисков · добавить данные`}
              {area.state === "empty" && `○ Нет данных · загрузить документ или заполнить`}
            </div>

            <div className="mt-auto pt-1">
              {area.state === "attention" && area.pendingCount && (
                <span className="text-xs font-semibold text-norm-green">Подтвердить ({area.pendingCount}) →</span>
              )}
              {area.state === "critical" && (
                <span className="text-xs font-semibold text-norm-red">Добавить данные →</span>
              )}
              {area.state === "empty" && (
                <span className="text-xs font-semibold text-muted-foreground">Загрузить документ →</span>
              )}
              {area.state === "reliable" && (
                <span className="text-xs text-muted-foreground">Просмотреть →</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AreaDetail({ area, onBack }: { area: ProfileArea; onBack: () => void }) {
  const Icon = iconMap[area.icon] || AlertTriangle;

  if (area.state === "empty") {
    return (
      <div>
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          ← Назад к карте профиля
        </button>
        <div className="rounded-2xl border border-dashed border-border p-12 text-center max-w-lg mx-auto" style={{ borderRadius: "14px" }}>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-norm-iris-light to-norm-green-light flex items-center justify-center mx-auto mb-4">
            <Icon className="w-7 h-7 text-norm-iris" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">{area.name}</h3>
          <p className="text-sm text-muted-foreground mb-1">{area.emptyReason}</p>
          <p className="text-xs text-muted-foreground mb-6">{area.whyImportant}</p>
          <div className="flex gap-3 justify-center mb-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              <Upload className="w-4 h-4" /> Загрузить документ
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors">
              Заполнить вручную
            </button>
          </div>
          <button className="text-xs text-norm-iris hover:underline">Спросить Норма →</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        ← Назад к карте профиля
      </button>
      <div className="rounded-2xl border border-border bg-card overflow-hidden" style={{ borderRadius: "14px" }}>
        <div className="px-7 py-5 border-b border-border">
          <div className="flex items-center gap-3 mb-1">
            <Icon className="w-5 h-5 text-foreground" />
            <h2 className="text-lg font-bold text-foreground">{area.name}</h2>
          </div>
          <p className="text-sm text-muted-foreground">{area.description}</p>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1 max-w-[120px] h-1.5 bg-border rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-norm-green" style={{ width: `${area.filledPercent}%` }} />
            </div>
            <span className="text-xs text-muted-foreground">{area.filledPercent}% заполнено</span>
          </div>
        </div>

        <div className="divide-y divide-border">
          {area.attributes.map((attr) => (
            <AttributeRow key={attr.id} attr={attr} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AttributeRow({ attr }: { attr: ProfileAttribute }) {
  const [confirmed, setConfirmed] = useState(false);
  const st = statusConfig[attr.status];
  const src = sourceConfig[attr.source];
  const StIcon = st.icon;
  const SrcIcon = src.icon;
  const hasPending = attr.suggestion && !confirmed;

  return (
    <div className={`relative px-7 py-4 hover:bg-accent/30 transition-colors ${hasPending ? "pl-10" : ""}`}>
      {hasPending && (
        <div className="absolute left-3 top-6 w-[7px] h-[7px] rounded-full bg-norm-green animate-pulse" />
      )}
      <div className="grid grid-cols-[220px_1fr] gap-5 items-start">
        <div className="text-sm text-muted-foreground font-medium pt-0.5">{attr.name}</div>
        <div>
          <div className="text-sm text-foreground">{attr.value || <span className="text-muted-foreground italic">Не заполнено</span>}</div>
          <div className="flex items-center gap-2 mt-1.5 text-[11px]">
            <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${st.bg} ${st.color}`}>
              <StIcon className="w-3 h-3" />
              {st.label}
            </div>
            <span className="text-border">·</span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <SrcIcon className="w-3 h-3" />
              {src.label}
            </div>
            {attr.updatedAt && (
              <>
                <span className="text-border">·</span>
                <span className="text-muted-foreground">{attr.updatedAt}</span>
              </>
            )}
          </div>

          {attr.suggestion && !confirmed && (
            <div className="mt-3 rounded-lg p-3 bg-gradient-to-b from-norm-green-light/50 to-card border border-norm-iris/20">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-norm-iris mb-1.5">
                <Bot className="w-3.5 h-3.5" /> Предложение Норма
              </div>
              <div className="text-xs mb-2">
                <span className="text-norm-red line-through">{attr.suggestion.oldValue}</span>
                <span className="mx-1">→</span>
                <span className="text-norm-green font-medium">{attr.suggestion.newValue}</span>
              </div>
              <div className="text-[10px] text-muted-foreground mb-2">{attr.suggestion.reason}</div>
              <button
                onClick={() => setConfirmed(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Check className="w-3 h-3" /> Утвердить
              </button>
            </div>
          )}

          {confirmed && (
            <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-norm-green bg-norm-green-light px-2 py-1 rounded-md">
              <Check className="w-3 h-3" /> Подтверждено
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CardTab() {
  const sections = [
    "Общие сведения", "Регистрационные данные", "Финансы", "Учредители", "Лицензии", "Контакты"
  ];
  const [activeSection, setActiveSection] = useState(sections[0]);

  return (
    <div>
      <div className="flex gap-2 mb-6 flex-wrap sticky top-0 bg-background py-2 z-10">
        {sections.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSection(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeSection === s
                ? "bg-foreground text-background"
                : "bg-card border border-border text-muted-foreground hover:bg-accent"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-7" style={{ borderRadius: "14px" }}>
        <h3 className="text-lg font-bold text-foreground mb-4">{activeSection}</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="grid grid-cols-[200px_1fr] gap-5 py-3 border-b border-border last:border-0">
              <div className="text-sm text-muted-foreground font-medium">Атрибут {i}</div>
              <div className="text-sm text-foreground">Значение атрибута</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlaceholderTab({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-12 text-center" style={{ borderRadius: "14px" }}>
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
        <Info className="w-5 h-5 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">Раздел в разработке</p>
    </div>
  );
}
