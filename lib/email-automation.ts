/**
 * Email Automation система для METAN.LV
 * Автоматизация email уведомлений и последующих действий
 */

// Типы email уведомлений
export type EmailNotificationType = 
  | 'consultation_request'
  | 'quick_order'
  | 'investor_interest'
  | 'document_request'
  | 'contact_form'
  | 'thank_you_followup'
  | 'service_reminder'
  | 'newsletter_signup';

// Интерфейс для email данных
interface EmailNotificationData {
  type: EmailNotificationType;
  recipient: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  };
  content: {
    subject: string;
    templateId: string;
    variables: Record<string, any>;
  };
  scheduling?: {
    sendAt?: Date;
    followUpSequence?: boolean;
  };
  metadata: {
    source: string;
    conversion_value: number;
    user_id?: string;
    form_data?: Record<string, any>;
  };
}

// Шаблоны email уведомлений
const emailTemplates = {
  consultation_request: {
    subject: 'Paldies par konsultācijas pieprasījumu! | METAN.LV',
    templateId: 'consultation_confirmation',
    variables: {
      greeting: 'Sveiki',
      service_type: 'konsultācija',
      response_time: '24 stundu laikā',
      contact_phone: '+371 27727724',
      contact_email: 'tsv@metan.lv'
    }
  },
  quick_order: {
    subject: 'Jūsu pakalpojuma pieprasījums saņemts! | METAN.LV',
    templateId: 'quick_order_confirmation',
    variables: {
      greeting: 'Sveiki',
      service_type: 'pakalpojuma pieprasījums',
      response_time: '2 stundu laikā',
      contact_phone: '+371 27727724',
      contact_email: 'tsv@metan.lv'
    }
  },
  investor_interest: {
    subject: 'Investīciju dokumenti un nākamie soļi | METAN.LV',
    templateId: 'investor_documents',
    variables: {
      greeting: 'Sveiki',
      project_name: 'CH₄ Future',
      document_access: 'pieejams',
      contact_person: 'Aleksejs Karalkins',
      contact_phone: '+371 27727751',
      contact_email: 'aleksejs.karalkins@zepenergija.lv'
    }
  },
  document_request: {
    subject: 'Dokumenti ir gatavi lejupielādei | METAN.LV',
    templateId: 'document_access',
    variables: {
      greeting: 'Sveiki',
      document_name: 'Pieprasītais dokuments',
      access_link: '#',
      validity_period: '30 dienas'
    }
  },
  contact_form: {
    subject: 'Mēs sazināsimies ar jums tuvākajā laikā | METAN.LV',
    templateId: 'contact_confirmation',
    variables: {
      greeting: 'Sveiki',
      response_time: '24 stundu laikā',
      contact_phone: '+371 27727724',
      contact_email: 'tsv@metan.lv'
    }
  }
};

// Функция для отправки email уведомления
export const sendEmailNotification = async (notificationData: EmailNotificationData): Promise<boolean> => {
  console.log('📧 Preparing email notification:', notificationData.type);
  
  try {
    // Получаем шаблон для типа уведомления
    const template = emailTemplates[notificationData.type];
    
    if (!template) {
      console.error('Email template not found for type:', notificationData.type);
      return false;
    }
    
    // Подготавливаем данные для отправки
    const emailData = {
      to: notificationData.recipient.email,
      subject: template.subject,
      templateId: template.templateId,
      variables: {
        ...template.variables,
        ...notificationData.content.variables,
        recipient_name: notificationData.recipient.name,
        recipient_company: notificationData.recipient.company || '',
        timestamp: new Date().toLocaleString('lv-LV')
      }
    };
    
    // Отправляем email через API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Use the correct API format
        to: notificationData.recipient.email,
        name: notificationData.recipient.name,
        type: 'contact_submission',
        data: {
          name: notificationData.recipient.name,
          email: notificationData.recipient.email,
          phone: notificationData.recipient.phone || '',
          message: `Автоматическое уведомление: ${notificationData.type}`,
          timestamp: new Date().toISOString(),
          sourceUrl: notificationData.metadata.source,
          userAgent: 'Email Automation System'
        }
      })
    });
    
    if (response.ok) {
      console.log('✅ Email notification sent successfully');
      
      // Планируем последующие действия, если необходимо
      if (notificationData.scheduling?.followUpSequence) {
        await scheduleFollowUpSequence(notificationData);
      }
      
      return true;
    } else {
      console.error('❌ Failed to send email notification:', response.statusText);
      return false;
    }
    
  } catch (error) {
    console.error('❌ Error sending email notification:', error);
    return false;
  }
};

