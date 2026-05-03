import { useState } from "react";
import { Bot, X, ChevronRight, AlertTriangle, Check } from "lucide-react";
import type { NormUpdate } from "../data/companyProfileData";
import { normUpdates } from "../data/companyProfileData";

interface NormFabProps {
  onOpenProfile?: () => void;
}

export function NormFab({ onOpenProfile }: NormFabProps) {
  const [panelOpen, setPanelOpen] = useState(false);

  const riskUpdates = normUpdates.filter((u) => u.riskImpact);
  const isPriority = riskUpdates.length > 0;

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setPanelOpen(!panelOpen)}
        className={`fixed bottom-6 right-6 z-30 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-lg hover:-translate-y-0.5 transition-all duration-200 ${
          isPriority
            ? "bg-gradient-to-r from-norm-iris to-norm-green text-white border border-norm-iris/20"
            : "bg-card text-foreground border border-border"
        }`}
        style={{ boxShadow: "0 16px 48px rgba(16,24,32,0.14), 0 2px 6px rgba(16,24,32,0.04)" }}
      >
        <Bot className="w-5 h-5" />
        <span className="text-sm font-medium">
          {isPriority ? `Норм: ${normUpdates.length} обновлений · влияют на риск` : `Норм: ${normUpdates.length} обновлений в профиле`}
        </span>
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center ${
          isPriority ? "bg-norm-iris text-white" : "bg-muted text-muted-foreground"
        }`}>
          {normUpdates.length}
        </span>
      </button>

      {/* Panel */}
      {panelOpen && (
        <div className="fixed bottom-20 right-6 w-[360px] bg-card border border-border rounded-2xl shadow-2xl z-40 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
             style={{ boxShadow: "0 16px 48px rgba(16,24,32,0.14), 0 2px 6px rgba(16,24,32,0.04)" }}>
          <div className="px-5 pt-4 pb-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-norm-iris-light to-norm-green-light flex items-center justify-center">
                <Bot className="w-4 h-4 text-norm-iris" />
              </div>
              <span className="text-sm font-bold text-foreground">Норм</span>
            </div>
            <button onClick={() => setPanelOpen(false)} className="p-1 rounded-lg hover:bg-accent">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* AI message */}
          <div className="px-5 py-3 border-b border-border bg-gradient-to-r from-norm-iris-light/40 to-norm-green-light/40">
            <p className="text-xs text-foreground leading-relaxed">
              {isPriority
                ? `Я нашёл данные, которые могут повлиять на оценку активных рисков. Рекомендую проверить.`
                : `Я нашёл новые данные о компании из внешних источников.`}
            </p>
          </div>

          {/* Updates list */}
          <div className="max-h-[300px] overflow-y-auto">
            {normUpdates.map((upd) => (
              <div key={upd.id} className="px-5 py-3 border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-norm-green-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3 h-3 text-norm-green" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">{upd.attributeName}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      <span className="line-through text-norm-red">{upd.oldValue}</span>
                      <span className="mx-1">→</span>
                      <span className="text-norm-green font-medium">{upd.newValue}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-muted-foreground">{upd.source} · {upd.date}</span>
                      {upd.riskImpact && (
                        <span className="text-[10px] font-medium text-norm-iris bg-norm-iris-light px-1.5 py-0.5 rounded">
                          Влияет на: {upd.riskImpact}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          {onOpenProfile && (
            <div className="px-5 py-3 border-t border-border">
              <button
                onClick={() => { setPanelOpen(false); onOpenProfile(); }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-norm-green hover:bg-norm-green-light transition-colors"
              >
                Открыть профиль компании
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
