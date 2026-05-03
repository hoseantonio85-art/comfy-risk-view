export interface Risk {
  id: string;
  code: string;
  level: "Высокий" | "Средний" | "Низкий";
  status: "Новый" | "Активен" | "Уровень вырос";
  title: string;
  potentialLoss: string;
  actualLoss: string;
  strategy: string;
  owner: string;
  description: string;
  recommendations: number;
  measures: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  source: string;
  riskFactors: string[];
  consequences: string[];
  recommendationsList: { text: string; action: string }[];
  measuresList: { text: string; code: string; date: string; status: string }[];
  directLoss: { value: string; limit: string; percent: string };
  indirectLoss: { value: string; limit: string; percent: string };
  creditLoss: { value: string; limit: string; percent: string };
}

export const mockRisks: Risk[] = [
  {
    id: "1",
    code: "RSC-426846648",
    level: "Высокий",
    status: "Новый",
    title: "Прекращение поставок сырья из-за санкций или логистических проблем",
    potentialLoss: "1 502 620 ₽",
    actualLoss: "1 502 620 ₽",
    strategy: "Снизить",
    owner: 'ООО "Тестовая компания" / ... / Отдел технического сопровождения',
    description: "Ранее сегодня было отправлено 5 предупреждений о том, что SQS службы расчета заработной платы превысил пороговое значение. Быстрое расследование показало, что события о выплатах сотрудникам не срабатывают, а пользователи не могут войти в систему. Я определил приоритет как критический, потому что это день выплаты зарплаты.",
    recommendations: 2,
    measures: 2,
    category: "Риск информационной безопасности",
    createdAt: "01 февраля 2024",
    updatedAt: "01 февраля 2024",
    author: "NORM AI",
    source: "АС Сенат",
    riskFactors: [
      "Нарушение регламентов защиты данных в условиях ужесточения требований ФЗ-420",
      "Зависимость от стабильности работы IT-инфраструктуры",
    ],
    consequences: [
      "Штраф в размере до 5 000 000 руб. или до 4% годового оборота",
      "Репутационные потери и отток клиентов",
      "Судебные иски от пострадавших клиентов",
      "Временная приостановка лицензии на деятельность",
    ],
    recommendationsList: [
      { text: "Внедрить автоматизированную систему контроля температурного режима", action: "Снизить риск" },
      { text: "Провести обучение персонала по санитарным нормам", action: "Снизить риск" },
      { text: "Разработать регламент внутренних проверок", action: "Снизить риск" },
    ],
    measuresList: [
      { text: "Проведение тестирования на проникновение внешним подрядчиком", code: "MSR-171185", date: "Плановая дата: 05.03.2024", status: "Новая" },
      { text: "Обновление политики парольной защиты", code: "MSR-171185", date: "Фактическая дата: 15.01.2024", status: "Реализована" },
      { text: "Сегментация сети и разграничение доступа к базам данных", code: "MSR-171185", date: "Фактическая дата: 28.01.2024", status: "Реализована" },
      { text: "Внедрение двухфакторной аутентификации для всех сотрудников", code: "MSR-171185", date: "Фактическая дата: 10.02.2024", status: "Реализована" },
      { text: "Шифрование данных в состоянии покоя", code: "MSR-171185", date: "Фактическая дата: 20.02.2024", status: "Реализована" },
    ],
    directLoss: { value: "1 340 500 ₽", limit: "12 000 000 ₽", percent: "11%" },
    indirectLoss: { value: "4 300 000 ₽", limit: "6 000 000 ₽", percent: "72%" },
    creditLoss: { value: "250 500 ₽", limit: "1 000 000 000 ₽", percent: "<1%" },
  },
  {
    id: "2",
    code: "RSC-426846648",
    level: "Средний",
    status: "Новый",
    title: "Прекращение поставок сырья из-за санкций или логистических проблем",
    potentialLoss: "1 502 620 ₽",
    actualLoss: "1 502 620 ₽",
    strategy: "Снизить",
    owner: 'ООО "Тестовая компания" / ... / Отдел технического сопровождения',
    description: "Описание риска среднего уровня.",
    recommendations: 0,
    measures: 2,
    category: "Риск информационной безопасности",
    createdAt: "01 февраля 2024",
    updatedAt: "01 февраля 2024",
    author: "NORM AI",
    source: "АС Сенат",
    riskFactors: [
      "Нарушение регламентов защиты данных в условиях ужесточения требований ФЗ-420",
      "Зависимость от стабильности работы IT-инфраструктуры",
    ],
    consequences: [
      "Штраф в размере до 5 000 000 руб. или до 4% годового оборота",
      "Репутационные потери и отток клиентов",
    ],
    recommendationsList: [],
    measuresList: [
      { text: "Обновление политики парольной защиты", code: "MSR-171185", date: "Фактическая дата: 15.01.2024", status: "Реализована" },
      { text: "Сегментация сети и разграничение доступа к базам данных", code: "MSR-171185", date: "Фактическая дата: 28.01.2024", status: "Реализована" },
    ],
    directLoss: { value: "1 340 500 ₽", limit: "12 000 000 ₽", percent: "11%" },
    indirectLoss: { value: "4 300 000 ₽", limit: "6 000 000 ₽", percent: "72%" },
    creditLoss: { value: "250 500 ₽", limit: "1 000 000 000 ₽", percent: "<1%" },
  },
  {
    id: "3",
    code: "RSC-426846648",
    level: "Средний",
    status: "Новый",
    title: "Прекращение поставок сырья из-за санкций или логистических проблем",
    potentialLoss: "1 502 620 ₽",
    actualLoss: "1 502 620 ₽",
    strategy: "Снизить",
    owner: 'ООО "Тестовая компания" / ... / Отдел технического сопровождения',
    description: "Описание третьего риска.",
    recommendations: 0,
    measures: 0,
    category: "Риск информационной безопасности",
    createdAt: "01 февраля 2024",
    updatedAt: "01 февраля 2024",
    author: "NORM AI",
    source: "АС Сенат",
    riskFactors: [],
    consequences: [],
    recommendationsList: [],
    measuresList: [],
    directLoss: { value: "1 340 500 ₽", limit: "12 000 000 ₽", percent: "11%" },
    indirectLoss: { value: "4 300 000 ₽", limit: "6 000 000 ₽", percent: "72%" },
    creditLoss: { value: "250 500 ₽", limit: "1 000 000 000 ₽", percent: "<1%" },
  },
];