// Функция для планирования последующих действий
export const scheduleFollowUpSequence = async (initialData: EmailNotificationData) => {
  console.log('⏰ Scheduling follow-up sequence for:', initialData.type);
  
  const followUpSchedule = {
    consultation_request: [
      { delay: 24 * 60 * 60 * 1000, action: 'reminder_call' }, // 24 часа
      { delay: 3 * 24 * 60 * 60 * 1000, action: 'follow_up_email' }, // 3 дня
      { delay: 7 * 24 * 60 * 60 * 1000, action: 'final_reminder' } // 7 дней
    ],
    quick_order: [
      { delay: 2 * 60 * 60 * 1000, action: 'urgent_call' }, // 2 часа
      { delay: 24 * 60 * 60 * 1000, action: 'follow_up_email' } // 24 часа
    ],
    investor_interest: [
      { delay: 48 * 60 * 60 * 1000, action: 'personal_meeting' }, // 48 часов
      { delay: 7 * 24 * 60 * 60 * 1000, action: 'additional_documents' } // 7 дней
    ]
  };
  
  const sequence = followUpSchedule[initialData.type as keyof typeof followUpSchedule];
  
  if (sequence) {
    sequence.forEach(step => {
      setTimeout(async () => {
        await executeFollowUpAction(step.action, initialData);
      }, step.delay);
    });
  }
};

// Функция для выполнения последующих действий
export const executeFollowUpAction = async (action: string, originalData: EmailNotificationData) => {
  console.log(`🔄 Executing follow-up action: ${action}`);
  
  switch (action) {
    case 'reminder_call':
      // Уведомление менеджера о необходимости звонка
      await sendInternalNotification({
        type: 'manager_reminder',
        message: `Напоминание: позвонить клиенту ${originalData.recipient.name}`,
        urgency: 'medium',
        contact_info: originalData.recipient
      });
      break;
      
    case 'follow_up_email':
      // Отправка дополнительного email
      await sendEmailNotification({
        ...originalData,
        content: {
          subject: 'Всё ещё нужна помощь? | METAN.LV',
          templateId: 'follow_up_email',
          variables: {
            original_request: originalData.type,
            additional_info: 'Дополнительная информация о наших услугах'
          }
        }
      });
      break;
      
    case 'urgent_call':
      // Срочное уведомление менеджера
      await sendInternalNotification({
        type: 'urgent_call',
        message: `СРОЧНО: позвонить клиенту ${originalData.recipient.name} по быстрому заказу`,
        urgency: 'high',
        contact_info: originalData.recipient
      });
      break;
      
    case 'personal_meeting':
      // Предложение личной встречи для инвесторов
      await sendEmailNotification({
        ...originalData,
        content: {
          subject: 'Приглашение на личную встречу | CH₄ Future',
          templateId: 'meeting_invitation',
          variables: {
            meeting_purpose: 'Презентация проекта CH₄ Future',
            project_manager: 'Алексей Каралкин'
          }
        }
      });
      break;
      
    default:
      console.warn('Unknown follow-up action:', action);
  }
};

