// 🏭 ЦИФРОВОЙ ЗАВОД - АВТОМАТИЗАЦИЯ АГЕНТОВ И ПРОДАЖ

export interface LeadData {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interestType: 'investment' | 'service' | 'partnership' | 'consultation' | 'document' | 'grease_trap_cleaning' | 'waste_collection' | 'pressure_washing' | 'fat_disposal';
  serviceType?: 'tauku_atdalitaju_tirisana' | 'ellas_savaksana' | 'kanalizacijas_skalosana' | 'tauku_utilizacija' | 'complex_service';
  businessType?: 'restaurant' | 'hotel' | 'factory' | 'shop' | 'office' | 'other';
  urgency: 'low' | 'medium' | 'high' | 'urgent' | 'emergency';
  source: string;
  budget?: number;
  frequency?: 'one_time' | 'monthly' | 'weekly' | 'daily' | 'contract';
  score: number;
  metadata: Record<string, any>;
}

export interface AgentAction {
  action: 'email' | 'call' | 'sms' | 'meeting' | 'document' | 'follow_up';
  delay: number; // minutes
  content: string;
  conditions?: Record<string, any>;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  trigger: string;
  actions: AgentAction[];
  active: boolean;
}

// Автоматический скоринг лидов (УСЛУГИ = ПРИОРИТЕТ!)
export function calculateLeadScore(leadData: LeadData): number {
  console.log('Calculating lead score for:', leadData.name, 'Interest:', leadData.interestType);
  
  let score = 0;

  // 🔥 УСЛУГИ - ОСНОВНОЙ ДОХОД! МАКСИМАЛЬНЫЙ ПРИОРИТЕТ
  const interestScores = {
    grease_trap_cleaning: 120,    // Очистка жироуловителей - топ услуга!
    waste_collection: 115,        // Сбор отходов - регулярный доход
    pressure_washing: 110,        // Промывка канализации - высокая маржа
    fat_disposal: 105,           // Утилизация жиров - специализация
    service: 100,                // Общие услуги
    partnership: 80,             // Партнерство
    consultation: 60,            // Консультации
    investment: 50,              // Инвестиции - вторично!
    document: 20                 // Документы
  };
  score += interestScores[leadData.interestType] || interestScores.service;

  // 🏢 B2B КЛИЕНТЫ - ОСНОВНАЯ АУДИТОРИЯ
  const businessTypeScores = {
    restaurant: 50,     // Рестораны - основные клиенты
    hotel: 45,         // Отели - большие объемы
    factory: 40,       // Заводы - промышленные клиенты
    shop: 30,          // Магазины - средний сегмент
    office: 20,        // Офисы - небольшие потребности
    other: 15
  };
  if (leadData.businessType) {
    score += businessTypeScores[leadData.businessType];
  }

  // 📅 РЕГУЛЯРНОСТЬ - КЛЮЧЕВОЙ ФАКТОР ДОХОДА
  const frequencyScores = {
    contract: 60,      // Контракт - стабильный доход
    monthly: 50,       // Ежемесячно - хорошая периодичность
    weekly: 45,        // Еженедельно - интенсивный клиент
    daily: 40,         // Ежедневно - возможно крупный клиент
    one_time: 20       // Разово - низкая ценность
  };
  if (leadData.frequency) {
    score += frequencyScores[leadData.frequency];
  }

  // 💰 БЮДЖЕТ ДЛЯ УСЛУГ
  if (leadData.budget) {
    if (leadData.budget >= 5000) score += 40;      // Крупный клиент
    else if (leadData.budget >= 2000) score += 30; // Средний клиент  
    else if (leadData.budget >= 1000) score += 20; // Малый клиент
    else if (leadData.budget >= 500) score += 15;  // Микро клиент
    else score += 10;
  }

  // 📊 ПОЛНОТА ДАННЫХ B2B
  if (leadData.phone) score += 15;        // Телефон важен для B2B
  if (leadData.company) score += 25;      // Компания = B2B клиент
  if (leadData.businessType) score += 20; // Тип бизнеса указан

  // 🌐 ИСТОЧНИКИ ТРАФИКА ДЛЯ УСЛУГ
  const serviceSourceScores = {
    'services_page': 50,           // Страница услуг
    'grease_trap_calculator': 45,  // Калькулятор очистки
    'emergency_call': 60,          // Экстренный вызов
    'contact_form': 35,            // Форма контактов
    'google_ads': 40,             // Реклама Google
    'organic_search': 35,          // Органический поиск
    'referral': 50,               // Рекомендации
    'social_media': 25,           // Соцсети
    'roi_calculator': 20,         // ROI калькулятор (инвестиции)
    'investment_page': 15         // Страница инвесторов
  };
  score += serviceSourceScores[leadData.source] || 20;

  // 🚨 ЭКСТРЕННЫЕ СИТУАЦИИ = ВЫСОКИЙ ПРИОРИТЕТ
  if (leadData.metadata?.emergency || leadData.urgency === 'emergency') {
    score += 50; // Экстренные вызовы
  }

  console.log('Services-focused lead score calculated:', score);
  return Math.min(score, 150); // Максимум 150 для услуг
}

