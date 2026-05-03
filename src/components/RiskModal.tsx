import { X, ChevronRight, ChevronLeft, Edit, AlertTriangle, Shield, Info, Calendar, Users, Maximize2, Check, Clock, XCircle, FileText, Bot, User as UserIcon } from "lucide-react";
import type { Risk } from "../data/mockData";
import { useState } from "react";
import { LimitDrawer } from "./LimitDrawer";
import { KriDrawer } from "./KriDrawer";
import { DataVerificationDrawer } from "./DataVerificationDrawer";
import { riskEvidenceAttributes } from "../data/companyProfileData";
import { useNavigate } from "@tanstack/react-router";

interface RiskModalProps {
  risk: Risk;
  onClose: () => void;
}

export function RiskModal({ risk, onClose }: RiskModalProps) {
  const [activeTab, setActiveTab] = useState<"assessment" | "measures">("assessment");
  const [showLimitDrawer, setShowLimitDrawer] = useState(false);
  const [showKriDrawer, setShowKriDrawer] = useState(false);
  const [showDataDrawer, setShowDataDrawer] = useState(false);
  const navigate = useNavigate();

  const levelColor = risk.level === "Высокий" ? "text-norm-red" : risk.level === "Средний" ? "text-norm-orange" : "text-norm-green";
  const levelDot = risk.level === "Высокий" ? "bg-norm-red" : risk.level === "Средний" ? "bg-norm-orange" : "bg-norm-green";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />

      {/* Nav arrows */}
      <button className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-accent transition-colors">
        <ChevronLeft className="w-5 h-5 text-muted-foreground" />
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-accent transition-colors">
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </button>

      <div className="relative z-10 bg-card rounded-2xl shadow-2xl w-full max-w-[900px] max-h-[90vh] overflow-y-auto mx-16">
        {/* Header */}
        <div className="sticky top-0 bg-card z-10 px-8 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-muted-foreground">Риск</span>
            <span className="text-xs font-medium text-norm-green bg-norm-green-light px-2 py-0.5 rounded">Активен</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Утечка персональных данных клиентов</h2>
              <p className="text-sm text-muted-foreground">{risk.category}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <button
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${activeTab === "assessment" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground"}`}
              onClick={() => setActiveTab("assessment")}
            >
              Оценка риска
            </button>
            <button
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${activeTab === "measures" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground"}`}
              onClick={() => setActiveTab("measures")}
            >
              Меры
            </button>
            <div className="flex-1" />
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg px-3 py-1.5">
              <Edit className="w-3.5 h-3.5" />
              Редактировать
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Main content */}
          <div className="flex-1 px-8 py-6 space-y-6">
            {/* Risk level */}
            <div className="rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">Уровень риска</h3>
                  <div className={`flex items-center gap-1.5`}>
                    <div className={`w-2 h-2 rounded-full ${levelDot}`} />
                    <span className={`text-sm ${levelColor}`}>{risk.level}</span>
                  </div>
                </div>
                <button className="text-sm text-norm-green font-medium hover:underline flex items-center gap-1">
                  Источник анализа <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="rounded-lg border border-border p-3">
                  <div className="text-xs text-muted-foreground mb-2">Вероятность</div>
                  <div className="flex gap-1">
                    <div className="w-6 h-2 rounded-sm bg-norm-orange" />
                    <div className="w-6 h-2 rounded-sm bg-norm-orange" />
                    <div className="w-6 h-2 rounded-sm bg-norm-yellow" />
                    <div className="w-6 h-2 rounded-sm bg-border" />
                  </div>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <div className="text-xs text-muted-foreground mb-2">Влияние на компанию</div>
                  <div className="flex gap-1">
                    <div className="w-6 h-2 rounded-sm bg-norm-red" />
                    <div className="w-6 h-2 rounded-sm bg-norm-red" />
                    <div className="w-6 h-2 rounded-sm bg-norm-red" />
                    <div className="w-6 h-2 rounded-sm bg-border" />
                  </div>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <div className="text-xs text-muted-foreground mb-2">Стратегия реагирования</div>
                  <div className="text-sm text-norm-green font-medium">Снижение</div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground mb-2">Потенциальные потери</div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-border p-3">
                  <div className="text-xs text-muted-foreground mb-1">Прямые</div>
                  <div className="text-sm font-bold text-foreground">3 420 000 ₽</div>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <div className="text-xs text-muted-foreground mb-1">Косвенные</div>
                  <div className="text-sm font-bold text-foreground">3 420 000 ₽</div>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <div className="text-xs text-muted-foreground mb-1">Кредитные</div>
                  <div className="text-sm font-bold text-foreground">3 420 000 ₽</div>
                </div>
              </div>
            </div>

            {/* Основания вывода */}
            <div className="rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Основания вывода</h3>
                {(() => {
                  const missing = riskEvidenceAttributes.filter(a => a.status === "missing").length;
                  const unverified = riskEvidenceAttributes.filter(a => a.status === "unverified" || a.status === "outdated").length;
                  if (missing > 0) return (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-norm-red-light text-norm-red text-xs font-medium">
                      <XCircle className="w-3.5 h-3.5" /> Критические поля не заполнены
                    </div>
                  );
                  if (unverified > 0) return (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-norm-yellow-light text-norm-yellow text-xs font-medium">
                      <Clock className="w-3.5 h-3.5" /> Часть данных не подтверждена
                    </div>
                  );
                  return (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-norm-green-light text-norm-green text-xs font-medium">
                      <Check className="w-3.5 h-3.5" /> Данные верифицированы
                    </div>
                  );
                })()}
              </div>

              <div className="space-y-2 mb-4">
                {riskEvidenceAttributes.slice(0, 4).map((attr) => {
                  const stCfg: Record<string, {color: string; icon: typeof Check}> = {
                    verified: { color: "text-norm-green", icon: Check },
                    unverified: { color: "text-norm-orange", icon: Clock },
                    outdated: { color: "text-norm-yellow", icon: Clock },
                    missing: { color: "text-norm-red", icon: XCircle },
                  };
                  const srcCfg: Record<string, {label: string; icon: typeof Bot}> = {
                    agent: { label: "Агент", icon: Bot },
                    registry: { label: "Реестр", icon: FileText },
                    user: { label: "Пользователь", icon: UserIcon },
                    document: { label: "Документ", icon: FileText },
                  };
                  const st = stCfg[attr.status];
                  const src = srcCfg[attr.source];
                  const StI = st.icon;
                  const SrI = src.icon;
                  return (
                    <div key={attr.id} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <StI className={`w-4 h-4 flex-shrink-0 ${st.color}`} />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-foreground">{attr.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">{attr.value}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <SrI className="w-3 h-3" />
                        {src.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setShowDataDrawer(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Shield className="w-4 h-4" />
                Проверить данные
              </button>
            </div>

            {/* Limit utilization */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Утилизация лимита</h3>
                <button onClick={() => setShowLimitDrawer(true)} className="p-1 rounded hover:bg-accent transition-colors">
                  <Maximize2 className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Прямые потери", ...risk.directLoss },
                  { label: "Косвенные потери", ...risk.indirectLoss },
                  { label: "Кредитные потери", ...risk.creditLoss },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-border p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        parseInt(item.percent) > 50 ? "bg-norm-orange-light text-norm-orange" : "bg-norm-green-light text-norm-green"
                      }`}>{item.percent}</span>
                    </div>
                    <div className="text-sm font-bold text-foreground">{item.value}</div>
                    <div className="text-[10px] text-muted-foreground">{item.limit}</div>
                    <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${parseInt(item.percent) > 50 ? "bg-norm-orange" : "bg-primary"}`}
                        style={{ width: item.percent.replace("<", "") }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KRI */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Ключевой индикатор риска</h3>
              <button
                onClick={() => setShowKriDrawer(true)}
                className="w-full rounded-xl border border-border p-4 flex items-center gap-3 hover:bg-accent/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-norm-yellow-light flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-norm-yellow" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-foreground flex items-center gap-1">
                    Превышено сигнальное значение <Info className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <div className="text-xs text-muted-foreground">Необходим анализ и планирование действий владельцем риска</div>
                </div>
                <span className="text-sm font-medium text-norm-green">0,6%</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">Описание риска</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{risk.description}</p>
            </div>

            {/* Risk factors */}
            {risk.riskFactors.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-1">Риск-факторы</h3>
                <p className="text-xs text-muted-foreground mb-3">Это причины, которые могут привести к реализации риска.</p>
                <div className="space-y-2">
                  {risk.riskFactors.map((factor, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-norm-yellow-light flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Info className="w-3 h-3 text-norm-yellow" />
                      </div>
                      <span className="text-sm text-foreground">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Consequences */}
            {risk.consequences.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Возможные последствия</h3>
                <div className="space-y-2">
                  {risk.consequences.map((c, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-norm-red-light flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertTriangle className="w-3 h-3 text-norm-red" />
                      </div>
                      <span className="text-sm text-foreground">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {risk.recommendationsList.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Рекомендации</h3>
                <div className="space-y-0 rounded-xl border border-border overflow-hidden">
                  {risk.recommendationsList.map((rec, i) => (
                    <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? "border-t border-border" : ""}`}>
                      <span className="text-primary">✦</span>
                      <span className="text-sm text-foreground flex-1">{rec.text}</span>
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground border border-border rounded-md px-2 py-1">{rec.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Measures */}
            {risk.measuresList.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Меры</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Текущая эффективность мер</span>
                    <Info className="w-3 h-3 text-muted-foreground" />
                    <span className="font-semibold text-norm-green">48%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Годовая эффективность мер</span>
                    <Info className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Пока нет данных</span>
                  </div>
                </div>
                <div className="space-y-1">
                  {risk.measuresList.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 py-2">
                      <Shield className={`w-5 h-5 flex-shrink-0 ${m.status === "Реализована" ? "text-primary" : "text-muted-foreground"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-foreground">{m.text}</div>
                        <div className="text-xs text-muted-foreground">{m.code} · {m.date}</div>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                        m.status === "Реализована" ? "text-norm-green bg-norm-green-light" : "text-primary bg-primary/10"
                      }`}>{m.status}</span>
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Owner */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Подразделение владельца риска</h3>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{risk.owner}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <button className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors">
                Удалить
              </button>
              <button className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors">
                В архив
              </button>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="w-[240px] border-l border-border px-5 py-6 space-y-5 flex-shrink-0">
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-3">Информация</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-muted-foreground">Риск</span><span className="text-foreground font-medium">RSK-41242001</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Создан</span><span className="text-foreground">{risk.createdAt}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Обновлён</span><span className="text-foreground">{risk.updatedAt}</span></div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Автор</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-norm-green" />
                    <span className="text-foreground">NORM AI</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Источник</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-primary/20" />
                    <span className="text-foreground">{risk.source}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-foreground mb-2">Объект оценки</h4>
              <div className="flex items-center gap-1.5 text-xs">
                <div className="w-3 h-3 rounded-full bg-norm-green" />
                <span className="text-foreground">Проект</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">Петрушкины истории и многое ...</div>
            </div>

            <button className="w-full flex items-center justify-between py-3 border-t border-b border-border text-sm">
              <span className="text-foreground font-medium">История изменений</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between py-3 border-b border-border text-sm">
              <span className="text-foreground font-medium">Добавить меру</span>
              <span className="text-muted-foreground text-lg">+</span>
            </button>
          </div>
        </div>
      </div>

      {/* Drawers */}
      {showLimitDrawer && <LimitDrawer onClose={() => setShowLimitDrawer(false)} />}
      {showKriDrawer && <KriDrawer onClose={() => setShowKriDrawer(false)} />}
      {showDataDrawer && (
        <DataVerificationDrawer
          onClose={() => setShowDataDrawer(false)}
          onOpenProfile={() => { onClose(); navigate({ to: "/profile" }); }}
        />
      )}
    </div>
  );
}
