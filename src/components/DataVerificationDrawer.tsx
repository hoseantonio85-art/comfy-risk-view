import { useState } from "react";
import { X, Check, XCircle, MessageSquare, ChevronRight, Shield, FileText, Bot, User, Clock, ExternalLink } from "lucide-react";
import type { ProfileAttribute } from "../data/companyProfileData";
import { riskEvidenceAttributes, companyName } from "../data/companyProfileData";

interface DataVerificationDrawerProps {
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

export function DataVerificationDrawer({ onClose, onOpenProfile }: DataVerificationDrawerProps) {
  const [attributes, setAttributes] = useState<(ProfileAttribute & { action?: string })[]>(
    riskEvidenceAttributes.map((a) => ({ ...a }))
  );

  const handleAction = (id: string, action: string) => {
    setAttributes((prev) => prev.map((a) => (a.id === id ? { ...a, action } : a)));
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 w-[400px] bg-card border-l border-border shadow-2xl z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Проверка данных</span>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-accent transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <h3 className="text-base font-bold text-foreground">{companyName}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Данные для анализа риска</p>
      </div>

      {/* Attributes list */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {attributes.map((attr) => {
          const st = statusConfig[attr.status];
          const src = sourceConfig[attr.source];
          const StIcon = st.icon;
          const SrcIcon = src.icon;

          return (
            <div key={attr.id} className="rounded-xl border border-border p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{attr.name}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{attr.value || "—"}</div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${st.bg} ${st.color}`}>
                  <StIcon className="w-3 h-3" />
                  {st.label}
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
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
                {attr.riskImpact && (
                  <>
                    <span className="text-border">·</span>
                    <span className="text-norm-iris font-medium">{attr.riskImpact}</span>
                  </>
                )}
              </div>

              {attr.suggestion && (
                <div className="rounded-lg p-3 bg-gradient-to-b from-norm-green-light/50 to-card border border-norm-iris/20">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-norm-iris mb-2">
                    <Bot className="w-3.5 h-3.5" />
                    Предложение Норма
                  </div>
                  <div className="text-xs space-y-1 mb-2">
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-10">Было:</span>
                      <span className="text-norm-red line-through">{attr.suggestion.oldValue}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-10">Стало:</span>
                      <span className="text-norm-green font-medium bg-norm-green-light px-1 rounded">{attr.suggestion.newValue}</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-muted-foreground">{attr.suggestion.reason}</div>
                </div>
              )}

              {/* Action buttons */}
              {attr.action ? (
                <div className={`text-xs font-medium px-2 py-1 rounded-md inline-flex items-center gap-1 ${
                  attr.action === "confirmed" ? "bg-norm-green-light text-norm-green" :
                  attr.action === "rejected" ? "bg-accent text-muted-foreground" :
                  "bg-norm-iris-light text-norm-iris"
                }`}>
                  {attr.action === "confirmed" ? <><Check className="w-3 h-3" /> Подтверждено</> :
                   attr.action === "rejected" ? <><XCircle className="w-3 h-3" /> Отклонено</> :
                   <><MessageSquare className="w-3 h-3" /> На уточнении</>}
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(attr.id, "confirmed")}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Check className="w-3 h-3" /> Подтвердить
                  </button>
                  <button
                    onClick={() => handleAction(attr.id, "rejected")}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:bg-accent transition-colors"
                  >
                    Отклонить
                  </button>
                  <button
                    onClick={() => handleAction(attr.id, "clarify")}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:bg-accent transition-colors"
                  >
                    Уточнить
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border">
        <button
          onClick={onOpenProfile}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Открыть полный профиль
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