// Автоматическое определение срочности (ЭКСТРЕННЫЕ УСЛУГИ!)
export function determineUrgency(leadData: LeadData): 'low' | 'medium' | 'high' | 'urgent' | 'emergency' {
  console.log('Determining urgency for lead:', leadData.id, leadData.interestType);

  // 🚨 ЭКСТРЕННЫЕ СИТУАЦИИ
  if (leadData.metadata?.emergency || 
      leadData.metadata?.urgent_keywords || 
      leadData.interestType === 'pressure_washing' && leadData.metadata?.blocked_drain) {
    return 'emergency';
  }

  const score = calculateLeadScore(leadData);
  
  // УСЛУГИ = БЫСТРАЯ РЕАКЦИЯ НУЖНА
  if (leadData.interestType.includes('service') || 
      ['grease_trap_cleaning', 'waste_collection', 'pressure_washing', 'fat_disposal'].includes(leadData.interestType)) {
    
    if (score >= 120) return 'urgent';    // Крупный B2B клиент
    if (score >= 100) return 'high';      // Хороший B2B клиент  
    if (score >= 80) return 'medium';     // Обычный клиент
    return 'medium';                      // Услуги всегда минимум medium
  }

  // Инвестиции и прочее - стандартная логика
  if (score >= 80) return 'urgent';
  if (score >= 60) return 'high';  
  if (score >= 40) return 'medium';
  return 'low';
}

// Отправка данных в n8n для автоматизации
export async function sendToDigitalFactory(leadData: LeadData, workflow: string = 'lead_processing') {
  console.log('Sending to digital factory:', leadData.id, workflow);

  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK;
  
  if (!webhookUrl) {
    console.warn('Digital factory webhook not configured');
    return { success: false, error: 'Webhook not configured' };
  }

  const payload = {
    workflow,
    lead: {
      ...leadData,
      score: calculateLeadScore(leadData),
      urgency: determineUrgency(leadData),
      created_at: new Date().toISOString(),
      source_site: 'metan.lv'
    },
    automation: {
      trigger_immediate: leadData.interestType === 'investment',
      send_welcome_email: true,
      assign_agent: leadData.interestType === 'investment' || leadData.score >= 70,
      schedule_follow_up: true,
      add_to_crm: true
    }
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Source': 'metan-lv-website'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Digital factory response:', result);
      return { success: true, data: result };
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error sending to digital factory:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Автоматическое назначение агентов (УСЛУГИ ПРИОРИТЕТ!)
export async function assignAgent(leadData: LeadData) {
  console.log('Auto-assigning agent for lead:', leadData.id, leadData.interestType);

  const serviceAgentRules = {
    // 🔧 ТЕХНИЧЕСКИЕ УСЛУГИ - MAKSIMS (главный по услугам)
    grease_trap_cleaning: {
      primary: 'maksims@zepenergija.lv',
      backup: 'aleksejs.karalkins@zepenergija.lv',
      telegram: '@maksims_services',
      phone: '+371 27727752'
    },
    waste_collection: {
      primary: 'maksims@zepenergija.lv', 
      backup: 'ilona@ecologica.lv',
      telegram: '@maksims_services'
    },
    pressure_washing: {
      primary: 'maksims@zepenergija.lv',
      backup: 'aleksejs.karalkins@zepenergija.lv',
      telegram: '@maksims_emergency'  // Экстренные вызовы
    },
    fat_disposal: {
      primary: 'ilona@ecologica.lv',    // Ecologica - утилизация
      backup: 'maksims@zepenergija.lv',
      telegram: '@ilona_ecology'
    },
    
    // 💼 ПРОДАЖИ И ПАРТНЕРСТВА - ALEKSEJS
    service: {
      primary: 'aleksejs.karalkins@zepenergija.lv',
      backup: 'maksims@zepenergija.lv'
    },
    partnership: {
      primary: 'aleksejs.karalkins@zepenergija.lv',
      backup: 'natalja.geisari@gmail.com'
    },
    consultation: {
      primary: 'aleksejs.karalkins@zepenergija.lv',
      backup: 'ilona@ecologica.lv'
    },
    
    // 💰 ИНВЕСТИЦИИ - ALEKSEJS (вторичный приоритет)
    investment: {
      primary: 'aleksejs.karalkins@zepenergija.lv',
      backup: 'genadijs@zepenergija.lv',
      telegram: '@aleksejs_investment'
    }
  };

  const agent = serviceAgentRules[leadData.interestType] || serviceAgentRules.service;
  
  // 🚨 ЭКСТРЕННЫЕ УСЛУГИ - ДУБЛИРУЕМ ВСЕМ
  if (leadData.urgency === 'emergency') {
    await Promise.all([
      sendAgentNotification(agent.primary, leadData),
      sendAgentNotification(agent.backup || 'aleksejs.karalkins@zepenergija.lv', leadData),
      sendTelegramAlert(leadData) // Telegram для экстренных
    ]);
  } else {
    await sendAgentNotification(agent.primary, leadData);
  }
  
  return agent;
}

// Отправка уведомлений агентам
export async function sendAgentNotification(agentEmail: string, leadData: LeadData) {
  console.log('Sending agent notification to:', agentEmail);

  const notificationData = {
    to: agentEmail,
    subject: `🚨 Новый ${leadData.urgency} лид: ${leadData.name} - ${leadData.interestType}`,
    template: 'agent_notification',
    data: {
      lead: leadData,
      urgency_emoji: {
        urgent: '🔥',
        high: '⚡',
        medium: '📋',
        low: '📝'
      }[leadData.urgency],
      action_required: leadData.urgency === 'urgent' ? 'Немедленно' : 'В течение часа'
    }
  };

  // Отправляем через API
  try {
    const response = await fetch('/api/send-agent-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notificationData)
    });

    if (response.ok) {
      console.log('Agent notification sent successfully');
      return { success: true };
    }
  } catch (error) {
    console.error('Error sending agent notification:', error);
  }

  return { success: false };
}

