import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp, Building2, Scale, AlertTriangle, Package, Server,
  Check, Clock, XCircle, FileText, Bot, User, Upload,
  ChevronRight, Shield, X
} from "lucide-react";
import { profileAreas, companyName, type ProfileArea, type ProfileAttribute, type ProfileSubsection } from "../data/companyProfileData";
import { NormFab } from "../components/NormFab";

const iconMap: Record<string, React.ComponentType<any>> = {
  TrendingUp, Building2, Scale, AlertTriangle, Package, Server,
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

function getNormMessage(areas: ProfileArea[]): string {
  const critical = areas.filter(a => a.state === "critical");
  const totalPending = areas.reduce((s, a) => s + (a.pendingCount || 0), 0);
  if (critical.length > 0) {
    const names = critical.map(a => `«${a.name}»`).join(", ");
    return `Профиль требует внимания. Раздел ${names} не заполнен — это влияет на точность анализа 3 активных рисков. Рекомендую начать с него.`;
  }
  if (totalPending > 0) {
    return `Я нашёл новые данные по компании из внешних источников. ${totalPending} атрибутов ждут подтверждения — часть из них влияет на оценку рисков.`;
  }
  return "Профиль актуален. Последнее обновление — 3 мая 2026. Все критичные разделы верифицированы.";
}

export default function ProfilePage() {
  const [selectedArea, setSelectedArea] = useState<ProfileArea | null>(null);
  const navigate = useNavigate();

  const totalPending = profileAreas.reduce((s, a) => s + (a.pendingCount || 0), 0);
  const criticalAreas = profileAreas.filter(a => a.state === "critical").length;
  const reliabilityState = criticalAreas > 0 ? "critical" : totalPending > 0 ? "attention" : "reliable";

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 pt-8 pb-0">
        {/* Breadcrumb */}
        <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
          <span>Главная</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">Профиль компании</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">— {companyName}</h1>
        <p className="text-sm text-muted-foreground mb-5">База структурированных знаний о компании</p>

        {/* AI message from Norm */}
        <div className="flex items-start gap-3 rounded-2xl px-5 py-4 mb-5" style={{ background: "rgba(123, 107, 241, 0.06)", borderRadius: "14px" }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(123, 107, 241, 0.12)" }}>
            <Bot className="w-4.5 h-4.5" style={{ color: "#7B6BF1" }} />
          </div>
          <p className="text-sm leading-relaxed text-foreground" style={{ fontSize: "14.5px" }}>
            {getNormMessage(profileAreas)}
          </p>
        </div>

        {/* Summary widgets */}
        <div className="grid grid-cols-4 gap-4 mb-6">
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
              reliabilityState === "attention" ? `Требует внимания` :
              "Данные неполны"
            }
            valueClass={
              reliabilityState === "reliable" ? "text-norm-green" :
              reliabilityState === "attention" ? "text-norm-yellow" : "text-norm-red"
            }
          />
          <SummaryCard
            icon={<Bot className="w-4 h-4" style={{ color: "#7B6BF1" }} />}
            label="Ожидают подтверждения"
            value={`${totalPending} атрибутов от Норма`}
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
      </div>

      {/* Cards grid */}
      <div className="px-8 pb-8">
        <div className="grid grid-cols-3 gap-4">
          {profileAreas.map(area => {
            const Icon = iconMap[area.icon] || AlertTriangle;
            return (
              <AreaCard
                key={area.id}
                area={area}
                Icon={Icon}
                onClick={() => setSelectedArea(area)}
              />
            );
          })}
        </div>
      </div>

      {/* Detail drawer */}
      {selectedArea && (
        <ProfileDetailDrawer
          area={selectedArea}
          onClose={() => setSelectedArea(null)}
        />
      )}

      <NormFab onOpenProfile={() => navigate("/profile")} />
    </div>
  );
}

/* ─── Summary Card ─── */
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
      style={{ borderRadius: "14px" }}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className={`text-sm font-medium ${valueClass || "text-foreground"}`}>{value}</div>
    </div>
  );
}

