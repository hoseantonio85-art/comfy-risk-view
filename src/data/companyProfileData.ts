// Company Profile data with subsections

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

export interface ProfileSubsection {
  id: string;
  name: string;
  attributes: ProfileAttribute[];
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
  subsections: ProfileSubsection[];
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
    description: "Финансовые показатели, судебная и претензионная нагрузка",
    updatedAgo: "2 дня назад",
    subsections: [
      {
        id: "fin-profile",
        name: "Финансовый профиль",
        attributes: [
          { id: "f1", name: "Годовая выручка", value: "1 245 000 000 ₽", status: "verified", source: "registry", updatedAt: "28.04.2026" },
          { id: "f2", name: "Чистая прибыль", value: "187 500 000 ₽", status: "verified", source: "registry", updatedAt: "28.04.2026" },
          { id: "f3", name: "Кредитный рейтинг", value: "BBB+", status: "unverified", source: "agent", updatedAt: "15.03.2026", suggestion: { oldValue: "BBB", newValue: "BBB+", reason: "Обновление рейтинга агентством АКРА от 12.03.2026", source: "АКРА" } },
          { id: "f4", name: "Долговая нагрузка", value: "Debt/EBITDA = 2.1x", status: "verified", source: "document", updatedAt: "20.04.2026" },
          { id: "f5", name: "Совокупные активы", value: "3 870 000 000 ₽", status: "verified", source: "registry", updatedAt: "28.04.2026" },
          { id: "f6", name: "Дебиторская задолженность", value: "245 000 000 ₽", status: "verified", source: "document", updatedAt: "20.04.2026" },
          { id: "f7", name: "Кредиторская задолженность", value: "180 000 000 ₽", status: "verified", source: "document", updatedAt: "20.04.2026" },
        ],
      },
      {
        id: "fin-legal",
        name: "Судебная нагрузка",
        attributes: [
          { id: "fl1", name: "Исполнительные производства", value: "2 (завершены)", status: "verified", source: "registry", updatedAt: "10.04.2026" },
          { id: "fl2", name: "Арбитражные дела", value: "1 активное", status: "unverified", source: "agent", updatedAt: "05.04.2026" },
          { id: "fl3", name: "Банкротство", value: "Нет", status: "verified", source: "registry", updatedAt: "28.04.2026" },
          { id: "fl4", name: "Залоги", value: "Нет", status: "verified", source: "registry", updatedAt: "28.04.2026" },
        ],
      },
    ],
  },
  {
    id: "governance",
    icon: "Building2",
    name: "Управление",
    state: "attention",
    filledPercent: 68,
    description: "Учредители, корпоративное управление, оргструктура",
    pendingCount: 3,
    subsections: [
      {
        id: "gov-founders",
        name: "Учредители и управление",
        attributes: [
          { id: "c1", name: "Генеральный директор", value: "Иванов А.С.", status: "verified", source: "registry", updatedAt: "01.02.2026" },
          { id: "c2", name: "Учредители", value: "3 юридических лица", status: "unverified", source: "agent", updatedAt: "10.04.2026", suggestion: { oldValue: "2 юридических лица", newValue: "3 юридических лица", reason: "Выявлен новый участник по данным ЕГРЮЛ", source: "ЕГРЮЛ" }, riskImpact: "Кредитный риск" },
          { id: "c3", name: "Совет директоров", value: "5 членов", status: "outdated", source: "document", updatedAt: "15.06.2025" },
          { id: "c4", name: "Устав", value: "Редакция от 12.01.2025", status: "verified", source: "document", updatedAt: "12.01.2025" },
          { id: "c5", name: "Матрица полномочий", value: "", status: "missing", source: "agent", updatedAt: "" },
        ],
      },
      {
        id: "gov-org",
        name: "Оргструктура и персонал",
        attributes: [
          { id: "co1", name: "Количество сотрудников", value: "1 250", status: "verified", source: "user", updatedAt: "20.03.2026" },
          { id: "co2", name: "Ключевые менеджеры", value: "7 человек", status: "verified", source: "document", updatedAt: "01.03.2026" },
          { id: "co3", name: "Текучесть кадров", value: "12% годовых", status: "unverified", source: "agent", updatedAt: "15.03.2026" },
        ],
      },
    ],
  },
  {
    id: "products",
    icon: "Package",
    name: "Продукты и стратегия",
    state: "reliable",
    filledPercent: 85,
    description: "Продукты, услуги, стратегический контекст",
    updatedAgo: "5 дней назад",
    subsections: [
      {
        id: "prod-products",
        name: "Продукты и услуги",
        attributes: [
          { id: "o1", name: "Основной вид деятельности", value: "Оптовая торговля", status: "verified", source: "registry", updatedAt: "01.01.2026" },
          { id: "o2", name: "Ключевые продукты", value: "Промышленное оборудование", status: "verified", source: "user", updatedAt: "20.03.2026" },
          { id: "o3", name: "Бренды", value: "3 зарегистрированных", status: "verified", source: "registry", updatedAt: "15.02.2026" },
        ],
      },
      {
        id: "prod-strategy",
        name: "Стратегический контекст",
        attributes: [
          { id: "os1", name: "Стратегия развития", value: "Экспансия в регионы", status: "verified", source: "document", updatedAt: "01.02.2026" },
          { id: "os2", name: "Ключевые контрагенты", value: "12 контрагентов", status: "verified", source: "document", updatedAt: "10.04.2026" },
          { id: "os3", name: "Крупнейшие клиенты", value: "8 контрагентов", status: "unverified", source: "agent", updatedAt: "25.03.2026" },
          { id: "os4", name: "ESG-рейтинг", value: "Не оценен", status: "missing", source: "agent", updatedAt: "" },
        ],
      },
    ],
  },
  {
    id: "regulatory",
    icon: "Scale",
    name: "Регуляторика",
    state: "critical",
    filledPercent: 35,
    description: "Лицензии, санкции, мониторинг событий, общая информация",
    pendingCount: 5,
    subsections: [
      {
        id: "reg-profile",
        name: "Регуляторный профиль",
        attributes: [
          { id: "r1", name: "Лицензия ЦБ", value: "", status: "missing", source: "agent", updatedAt: "" },
          { id: "r2", name: "Соответствие ФЗ-152", value: "Не проверено", status: "missing", source: "agent", updatedAt: "", riskImpact: "Операционный риск" },
          { id: "r3", name: "Санкционные списки", value: "Не найден", status: "verified", source: "agent", updatedAt: "01.05.2026" },
          { id: "r4", name: "Реестр недобросовестных поставщиков", value: "Не найден", status: "verified", source: "registry", updatedAt: "01.05.2026" },
        ],
      },
      {
        id: "reg-monitoring",
        name: "Мониторинг событий",
        attributes: [
          { id: "rm1", name: "Изменения в ЕГРЮЛ", value: "Последнее: 10.04.2026", status: "unverified", source: "agent", updatedAt: "10.04.2026" },
          { id: "rm2", name: "Алерты СМИ", value: "0 за последний месяц", status: "verified", source: "agent", updatedAt: "03.05.2026" },
        ],
      },
      {
        id: "reg-general",
        name: "Общая информация",
        attributes: [
          { id: "rg1", name: "ИНН", value: "7707123456", status: "verified", source: "registry", updatedAt: "01.01.2026" },
          { id: "rg2", name: "ОГРН", value: "1037700012345", status: "verified", source: "registry", updatedAt: "01.01.2026" },
          { id: "rg3", name: "ОКВЭД", value: "46.69 — Торговля оптовая прочая", status: "verified", source: "registry", updatedAt: "01.01.2026" },
          { id: "rg4", name: "Адрес регистрации", value: "г. Москва, ул. Тверская, 12, стр. 2", status: "verified", source: "registry", updatedAt: "01.05.2026" },
        ],
      },
    ],
  },
  {
    id: "assets_it",
    icon: "Server",
    name: "Активы и ИТ",
    state: "attention",
    filledPercent: 55,
    description: "Активы, интеллектуальная собственность, ИТ и кибербезопасность",
    pendingCount: 2,
    subsections: [
      {
        id: "assets-ip",
        name: "Активы и ИС",
        attributes: [
          { id: "a1", name: "Объекты недвижимости", value: "3 объекта", status: "verified", source: "registry", updatedAt: "15.03.2026" },
          { id: "a2", name: "Патенты", value: "2 действующих", status: "verified", source: "registry", updatedAt: "01.02.2026" },
          { id: "a3", name: "Товарные знаки", value: "5 зарегистрированных", status: "verified", source: "registry", updatedAt: "01.02.2026" },
        ],
      },
      {
        id: "assets-it",
        name: "ИТ и кибербезопасность",
        attributes: [
          { id: "it1", name: "Зрелость ИБ", value: "", status: "missing", source: "agent", updatedAt: "" },
          { id: "it2", name: "Инциденты ИБ", value: "0 за последний год", status: "unverified", source: "agent", updatedAt: "01.04.2026" },
          { id: "it3", name: "DR-план", value: "Не подтверждён", status: "unverified", source: "agent", updatedAt: "01.03.2026" },
        ],
      },
    ],
  },
  {
    id: "risks_ops",
    icon: "AlertTriangle",
    name: "Риски и операции",
    state: "empty",
    filledPercent: 0,
    description: "Профиль операционного риска, КРИ, инциденты, контроли",
    emptyReason: "Нет данных об операционных рисках и инцидентах",
    whyImportant: "Без истории инцидентов система не может оценить вероятность повторения рисков",
    subsections: [
      {
        id: "riskops-rcsa",
        name: "RCSA и КРИ",
        attributes: [],
      },
      {
        id: "riskops-incidents",
        name: "Потери и инциденты",
        attributes: [],
      },
      {
        id: "riskops-controls",
        name: "Процессы и контроли",
        attributes: [],
      },
    ],
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

// Evidence source sections for risk modal drawer
export interface EvidenceSource {
  id: string;
  name: string;
  attributes: ProfileAttribute[];
}

export const riskEvidenceSources: EvidenceSource[] = [
  {
    id: "ev-finance",
    name: "Финансовый профиль",
    attributes: [
      { id: "ef1", name: "Годовая выручка", value: "1 245 000 000 ₽", status: "verified", source: "registry", updatedAt: "28.04.2026" },
      { id: "ef2", name: "Чистая прибыль", value: "187 500 000 ₽", status: "verified", source: "registry", updatedAt: "28.04.2026" },
      { id: "ef3", name: "Кредитный рейтинг", value: "BBB+", status: "unverified", source: "agent", updatedAt: "15.03.2026", suggestion: { oldValue: "BBB", newValue: "BBB+", reason: "Обновление рейтинга агентством АКРА", source: "АКРА" } },
      { id: "ef4", name: "Долговая нагрузка", value: "Debt/EBITDA = 2.1x", status: "verified", source: "document", updatedAt: "20.04.2026" },
    ],
  },
  {
    id: "ev-regulatory",
    name: "Регуляторика",
    attributes: [
      { id: "er1", name: "Лицензия ЦБ", value: "—", status: "missing", source: "agent", updatedAt: "", riskImpact: "Операционный риск" },
      { id: "er2", name: "Соответствие ФЗ-152", value: "Не проверено", status: "missing", source: "agent", updatedAt: "", riskImpact: "Операционный риск" },
    ],
  },
  {
    id: "ev-legal",
    name: "Судебная нагрузка",
    attributes: [
      { id: "el1", name: "Арбитражные дела", value: "1 активное", status: "unverified", source: "agent", updatedAt: "05.04.2026" },
      { id: "el2", name: "Исполнительные производства", value: "2 (завершены)", status: "verified", source: "registry", updatedAt: "10.04.2026" },
    ],
  },
];