export interface RiskAnalysis {
  id: string;
  newCount: number;
  reassessedCount: number;
  documentsUsed: number;
  date: string;
  time: string;
  author: string;
  summary: string;
  risks: {
    id: string;
    code: string;
    date: string;
    status: string;
    level: "Высокий" | "Средний" | "Низкий";
    title: string;
    recommendations: { text: string; action: string }[];
  }[];
}

export const mockAnalyses: RiskAnalysis[] = [
  {
    id: "1",
    newCount: 3,
    reassessedCount: 5,
    documentsUsed: 5,
    date: "20.02.2024",
    time: "20:24",
    author: "Преображенская-...",
    summary: "Основные угрозы сосредоточены вокруг слабых процессов обеспечения информационной безопасности, недостатков в управлении рисками информационных активов и защиты персональных данных, а также несоблюдения требований регуляторов (ФЗ-152).",
    risks: [
      {
        id: "r1",
        code: "RSC-171185",
        date: "20.02.2024",
        status: "Новый",
        level: "Высокий",
        title: "Штрафные санкции со стороны Роспотребнадзора за нарушение санитарных ...",
        recommendations: [
          { text: "Внедрить автоматизированную систему контроля температурного режима", action: "Снизить риск" },
          { text: "Разработать регламент внутренних проверок", action: "Снизить риск" },
        ],
      },
      {
        id: "r2",
        code: "RSC-171185",
        date: "20.02.2024",
        status: "Новый",
        level: "Высокий",
        title: "Штрафные санкции со стороны Роспотребнадзора за нарушение санитарных ...",
        recommendations: [],
      },
      {
        id: "r3",
        code: "RSC-171185",
        date: "20.02.2024",
        status: "Уровень вырос",
        level: "Высокий",
        title: "Штрафные санкции со стороны Роспотребнадзора за нарушение санитарных норм",
        recommendations: [],
      },
    ],
  },
  {
    id: "2",
    newCount: 1,
    reassessedCount: 3,
    documentsUsed: 2,
    date: "15.02.2024",
    time: "14:10",
    author: "Михайлова Е.",
    summary: "Выявлены риски, связанные с нарушением законодательства о персональных данных.",
    risks: [
      {
        id: "r4",
        code: "RSC-171186",
        date: "15.02.2024",
        status: "Новый",
        level: "Средний",
        title: "Нарушение требований ФЗ-152 при обработке персональных данных",
        recommendations: [],
      },
    ],
  },
];