// Функция для отправки внутренних уведомлений команде
export const sendInternalNotification = async (notificationData: {
  type: string;
  message: string;
  urgency: 'low' | 'medium' | 'high';
  contact_info: any;
}) => {
  console.log('🔔 Sending internal notification:', notificationData.type);
  
  try {
    const response = await fetch('/api/send-agent-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: notificationData.type,
        message: notificationData.message,
        urgency: notificationData.urgency,
        contact_info: notificationData.contact_info,
        timestamp: new Date().toISOString()
      })
    });
    
    if (response.ok) {
      console.log('✅ Internal notification sent successfully');
    } else {
      console.error('❌ Failed to send internal notification:', response.statusText);
    }
    
  } catch (error) {
    console.error('❌ Error sending internal notification:', error);
  }
};

// Функция для создания персонализированного email контента
export const createPersonalizedContent = (
  templateType: EmailNotificationType,
  userData: any,
  additionalData: any = {}
) => {
  const personalization = {
    greeting: userData.name ? `Sveiki, ${userData.name}!` : 'Sveiki!',
    company_mention: userData.company ? `no uzņēmuma ${userData.company}` : '',
    service_specific: getServiceSpecificContent(templateType, additionalData),
    next_steps: getNextStepsContent(templateType),
    contact_info: getContactInfo(templateType)
  };
  
  return personalization;
};

// Функция для получения контента специфичного для услуги
const getServiceSpecificContent = (type: EmailNotificationType, data: any) => {
  const serviceContent = {
    consultation_request: 'Mūsu eksperts sazināsies ar jums, lai apspriestu jūsu vajadzības atkritumu apsaimniekošanā.',
    quick_order: `Jūsu pieprasījums par pakalpojumu "${data.service || 'pakalpojums'}" ir saņemts un tiks apstrādāts prioritāri.`,
    investor_interest: 'Paldies par interesi par CH₄ Future projektu. Dokumenti ir sagatavoti un pieejami lejupielādei.',
    document_request: `Dokuments "${data.document_name || 'pieprasītais dokuments'}" ir gatavs lejupielādei.`,
    contact_form: 'Jūsu ziņojums ir saņemts un tiks apstrādāts mūsu speciālistu komandas.'
  };
  
  return serviceContent[type] || 'Paldies par jūsu pieprasījumu!';
};

// Функция для получения nākamo soļu informācijas
const getNextStepsContent = (type: EmailNotificationType) => {
  const nextSteps = {
    consultation_request: [
      'Mūsu eksperts sazināsies ar jums 24 stundu laikā',
      'Apspriedīsim jūsu vajadzības un sniegsim individuālu konsultāciju',
      'Sagatavosim personalizētu piedāvājumu jūsu uzņēmumam'
    ],
    quick_order: [
      'Operators sazināsies ar jums 2 stundu laikā',
      'Apstiprinām pakalpojuma detaļas un laiku',
      'Organizējam pakalpojuma sniegšanu'
    ],
    investor_interest: [
      'Iepazīstieties ar projektā dokumentiem',
      'Sazināsimies ar jums 48 stundu laikā',
      'Plānojam personālu tikšanos un prezentāciju'
    ]
  };
  
  return nextSteps[type] || ['Mēs sazināsimies ar jums tuvākajā laikā'];
};

// Функция для получения контактной информации
const getContactInfo = (type: EmailNotificationType) => {
  const contactInfo = {
    investor_interest: {
      name: 'Aleksejs Karalkins',
      title: 'Projekta vadītājs',
      phone: '+371 27727751',
      email: 'aleksejs.karalkins@zepenergija.lv'
    },
    default: {
      name: 'METAN.LV komanda',
      title: 'Klientu apkalpošana',
      phone: '+371 27727724',
      email: 'tsv@metan.lv'
    }
  };
  
  return contactInfo[type] || contactInfo.default;
};

// Экспорт всех функций
export default {
  sendEmailNotification,
  scheduleFollowUpSequence,
  executeFollowUpAction,
  sendInternalNotification,
  createPersonalizedContent,
  emailTemplates
};