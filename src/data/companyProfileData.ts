// Mock data for Company Profile

export interface ProfileAttribute {
  id: string;
  name: string;
  value: string;
  status: "verified" | "unverified" | "outdated" | "missing";
  source: "agent" | "registry" | "user" | "document";
  updatedAt: string;
  suggestion?: {
    oldValue: string;
    newValue: string;
    reason: string;
    source: string;
  };
  riskImpact?: string;
}

export interface ProfileArea {
  id: string;
  icon: string;
  name: string;
  state: "reliable" | "attention" | "critical" | "empty";
  filledPercent: number;
  description: string;
  updatedAgo?: string;
  pendingCount?: number;
  emptyReason?: string;
  whyImportant?: string;
  attributes: ProfileAttribute[];
}

export interface NormUpdate {
  id: string;
  attributeName: string;
  oldValue: string;
  newValue: string;
  source: string;
  riskImpact?: string;
  date: string;
}

export const companyName = 'ООО "Тестовая компания"';

export const profileAreas: ProfileArea[] = [
  {
    id: "finance",
    icon: "TrendingUp",
    name: "Финансы",
    state: "reliable",
    filledPercent: 92,
    description: "Финансовые показатели, отчётность, кредитная история",
    updatedAgo: "2 дня назад",
    attributes: [
      { id: "f1", name: "Годовая выручка", value: "1 245 000 000 ₽", status: "verified", source: "registry", updatedAt: "28.04.2026" },
      { id: "f2", name: "Чистая прибыль", value: "187 500 000 ₽", status: "verified", source: "registry", updatedAt: "28.04.2026" },
      { id: "f3", name: "Кредитный рейтинг", value: "BBB+", status: "unverified", source: "agent", updatedAt: "15.03.2026", suggestion: { oldValue: "BBB", newValue: "BBB+", reason: "Обновление рейтинга агентством АКРА от 12.03.2026", source: "АКРА" } },
      { id: "f4", name: "Долговая нагрузка", value: "Debt/EBITDA = 2.1x", status: "verified", source: "document", updatedAt: "20.04.2026" },
    ],
  },
  {
    id: "corporate",
    icon: "Building2",
    name: "Корпоративное управление",
    state: "attention",
    filledPercent: 68,
    description: "Структура управления, учредители, бенефициары",
    pendingCount: 3,
    attributes: [
      { id: "c1", name: "Генеральный директор", value: "Иванов А.С.", status: "verified", source: "registry", updatedAt: "01.02.2026" },
      { id: "c2", name: "Учредители", value: "3 юридических лица", status: "unverified", source: "agent", updatedAt: "10.04.2026", suggestion: { oldValue: "2 юридических лица", newValue: "3 юридических лица", reason: "Выявлен новый участник по данным ЕГРЮЛ", source: "ЕГРЮЛ" }, riskImpact: "Кредитный риск" },
      { id: "c3", name: "Совет директоров", value: "5 членов", status: "outdated", source: "document", updatedAt: "15.06.2025" },
    ],
  },
  {
    id: "operations",
    icon: "Settings",
    name: "Операционная деятельность",
    state: "reliable",
    filledPercent: 85,
    description: "Продукты, процессы, основные контрагенты",
    updatedAgo: "5 дней назад",
    attributes: [
      { id: "o1", name: "Основной вид деятельности", value: "Оптовая торговля", status: "verified", source: "registry", updatedAt: "01.01.2026" },
      { id: "o2", name: "Количество сотрудников", value: "1 250", status: "verified", source: "user", updatedAt: "20.03.2026" },
    ],
  },
  {
    id: "regulatory",
    icon: "Scale",
    name: "Регуляторика",
    state: "critical",
    filledPercent: 35,
    description: "Лицензии, разрешения, нормативные требования",
    pendingCount: 5,
    attributes: [
      { id: "r1", name: "Лицензия ЦБ", value: "", status: "missing", source: "agent", updatedAt: "" },
      { id: "r2", name: "Соответствие ФЗ-152", value: "Не проверено", status: "missing", source: "agent", updatedAt: "", riskImpact: "Операционный риск" },
    ],
  },
  {
    id: "counterparties",
    icon: "Users",
    name: "Контрагенты",
    state: "attention",
    filledPercent: 55,
    description: "Ключевые партнёры, поставщики, клиенты",
    pendingCount: 2,
    attributes: [
      { id: "cp1", name: "Основные поставщики", value: "12 контрагентов", status: "verified", source: "document", updatedAt: "10.04.2026" },
      { id: "cp2", name: "Крупнейшие клиенты", value: "8 контрагентов", status: "unverified", source: "agent", updatedAt: "25.03.2026" },
    ],
  },
  {
    id: "risks_incidents",
    icon: "AlertTriangle",
    name: "Риски и инциденты",
    state: "empty",
    filledPercent: 0,
    description: "История инцидентов, реестр рисков, страховые случаи",
    emptyReason: "Нет данных об инцидентах и исторических рисках",
    whyImportant: "Без истории инцидентов система не может оценить вероятность повторения рисков",
    attributes: [],
  },
];

export const normUpdates: NormUpdate[] = [
  { id: "u1", attributeName: "Кредитный рейтинг", oldValue: "BBB", newValue: "BBB+", source: "АКРА", riskImpact: "Кредитный риск", date: "03.05.2026" },
  { id: "u2", attributeName: "Учредители", oldValue: "2 юридических лица", newValue: "3 юридических лица", source: "ЕГРЮЛ", riskImpact: "Кредитный риск", date: "02.05.2026" },
  { id: "u3", attributeName: "Адрес регистрации", oldValue: "г. Москва, ул. Тверская, 12", newValue: "г. Москва, ул. Тверская, 12, стр. 2", source: "ЕГРЮЛ", date: "01.05.2026" },
  { id: "u4", attributeName: "Количество филиалов", oldValue: "5", newValue: "7", source: "ФНС", date: "30.04.2026" },
];

// Evidence data for risk modal
export const riskEvidenceAttributes: ProfileAttribute[] = [
  { id: "e1", name: "Кредитный рейтинг", value: "BBB+", status: "unverified", source: "agent", updatedAt: "15.03.2026", riskImpact: "Кредитный риск" },
  { id: "e2", name: "Долговая нагрузка", value: "Debt/EBITDA = 2.1x", status: "verified", source: "document", updatedAt: "20.04.2026" },
  { id: "e3", name: "Лицензия ЦБ", value: "—", status: "missing", source: "agent", updatedAt: "", riskImpact: "Операционный риск" },
  { id: "e4", name: "Соответствие ФЗ-152", value: "Не проверено", status: "outdated", source: "agent", updatedAt: "10.01.2025" },
];