/* ─── Area Card ─── */
function AreaCard({ area, Icon, onClick }: { area: ProfileArea; Icon: React.ComponentType<any>; onClick: () => void }) {
  const stateStyles = {
    reliable: { border: "border-border", bg: "bg-card", accent: "text-norm-green", iconBg: "bg-norm-green-light" },
    attention: { border: "border-[#FDB023]", bg: "bg-[#FDB023]/5", accent: "text-[#FDB023]", iconBg: "bg-[#FDB023]/10" },
    critical: { border: "border-[#F26B6E]", bg: "bg-[#F26B6E]/5", accent: "text-[#F26B6E]", iconBg: "bg-[#F26B6E]/10" },
    empty: { border: "border-dashed border-border", bg: "bg-muted/30", accent: "text-muted-foreground", iconBg: "bg-muted" },
  };
  const style = stateStyles[area.state];

  return (
    <button
      onClick={onClick}
      className={`text-left rounded-2xl border ${style.border} ${style.bg} p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3`}
      style={{ borderRadius: "14px", boxShadow: "0 4px 16px rgba(16,24,32,0.06)" }}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${style.iconBg}`}>
          <Icon className={`w-5 h-5 ${style.accent}`} />
        </div>
        <h3 className="text-sm font-bold text-foreground">{area.name}</h3>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1">{area.description}</p>

      {area.state !== "empty" && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                area.state === "critical" ? "bg-[#F26B6E]" : area.state === "attention" ? "bg-[#FDB023]" : "bg-norm-green"
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
        {area.state === "reliable" && <span className="text-xs text-muted-foreground">Просмотреть →</span>}
        {area.state === "attention" && <span className="text-xs font-semibold text-norm-green">Подтвердить ({area.pendingCount}) →</span>}
        {area.state === "critical" && <span className="text-xs font-semibold text-[#F26B6E]">Добавить данные →</span>}
        {area.state === "empty" && <span className="text-xs font-semibold text-muted-foreground">Загрузить документ →</span>}
      </div>
    </button>
  );
}

/* ─── Profile Detail Drawer ─── */
function ProfileDetailDrawer({ area, onClose }: { area: ProfileArea; onClose: () => void }) {
  const Icon = iconMap[area.icon] || AlertTriangle;
  const [activeSubsection, setActiveSubsection] = useState(area.subsections[0]?.id || "");

  const currentSub = area.subsections.find(s => s.id === activeSubsection) || area.subsections[0];

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-[520px] bg-card border-l border-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                area.state === "critical" ? "bg-[#F26B6E]/10" : area.state === "attention" ? "bg-[#FDB023]/10" : area.state === "empty" ? "bg-muted" : "bg-norm-green-light"
              }`}>
                <Icon className={`w-5 h-5 ${
                  area.state === "critical" ? "text-[#F26B6E]" : area.state === "attention" ? "text-[#FDB023]" : area.state === "empty" ? "text-muted-foreground" : "text-norm-green"
                }`} />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground">{area.name}</h2>
                <p className="text-xs text-muted-foreground">{area.description}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {area.state !== "empty" && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 max-w-[140px] h-1.5 bg-border rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${
                  area.state === "critical" ? "bg-[#F26B6E]" : area.state === "attention" ? "bg-[#FDB023]" : "bg-norm-green"
                }`} style={{ width: `${area.filledPercent}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">{area.filledPercent}% заполнено</span>
            </div>
          )}

          {/* Chip navigation */}
          {area.subsections.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {area.subsections.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubsection(sub.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeSubsection === sub.id
                      ? "bg-foreground text-background"
                      : "bg-accent border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {area.state === "empty" && currentSub?.attributes.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(123, 107, 241, 0.08)" }}>
                <Icon className="w-7 h-7" style={{ color: "#7B6BF1" }} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{area.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">{area.emptyReason}</p>
              <p className="text-xs text-muted-foreground mb-6">{area.whyImportant}</p>
              <div className="flex gap-3 justify-center">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                  <Upload className="w-4 h-4" /> Загрузить документ
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors">
                  Заполнить вручную
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {currentSub?.attributes.map(attr => (
                <AttributeRow key={attr.id} attr={attr} />
              ))}
              {currentSub?.attributes.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-sm text-muted-foreground mb-4">Нет данных в этом подразделе</p>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors mx-auto">
                    <Upload className="w-4 h-4" /> Загрузить документ
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Attribute Row ─── */
function AttributeRow({ attr }: { attr: ProfileAttribute }) {
  const [confirmed, setConfirmed] = useState(false);
  const st = statusConfig[attr.status];
  const src = sourceConfig[attr.source];
  const StIcon = st.icon;
  const SrcIcon = src.icon;
  const hasPending = attr.suggestion && !confirmed;

  return (
    <div className={`relative px-6 py-4 hover:bg-accent/30 transition-colors ${hasPending ? "pl-9" : ""}`}>
      {hasPending && (
        <div className="absolute left-3 top-6 w-[7px] h-[7px] rounded-full bg-norm-green animate-pulse" />
      )}
      <div className="space-y-1.5">
        <div className="text-xs text-muted-foreground font-medium">{attr.name}</div>
        <div className="text-sm text-foreground">{attr.value || <span className="text-muted-foreground italic">Не заполнено</span>}</div>
        <div className="flex items-center gap-2 text-[11px]">
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
          <div className="mt-3 rounded-lg p-3 bg-gradient-to-b from-norm-green-light/50 to-card border border-[#7B6BF1]/20">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold mb-1.5" style={{ color: "#7B6BF1" }}>
              <Bot className="w-3.5 h-3.5" /> Предложение Норма
            </div>
            <div className="text-xs mb-2">
              <span className="text-[#F26B6E] line-through">{attr.suggestion.oldValue}</span>
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
  );
}
