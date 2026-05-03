import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, SlidersHorizontal, Sparkles, Info, ChevronDown, ChevronRight } from "lucide-react";
import { mockRisks, mockAnalyses } from "../data/mockData";
import { RiskModal } from "../components/RiskModal";
import { AnalysisModal } from "../components/AnalysisModal";
import type { Risk, RiskAnalysis } from "../data/mockData";

export const Route = createFileRoute("/risks")({
  component: RisksPage,
  head: () => ({
    meta: [
      { title: "Риски — НОРМ" },
      { name: "description", content: "Список рисков" },
    ],
  }),
});

const tabs = ["Активные риски", "Анализ рисков", "Архив"] as const;

const counterCards = [
  { label: "Новые риски", count: 4, color: "bg-norm-green", desc: "Норм обнаружил новые риски, можешь ознакомиться с ними." },
  { label: "Высокий уровень риска", count: 1, color: "bg-norm-orange", desc: "Обрати внимание на рекомендации от Норма и прими решения по рискам." },
  { label: "Переоценено", count: 2, color: "bg-norm-coral", desc: "Норм скорректировал оценку риска на основе новых данных." },
];

function RisksPage() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Активные риски");
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<RiskAnalysis | null>(null);
  const [riskFromAnalysis, setRiskFromAnalysis] = useState(false);

  const handleOpenRiskFromAnalysis = () => {
    setRiskFromAnalysis(true);
    setSelectedRisk(mockRisks[0]);
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1100px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">— Все риски</h1>
          <span className="text-lg text-muted-foreground">1002</span>
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-norm-green text-sm font-medium text-norm-green hover:bg-norm-green-light transition-colors">
            <Sparkles className="w-4 h-4" />
            Выявить новые риски
          </button>
          <button className="p-2.5 rounded-xl border border-border hover:bg-accent transition-colors">
            <Search className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:bg-accent transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            Фильтр
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Активные риски" && (
        <>
          {/* Counter cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {counterCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-border p-5 bg-card relative">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{card.label}</h3>
                  <div className={`w-7 h-7 rounded-full ${card.color} text-primary-foreground flex items-center justify-center text-sm font-bold`}>
                    {card.count}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Risk list */}
          <div className="space-y-3">
            {mockRisks.map((risk) => (
              <RiskCard key={risk.id} risk={risk} onClick={() => setSelectedRisk(risk)} />
            ))}
          </div>
        </>
      )}

      {activeTab === "Анализ рисков" && (
        <div className="space-y-3">
          {mockAnalyses.map((analysis) => (
            <AnalysisCard key={analysis.id} analysis={analysis} onClick={() => setSelectedAnalysis(analysis)} />
          ))}
        </div>
      )}

      {activeTab === "Архив" && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-sm">Архив пуст</p>
        </div>
      )}

      {/* FAB */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3">
        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-norm-green text-primary-foreground shadow-lg hover:opacity-90 transition-opacity text-sm font-medium">
          Зарегистрировать риск
        </button>
        <button className="w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center">
          <div className="w-7 h-7 rounded-lg bg-norm-green flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
        </button>
      </div>

      {/* Modals */}
      {selectedRisk && (
        <RiskModal
          risk={selectedRisk}
          onClose={() => {
            setSelectedRisk(null);
            if (riskFromAnalysis) {
              setRiskFromAnalysis(false);
            }
          }}
        />
      )}
      {selectedAnalysis && !selectedRisk && (
        <AnalysisModal
          analysis={selectedAnalysis}
          onClose={() => setSelectedAnalysis(null)}
          onOpenRisk={handleOpenRiskFromAnalysis}
        />
      )}
    </div>
  );
}

function RiskCard({ risk, onClick }: { risk: Risk; onClick: () => void }) {
  const levelColor = risk.level === "Высокий"
    ? "bg-norm-red-light text-norm-red"
    : risk.level === "Средний"
    ? "bg-norm-orange-light text-norm-orange"
    : "bg-norm-green-light text-norm-green";
  const levelDot = risk.level === "Высокий" ? "▲" : risk.level === "Средний" ? "◆" : "●";
  const statusColor = "bg-norm-yellow-light text-norm-yellow";

  return (
    <button onClick={onClick} className="w-full text-left bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs font-medium px-2 py-0.5 rounded ${levelColor} flex items-center gap-1`}>
          <span className="text-[8px]">{levelDot}</span> {risk.level}
        </span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded ${statusColor}`}>{risk.status}</span>
        <span className="ml-auto text-xs text-muted-foreground">{risk.code}</span>
      </div>

      <h3 className="text-sm font-semibold text-foreground mb-3">{risk.title}</h3>

      <div className="grid grid-cols-3 gap-6 mb-3">
        <div>
          <div className="text-xs text-muted-foreground mb-0.5">Потенциальные потери</div>
          <div className="text-sm font-bold text-foreground">{risk.potentialLoss}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-0.5">Фактические потери</div>
          <div className="text-sm font-bold text-foreground">{risk.actualLoss}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-0.5">Стратегия реагирования</div>
          <div className="text-sm font-medium text-foreground border border-border rounded-md px-2 py-0.5 inline-block">{risk.strategy}</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-xs text-muted-foreground">
            <ChevronRight className="w-3 h-3" /> Описание
          </button>
          {risk.recommendations > 0 && (
            <span className="flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">
              <Sparkles className="w-3 h-3" /> Рекомендации: {risk.recommendations}
            </span>
          )}
          {risk.measures > 0 && (
            <span className="text-xs text-muted-foreground border border-border rounded px-2 py-0.5">
              Меры: {risk.measures}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>👥</span>
          <span className="truncate max-w-[250px]">{risk.owner}</span>
        </div>
      </div>
    </button>
  );
}

function AnalysisCard({ analysis, onClick }: { analysis: RiskAnalysis; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full text-left bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-foreground">Анализ рисков</h3>
        <span className="text-xs text-muted-foreground">{analysis.date}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{analysis.summary}</p>
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground">Выявлено: <strong className="text-foreground">{analysis.newCount}</strong></span>
        <span className="text-xs text-muted-foreground">Переоценено: <strong className="text-foreground">{analysis.reassessedCount}</strong></span>
        <span className="text-xs text-muted-foreground">Рисков: <strong className="text-foreground">{analysis.risks.length}</strong></span>
      </div>
    </button>
  );
}