// Автоматические follow-up последовательности
export async function scheduleFollowUp(leadData: LeadData) {
  console.log('Scheduling follow-up for lead:', leadData.id);

  const followUpSequences = {
    investment: [
      { delay: 5, action: 'email', content: 'welcome_investor' },
      { delay: 60, action: 'call', content: 'initial_consultation' },
      { delay: 1440, action: 'email', content: 'detailed_proposal' },
      { delay: 4320, action: 'follow_up', content: 'decision_reminder' }
    ],
    service: [
      { delay: 10, action: 'email', content: 'service_welcome' },
      { delay: 120, action: 'call', content: 'service_consultation' },
      { delay: 2880, action: 'email', content: 'service_proposal' }
    ],
    consultation: [
      { delay: 15, action: 'email', content: 'consultation_welcome' },
      { delay: 1440, action: 'follow_up', content: 'consultation_reminder' }
    ]
  };

  const sequence = followUpSequences[leadData.interestType] || followUpSequences.consultation;

  // Отправляем расписание в цифровой завод
  const scheduleData = {
    lead_id: leadData.id,
    sequence,
    start_time: new Date().toISOString()
  };

  return await sendToDigitalFactory({
    ...leadData,
    metadata: { ...leadData.metadata, follow_up_sequence: scheduleData }
  }, 'schedule_follow_up');
}

// Интеграция с Telegram для мгновенных уведомлений
export async function sendTelegramAlert(leadData: LeadData) {
  console.log('Sending Telegram alert for urgent lead:', leadData.id);

  const telegramBotToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  if (!telegramBotToken || !telegramChatId) {
    console.log('Telegram not configured');
    return { success: false };
  }

  const message = `🔥 СРОЧНЫЙ ЛИДЕАД НА METAN.LV!

👤 ${leadData.name}
📧 ${leadData.email}
📞 ${leadData.phone || 'Не указан'}
🏢 ${leadData.company || 'Частное лицо'}
💰 Тип: ${leadData.interestType}
📊 Скор: ${leadData.score}
⏱️ Срочность: ${leadData.urgency}

🎯 Требует немедленного внимания!`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (response.ok) {
      console.log('Telegram alert sent successfully');
      return { success: true };
    }
  } catch (error) {
    console.error('Error sending Telegram alert:', error);
  }

  return { success: false };
}

// Основная функция обработки лида
export async function processLead(leadData: LeadData) {
  console.log('Processing lead through digital factory:', leadData.id);

  const results = {
    score: calculateLeadScore(leadData),
    urgency: determineUrgency(leadData),
    agent: null as any,
    digitalFactory: null as any,
    telegram: null as any,
    followUp: null as any
  };

  // Обновляем данные лида
  leadData.score = results.score;
  leadData.urgency = results.urgency;

  try {
    // 1. Отправляем в цифровой завод
    results.digitalFactory = await sendToDigitalFactory(leadData);

    // 2. Назначаем агента
    results.agent = await assignAgent(leadData);

    // 3. Если срочный лид - отправляем Telegram уведомление
    if (results.urgency === 'urgent' || results.score >= 80) {
      results.telegram = await sendTelegramAlert(leadData);
    }

    // 4. Планируем follow-up
    results.followUp = await scheduleFollowUp(leadData);

    console.log('Lead processing completed:', results);
    return results;
  } catch (error) {
    console.error('Error processing lead:', error);
    return { ...results, error: error.message };
  }
}

// Аналитика производительности агентов
export async function trackAgentPerformance(agentEmail: string, action: string, leadId: string) {
  console.log('Tracking agent performance:', agentEmail, action, leadId);

  const performanceData = {
    agent: agentEmail,
    action,
    lead_id: leadId,
    timestamp: new Date().toISOString(),
    source: 'metan.lv'
  };

  // Отправляем в аналитику
  try {
    await fetch('/api/agent-analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(performanceData)
    });
  } catch (error) {
    console.log('Analytics tracking failed:', error);
  }
}