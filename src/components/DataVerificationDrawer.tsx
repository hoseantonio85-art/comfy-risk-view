import { useState } from "react";
import { X, Check, XCircle, ChevronRight, Shield, FileText, Bot, User, Clock, ExternalLink, MessageSquare } from "lucide-react";
import type { ProfileAttribute } from "../data/companyProfileData";
import { riskEvidenceSources, companyName, type EvidenceSource } from "../data/companyProfileData";

interface InlineEvidenceDrawerProps {
  source: EvidenceSource;
  onClose: () => void;
  onOpenProfile: () => void;
}

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

export function InlineEvidenceDrawer({ source, onClose, onOpenProfile }: InlineEvidenceDrawerProps) {
  const [actions, setActions] = useState<Record<string, string>>({});

  const handleAction = (id: string, action: string) => {
    setActions(prev => ({ ...prev, [id]: action }));
  };

  return (
    <div className="w-[400px] border-l border-border flex flex-col flex-shrink-0 bg-card animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-border">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Данные профиля</span>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-accent transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <h3 className="text-sm font-bold text-foreground">{source.name}</h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">{companyName}</p>
      </div>

      {/* Attributes */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
        {source.attributes.map(attr => {
          const st = statusConfig[attr.status];
          const src = sourceConfig[attr.source];
          const StIcon = st.icon;
          const SrcIcon = src.icon;
          const action = actions[attr.id];

          return (
            <div key={attr.id} className="rounded-xl border border-border p-3.5 space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{attr.name}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{attr.value || "—"}</div>
                </div>
                <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${st.bg} ${st.color}`}>
                  <StIcon className="w-3 h-3" />
                  {st.label}
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1">
                  <SrcIcon className="w-3 h-3" />
                  {src.label}
                </div>
                {attr.updatedAt && (
                  <>
                    <span className="text-border">·</span>
                    <span>{attr.updatedAt}</span>
                  </>
                )}
              </div>

              {attr.suggestion && (
                <div className="rounded-lg p-2.5 bg-gradient-to-b from-norm-green-light/50 to-card border border-[#7B6BF1]/20">
                  <div className="flex items-center gap-1 text-[10px] font-semibold mb-1.5" style={{ color: "#7B6BF1" }}>
                    <Bot className="w-3 h-3" /> Предложение Норма
                  </div>
                  <div className="text-xs mb-1">
                    <span className="text-[#F26B6E] line-through">{attr.suggestion.oldValue}</span>
                    <span className="mx-1">→</span>
                    <span className="text-norm-green font-medium">{attr.suggestion.newValue}</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground">{attr.suggestion.reason}</div>
                </div>
              )}

              {action ? (
                <div className={`text-xs font-medium px-2 py-1 rounded-md inline-flex items-center gap-1 ${
                  action === "confirmed" ? "bg-norm-green-light text-norm-green" : "bg-accent text-muted-foreground"
                }`}>
                  {action === "confirmed" ? <><Check className="w-3 h-3" /> Подтверждено</> : <><XCircle className="w-3 h-3" /> Отклонено</>}
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(attr.id, "confirmed")}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Check className="w-3 h-3" /> Подтвердить
                  </button>
                  <button
                    onClick={() => handleAction(attr.id, "rejected")}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:bg-accent transition-colors"
                  >
                    Отклонить
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border">
        <button
          onClick={onOpenProfile}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-accent transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Открыть полный профиль компании
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
