import { X, ChevronRight, MoreVertical, ChevronDown, Sparkles, Calendar } from "lucide-react";
import type { RiskAnalysis } from "../data/mockData";

interface AnalysisModalProps {
  analysis: RiskAnalysis;
  onClose: () => void;
  onOpenRisk: () => void;
}

export function AnalysisModal({ analysis, onClose, onOpenRisk }: AnalysisModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 bg-card rounded-2xl shadow-2xl w-full max-w-[860px] max-h-[85vh] overflow-y-auto mx-8">
        {/* Header */}
        <div className="sticky top-0 bg-card z-10 px-8 pt-6 pb-4 flex items-center justify-between border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Анализ рисков</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="flex">
          {/* Main */}
          <div className="flex-1 px-8 py-6 space-y-5">
            {/* Counters */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border p-4 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Выявлено новых</div>
                  <div className="text-2xl font-bold text-foreground">{analysis.newCount}</div>
                </div>
              </div>
              <div className="rounded-xl border border-border p-4 flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-norm-orange flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-norm-orange" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Переоценёно</div>
                  <div className="text-2xl font-bold text-foreground">{analysis.reassessedCount}</div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="rounded-xl border border-border p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-norm-green flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="text-sm text-foreground">Для анализа рисков Норм использовал <strong>{analysis.documentsUsed} документов</strong></span>
              </div>
              <button className="text-sm font-medium text-norm-green hover:underline">Показать</button>
            </div>

            {/* Risks section */}
            <div className="rounded-2xl border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-foreground">Риски</h3>
                <span className="text-sm text-muted-foreground">{analysis.risks.length}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{analysis.summary}</p>
              <button className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
                Подробнее <ChevronDown className="w-3 h-3" />
              </button>

              {/* Risk items */}
              <div className="space-y-3">
                {analysis.risks.map((risk) => {
                  const levelColor = risk.level === "Высокий" ? "bg-norm-red-light text-norm-red" : risk.level === "Средний" ? "bg-norm-orange-light text-norm-orange" : "bg-norm-green-light text-norm-green";
                  const levelDot = risk.level === "Высокий" ? "bg-norm-coral" : risk.level === "Средний" ? "bg-norm-orange" : "bg-norm-green";
                  const statusColor = risk.status === "Новый" ? "text-primary" : risk.status === "Уровень вырос" ? "text-norm-orange" : "text-muted-foreground";

                  return (
                    <div key={risk.id}>
                      <button
                        onClick={onOpenRisk}
                        className="w-full text-left flex items-center gap-3 py-2 hover:bg-accent/50 rounded-lg px-2 -mx-2 transition-colors"
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0`}>
                          <div className="w-4 h-4 rounded-full border-2 border-norm-coral flex items-center justify-center">
                            <div className={`w-1.5 h-1.5 rounded-full ${levelDot}`} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-foreground truncate">{risk.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {risk.code} · {risk.date} · <span className={statusColor}>{risk.status}</span>
                          </div>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-md ${levelColor} flex items-center gap-1`}>
                          <span className="text-[8px]">▲</span> {risk.level}
                        </span>
                        <MoreVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      </button>

                      {/* Recommendations */}
                      {risk.recommendations.length > 0 && (
                        <div className="ml-8 mt-1 mb-2">
                          <button className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                            Рекомендации <ChevronDown className="w-3 h-3 rotate-180" />
                          </button>
                          <div className="space-y-0 rounded-xl border border-border overflow-hidden bg-accent/30">
                            {risk.recommendations.map((rec, ri) => (
                              <div key={ri} className={`flex items-center gap-3 px-4 py-2.5 ${ri > 0 ? "border-t border-border" : ""}`}>
                                <span className="text-primary text-xs">✦</span>
                                <span className="text-sm text-foreground flex-1">{rec.text}</span>
                                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground border border-border rounded-md px-2 py-0.5 bg-card">{rec.action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-[240px] border-l border-border px-5 py-6 flex-shrink-0 space-y-5">
            <div className="rounded-2xl border border-norm-green-light bg-norm-green-light/30 p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-norm-green flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-norm-green">Есть вопросы?</div>
                  <div className="text-xs text-muted-foreground">Я отвечу на любой из них</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
            </div>

            <div>
              <h4 className="font-semibold text-sm text-foreground mb-3">Информация</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Дата анализа</span>
                  <div className="text-right">
                    <div className="text-foreground font-medium">{analysis.date}</div>
                    <div className="text-muted-foreground">{analysis.time}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Автор</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-muted" />
                    <span className="text-foreground">{analysis.author}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
