'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  trackCTA, 
  trackFormSubmission, 
  trackDocumentRequest,
  trackPageView,
  trackUserJourney,
  trackInvestorAction,
  trackProjectPageView,
  trackDocumentInterest 
} from '@/components/Analytics';
import { trackFormSubmission as trackFormSubmissionGA4 } from '@/lib/ga4-events';
import { submitToCRM, DocumentRequest } from '@/lib/crm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Download,
  Phone,
  Mail,
  Target,
  Zap,
  Leaf,
  Euro,
  BarChart3,
  CheckCircle,
  Clock,
  Globe,
  Factory,
  Calculator,
  X
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SEOStructuredData } from '@/components/SEOHead';
import { investorStructuredData } from './metadata';

const keyMetrics = [
  {
    title: 'Kopējās kapitāla izmaksas',
    value: '2 016 500 €',
    subtitle: 'ar piegādi un transportu',
    icon: Euro,
    color: 'text-blue-600'
  },
  {
    title: 'Investora ieguldījums',
    value: '1 738 000 €',
    subtitle: 'nepieciešamais kapitāls',
    icon: TrendingUp,
    color: 'text-green-600'
  },
  {
    title: 'Biometāna jauda',
    value: '26 951 MWh/gadā',
    subtitle: 'ražošanas kapacitāte',
    icon: Zap,
    color: 'text-yellow-600'
  },
  {
    title: 'Projekta rentabilitāte',
    value: '38,6%',
    subtitle: 'uz visu kapitālu',
    icon: BarChart3,
    color: 'text-purple-600'
  },
  {
    title: 'CO₂ uztveršana',
    value: '3 880 t/gadā',
    subtitle: 'potenciāls',
    icon: Leaf,
    color: 'text-green-500'
  },
  {
    title: 'Atdeves periods',
    value: '2,6 gadi',
    subtitle: 'aprēķins bez subsīdijām',
    icon: Clock,
    color: 'text-orange-600'
  }
];

const advantages = [
  'Darbojoša stacija ar licencēm (ER0266, AP25AA0011)',
  'Modernizācija ar membrānu tehnoloģiju → biometāns',
  'Produkti ar ISCC, RED II, GoO sertifikāciju',
  'ESG atbilstība un bioekonomiska nozīme',
  'Valsts atbalsts un ES klimata mērķi',
  'Pierādīts biznesa modelis ar esošo infrastruktūru'
];

const documentTypes = {
  0: 'business_plan_lv',  // Латышский бизнес-план
  1: 'business_plan_ru',  // Русский бизнес-план  
  2: 'business_plan_en',  // Английский бизнес-plan
  3: 'financial_model'    // Финансовая модель
};

const documents = [
  {
    title: "Biznesa plāns CH₄ Future (Latviešu)",
    description: "Pilns projekta apraksts un attīstības scenāriji",
    size: "PDF, 45 lpp.",
    icon: FileText,
    status: "Pieejams",
    language: "🇱🇻 Latviešu",
    index: 0
  },
  {
    title: "Бизнес-план CH₄ Future (Русский)", 
    description: "Полное описание проекта и сценарии развития",
    size: "PDF, 45 стр.",
    icon: FileText,
    status: "Pieejams",
    language: "🇷🇺 Русский",
    index: 1
  },
  {
    title: "Business Plan CH₄ Future (English)",
    description: "Complete project description and development scenarios", 
    size: "PDF, 45 pages",
    icon: FileText,
    status: "Pieejams",
    language: "🇬🇧 English",
    index: 2
  },
  {
    title: "Finanšu modelis (Финансовая модель)",
    description: "Detalizēti CAPEX, OPEX, rentabilitāte un atdeves aprēķini",
    size: "PDF, aprēķins 550m³/h",
    icon: Calculator,
    status: "Pieejams",
    language: "📊 Multi-language",
    index: 3
  }
];

const timeline = [
  { phase: '2024 Q4', milestone: 'Iekārtu piegāde un montāža', status: 'completed' },
  { phase: '2025 Q1', milestone: 'Testēšana un sertifikācija', status: 'progress' },
  { phase: '2025 Q2', milestone: 'Komerciāla ražošana', status: 'planned' },
  { phase: '2025 Q3', milestone: 'Pilna jauda un eksports', status: 'planned' },
  { phase: '2026+', milestone: 'CO₂ modulis un paplašināšana', status: 'planned' }
];

export default function InvestorsPage() {
  console.log('Investors page rendered');

  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    purpose: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verificationStep, setVerificationStep] = useState<'form' | 'verification' | 'success'>('form');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Track investor page view and journey
  useEffect(() => {
    // Track investor page view
    trackPageView('investor_page', {
      page_section: 'investors',
      page_priority: 'critical',
      conversion_potential: 'maximum',
      target_audience: 'investors',
    });
    
    // Track investor journey
    trackUserJourney('investor_page_visit', {
      page_type: 'investor_funnel',
      intent: 'investment_research',
      funnel_stage: 'high_intent',
      potential_investment: true,
    });
    
    // Track project page view for biomethan project
    trackProjectPageView('CH4_Future', {
      project_type: 'biomethan',
      investment_focus: true,
      financial_details: true,
      page_depth: 'detailed',
    });
    
    console.log("💰 Investor page tracking initialized");
  }, []);



  const downloadDocument = async () => {
    console.log('🔒 Requesting document access for:', selectedDocument?.title);
    
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      // Запрос доступа к документу через верификацию
      const response = await fetch('/api/download-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          documentType: documentTypes[selectedDocument?.index as keyof typeof documentTypes],
          userAgent: navigator.userAgent,
          verificationCode: verificationCode // Передаем код верификации для проверки
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Track document download
        trackInvestorAction('document_download_requested', 'CH4_Future', {
          document_name: selectedDocument?.title,
          document_index: selectedDocument?.index,
          access_method: 'google_drive_direct',
          user_email: formData.email,
          user_name: formData.name
        });
        
        // Прямое перенаправление на Google Drive для скачивания
        window.open(data.downloadUrl, '_blank');
        
        console.log('✅ Document access granted - redirecting to Google Drive');
        
        // Показываем сообщение благодарности
        const thankYouMsg = data.thankYouMessage || `Paldies par jūsu interesi par CH₄ Future projektu!`;
        setSuccessMessage(`📄 Dokuments "${data.documentInfo?.title}" atvērsies Google Drive!\n\n🎉 ${thankYouMsg}\n\n✅ Google Drive atvērsies jaunā cilnē, kur varat apskatīt un lejupielādēt dokumentu.`);
        
        // Track successful download
        trackInvestorAction('document_download_completed', 'CH4_Future', {
          document_name: selectedDocument?.title,
          document_type: data.documentInfo?.title,
          security_level: 'google_drive_direct',
          user_email: formData.email,
          file_size: data.documentInfo?.size
        });
        
        // Дополнительная благодарность через 3 секунды
        setTimeout(() => {
          setSuccessMessage(`🎯 Dokuments veiksmīgi piekļūts!\n\n💼 Mēs novērtējam jūsu interesi par CH₄ Future projektu.\n📞 Ja jums ir jautājumi, zvaniet +371 27727724\n📧 Vai rakstiet uz tsv@metan.lv`);
        }, 3000);
        
      } else {
        // Улучшенная обработка специфических ошибок
        if (data.code === 'USER_NOT_VERIFIED') {
          console.log('❌ User verification issue detected');
          setErrorMessage(
            `${data.error}\n\n💡 ${data.suggestion}\n\nПопробуйте повторить верификацию email.`
          );
          
          // Автоматически возвращаем пользователя к шагу верификации
          setTimeout(() => {
            setVerificationStep('verification');
            setErrorMessage('');
          }, 3000);
          
        } else {
          throw new Error(data.error || 'Kļūda piekļūstot dokumentam');
        }
      }
      
    } catch (error) {
      console.error('❌ Document access error:', error);
      
      // Определяем тип ошибки для более точного сообщения
      let userMessage = 'Kļūda piekļūstot dokumentam. Mēģiniet vēlreiz.';
      
      if (error instanceof Error) {
        if (error.message.includes('верифицирован') || error.message.includes('verificēts')) {
          userMessage = `${error.message}\n\n🔄 Mēģiniet atkārtoti verificēt e-pastu.`;
          
          // Автоматически сбрасываем на шаг верификации через 3 секунды
          setTimeout(() => {
            setVerificationStep('verification');
            setErrorMessage('');
          }, 3000);
          
        } else {
          userMessage = error.message;
        }
      }
      
      setErrorMessage(userMessage);
      
      // Track error for analytics
      trackInvestorAction('document_download_error', 'CH4_Future', {
        document_name: selectedDocument?.title,
        error_message: error instanceof Error ? error.message : 'Unknown error',
        user_email: formData.email
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  const openDocumentRequest = (docIndex: number) => {
    console.log('Opening document request for:', documents[docIndex].title);
    
    // Track document interest before opening form
    trackDocumentInterest('investor_document', documents[docIndex].title, {
      document_index: docIndex,
      document_type: 'investor_materials',
      access_method: 'form_request',
      user_intent: 'investment_research',
    });
    
    // Track investor action
    trackInvestorAction('document_request', 'CH4_Future', {
      document_name: documents[docIndex].title,
      document_index: docIndex,
      action_location: 'document_section',
    });
    
    setSelectedDocument({...documents[docIndex], index: docIndex});
    setIsDialogOpen(true);
    setIsSubmitted(false);
    setVerificationStep('form');
    setVerificationCode('');
    setIsLoading(false);
    setErrorMessage('');
    setSuccessMessage('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      purpose: '',
      message: ''
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    console.log('📧 Starting email verification for:', formData.email);
    
    // Google Ads конверсия для отправки формы
    if (typeof window !== 'undefined' && window.trackRegistrationClick) {
      window.trackRegistrationClick('investor_document_form_submit');
    }
    
    try {
      // Отправка кода верификации
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_code',
          email: formData.email,
          investorData: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            purpose: formData.purpose,
            message: formData.message,
            documentRequested: selectedDocument?.title || 'Unknown document',
            sourceUrl: window.location.href,
            timestamp: new Date().toISOString()
          }
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage(data.message);
        setVerificationStep('verification');
        
        // Track verification step
        trackInvestorAction('email_verification_sent', 'CH4_Future', {
          document_name: selectedDocument?.title,
          email: formData.email,
          name: formData.name
        });
        
        console.log('✅ Verification code sent successfully');
        
      } else {
        throw new Error(data.error || 'Neizdevās nosūtīt kodu');
      }
      
    } catch (error) {
      console.error('Error sending verification code:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Kļūda nosūtot kodu. Mēģiniet vēlreiz.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    
    console.log('🔍 Verifying code for:', formData.email, 'Code:', verificationCode);
    
    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify_code',
          email: formData.email,
          code: verificationCode
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage(data.message);
        setVerificationStep('success');
        setIsSubmitted(true);
        
        // Показываем информацию о времени, если доступна
        if (data.timeDetails) {
          console.log(`⏰ Code verification successful. Remaining time: ${data.timeDetails.remainingMinutes} minutes`);
        }
        
        // Track successful verification
        trackInvestorAction('email_verified', 'CH4_Future', {
          document_name: selectedDocument?.title,
          email: formData.email,
          name: formData.name,
          verification_time: data.timeDetails?.codeAge || 0
        });
        
        // Track document access
        trackDocumentRequest(selectedDocument?.title || 'Unknown document', {
          user_name: formData.name,
          user_email: formData.email,
          company: formData.company,
          purpose: formData.purpose,
          success: true,
          access_method: 'instant_after_verification'
        });
        
        console.log('✅ Email verified! Document access granted.');
        
      } else {
        // Улучшенная обработка ошибок с детальной информацией
        let errorMsg = data.error || 'Nepareizs kods';
        
        // Если это ошибка времени, показываем специальное сообщение
        if (data.details?.codeAge && data.details?.expiryLimit) {
          errorMsg += `\n\n⏰ Kods bija derīgs ${data.details.expiryLimit} minūtes, bet izmantots pēc ${data.details.codeAge} minūtēm.`;
        }
        
        // Показываем кнопку для повторной отправки кода
        if (errorMsg.includes('beidzies') || errorMsg.includes('истек')) {
          errorMsg += '\n\n💡 Pieprasiet jaunu kodu, noklikšķinot uz "Nesaņēmāt kodu?"';
        }
        
        setErrorMessage(errorMsg);
        
        // Автоматически фокусируемся на поле ввода кода
        setTimeout(() => {
          const codeInput = document.getElementById('code');
          if (codeInput) {
            codeInput.focus();
          }
        }, 100);
      }
      
    } catch (error) {
      console.error('Error verifying code:', error);
      setErrorMessage('Savienojuma kļūda. Pārbaudiet interneta savienojumu un mēģiniet vēlreiz.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    console.log('🔄 Resending verification code to:', formData.email);
    
    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_code',
          email: formData.email,
          investorData: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            purpose: formData.purpose,
            message: formData.message,
            documentRequested: selectedDocument?.title || 'Unknown document',
            sourceUrl: window.location.href,
            timestamp: new Date().toISOString(),
            resend: true // Флаг повторной отправки
          }
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Очищаем предыдущий код
        setVerificationCode('');
        
        let message = 'Jauns kods nosūtīts uz jūsu e-pastu! 📧';
        
        setSuccessMessage(message);
        
        // Track resend action
        trackInvestorAction('verification_code_resent', 'CH4_Future', {
          document_name: selectedDocument?.title,
          email: formData.email,
          name: formData.name,
          attempt: 'resend'
        });
        
        console.log('✅ New verification code sent successfully');
        
      } else {
        throw new Error(data.error || 'Neizdevās nosūtīt jaunu kodu');
      }
      
    } catch (error) {
      console.error('Error resending code:', error);
      
      let errorMsg = 'Kļūda nosūtot jaunu kodu. Mēģiniet vēlreiz.';
      
      if (error instanceof Error) {
        if (error.message.includes('email')) {
          errorMsg = 'Problēma ar e-pasta adresi. Pārbaudiet adresi un mēģiniet vēlreiz.';
        } else {
          errorMsg = error.message;
        }
      }
      
      setErrorMessage(errorMsg);
      
      // Track resend error
      trackInvestorAction('verification_resend_error', 'CH4_Future', {
        document_name: selectedDocument?.title,
        email: formData.email,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    // Ensure the phone number always starts with +371
    let cleanValue = value.replace(/[^\d+]/g, '');
    
    if (!cleanValue.startsWith('+371')) {
      if (cleanValue.startsWith('371')) {
        cleanValue = '+' + cleanValue;
      } else if (cleanValue.match(/^\d/)) {
        cleanValue = '+371' + cleanValue;
      } else if (cleanValue === '' || cleanValue === '+') {
        cleanValue = '+371';
      }
    }
    
    setFormData({...formData, phone: cleanValue});
  };

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    if (!formData.phone || formData.phone === '+371') {
      setFormData({...formData, phone: '+371 '});
      // Set cursor position after +371 and space
      setTimeout(() => {
        input.setSelectionRange(5, 5);
      }, 0);
    } else if (formData.phone.length <= 5) {
      // Position cursor at the end if value is short
      setTimeout(() => {
        input.setSelectionRange(input.value.length, input.value.length);
      }, 0);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOStructuredData data={investorStructuredData} />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-metan-primary to-metan-accent text-white">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Investēt CH₄ Future projektā
            </h1>
            <p className="text-xl leading-relaxed mb-8 text-white/90">
              SIA &quot;Ainavas Nams&quot; aicina stratēģiskos investorus piedalīties mūsdienīgas biometāna
              ražošanas stacijas izveidē. Ilgtspējīgas investīcijas ar augstu atdevi un pārbaudītu infrastruktūru.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-metan-primary hover:bg-gray-100"
                onClick={() => {
                  trackCTA('download_business_plan', 'investor_hero', 'business_plan');
                  
                  // Google Ads конверсия для клика по кнопке
                  if (typeof window !== 'undefined' && window.trackRegistrationClick) {
                    window.trackRegistrationClick('download_business_plan_button');
                  }
                  
                  openDocumentRequest(0);
                }}
              >
                <Download className="mr-2 h-5 w-5" />
                Lejupielādēt biznesa plānu
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => {
                  trackCTA('contact_project_manager', 'investor_hero', '/kontakti');
                  
                  // Google Ads конверсия для клика по кнопке контакта
                  if (typeof window !== 'undefined' && window.trackRegistrationClick) {
                    window.trackRegistrationClick('contact_project_manager_button');
                  }
                  
                  // Navigate using Next.js router
                  router.push('/kontakti');
                }}
              >
                <Phone className="mr-2 h-5 w-5" />
                Sazināties ar projekta vadītāju
              </Button>
              <a href="tel:+37127727751">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => {
                    trackCTA('call_project_manager', 'investor_hero', 'tel:+37127727751');
                    
                    // Google Ads конверсия для клика по кнопке звонка
                    if (typeof window !== 'undefined' && window.trackRegistrationClick) {
                      window.trackRegistrationClick('call_project_manager_button');
                    }
                  }}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Zvanīt projekta vadītājam
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Galvenie finansiālie rādītāji</h2>
            <p className="text-xl text-metan-text">Projekta CH₄ Future ekonomiskā efektivitāte</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="metan-card h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg bg-gray-100`}>
                        <metric.icon className={`h-6 w-6 ${metric.color}`} />
                      </div>
                      <h3 className="font-semibold text-metan-gray">{metric.title}</h3>
                    </div>
                    <div className={`text-3xl font-bold ${metric.color} mb-1`}>
                      {metric.value}
                    </div>
                    <p className="text-sm text-gray-500">{metric.subtitle}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Advantages */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-8 text-center">Kāpēc ieguldīt šajā projektā?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm"
                >
                  <CheckCircle className="h-5 w-5 text-metan-accent mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{advantage}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Timeline */}
      <section className="py-20">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Projekta īstenošanas plāns</h2>
            <p className="text-xl text-metan-text">Galvenie posmi līdz pilnai ražošanas jaudai</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center gap-6 mb-8 last:mb-0"
              >
                <div className={`flex-shrink-0 w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold ${
                  item.status === 'completed' ? 'bg-green-100 border-green-500 text-green-700' :
                  item.status === 'progress' ? 'bg-yellow-100 border-yellow-500 text-yellow-700' :
                  'bg-gray-100 border-gray-300 text-gray-500'
                }`}>
                  {item.phase.split(' ')[1]}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-metan-gray">{item.phase}</h3>
                    <Badge variant={
                      item.status === 'completed' ? 'default' :
                      item.status === 'progress' ? 'secondary' : 'outline'
                    }>
                      {item.status === 'completed' ? 'Pabeigts' :
                       item.status === 'progress' ? 'Procesā' : 'Plānots'}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{item.milestone}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation for investors */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dokumentācija investoriem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Detalizēta projekta informācija un aprēķini trijos valodās
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Латышский бизнес-план */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 rounded-lg relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                  Pieejams
                </span>
                <span className="text-lg">🇱🇻</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Biznesa plāns CH₄ Future
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Pilns projekta apraksts latviešu valodā
              </p>
              <p className="text-xs text-gray-500 mb-6">
                PDF, 45 lpp.
              </p>
              
              <Button 
                className="w-full bg-metan-primary hover:bg-metan-primary/90"
                onClick={() => {
                  setSelectedDocument({ title: "Biznesa plāns CH₄ Future (Latviešu)", index: 0 });
                  setIsDialogOpen(true);
                }}
              >
                Pieprasīt piekļuvi
              </Button>
            </div>

            {/* Русский бизнес-план */}
            <div className="bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200 p-6 rounded-lg relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                  Pieejams
                </span>
                <span className="text-lg">🇷🇺</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Бизнес-план CH₄ Future
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Полное описание проекта на русском языке
              </p>
              <p className="text-xs text-gray-500 mb-6">
                PDF, 45 стр.
              </p>
              
              <Button 
                className="w-full bg-metan-primary hover:bg-metan-primary/90"
                onClick={() => {
                  setSelectedDocument({ title: "Бизнес-план CH₄ Future (Русский)", index: 1 });
                  setIsDialogOpen(true);
                }}
              >
                Запросить доступ
              </Button>
            </div>

            {/* Английский бизнес-план */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 p-6 rounded-lg relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                  Available
                </span>
                <span className="text-lg">🇬🇧</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Business Plan CH₄ Future
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Complete project description in English
              </p>
              <p className="text-xs text-gray-500 mb-6">
                PDF, 45 pages
              </p>
              
              <Button 
                className="w-full bg-metan-primary hover:bg-metan-primary/90"
                onClick={() => {
                  setSelectedDocument({ title: "Business Plan CH₄ Future (English)", index: 2 });
                  setIsDialogOpen(true);
                }}
              >
                Request Access
              </Button>
            </div>

            {/* Финансовая модель */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 p-6 rounded-lg relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                  Pieejams
                </span>
                <span className="text-lg">📊</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Finanšu modelis
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Detalizēti finansiālie aprēķini 550m³/h
              </p>
              <p className="text-xs text-gray-500 mb-6">
                PDF, aprēķins
              </p>
              
              <Button 
                className="w-full bg-metan-primary hover:bg-metan-primary/90"
                onClick={() => {
                  setSelectedDocument({ title: "Finanšu modelis (Финансовая модель)", index: 3 });
                  setIsDialogOpen(true);
                }}
              >
                Pieprasīt piekļuvi
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Partners */}
      <section className="py-20">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Tehnoloģiskie partneri</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="metan-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Factory className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-bold text-metan-gray">Biokona (Lietuva)</h3>
                    <p className="text-gray-600">Izvēlētais partneris</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Pilna risinājuma piegādātājs</li>
                  <li>• Membrānu attīrīšana un kompresija</li>
                  <li>• Zemākas izmaksas</li>
                  <li>• Pārbaudīta tehnoloģija</li>
                </ul>
                <div className="my-4 h-px bg-gray-200" />
                <div className="text-lg font-semibold text-blue-600">2 016 500 €</div>
              </CardContent>
            </Card>

            <Card className="metan-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="text-xl font-bold text-metan-gray">Suomen Biovoima (Somija)</h3>
                    <p className="text-gray-600">Alternatīvais partneris</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Atpakaļpirkuma iespēja</li>
                  <li>• SDG tehnoloģijas</li>
                  <li>• Skandināvu kvalitātes standarti</li>
                  <li>• Ilgtermiņa atbalsts</li>
                </ul>
                <div className="my-4 h-px bg-gray-200" />
                <div className="text-lg font-semibold text-green-600">Ar garantiju</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-metan-primary text-white">
        <div className="metan-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Gatavs investēt nākotnē?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
              Pievienojieties CH₄ Future projektam un kļūstiet par daļu no Latvijas zaļās enerģijas revolūcijas. 
              Sazinieties ar mūsu komandu detalizētai konsultācijai.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-bold mb-1">Aleksejs Karalkins</h3>
                <p className="text-white/80 text-sm">Projekta vadītājs</p>
                <a 
                  href="mailto:aleksejs.karalkins@zepenergija.lv"
                  className="text-white/80 text-sm hover:text-white transition-colors block"
                >
                  aleksejs.karalkins@zepenergija.lv
                </a>
                <a 
                  href="tel:+37127727751"
                  className="text-white/80 text-sm hover:text-white transition-colors block"
                >
                  +371 27727751
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Target className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-bold mb-1">Investīciju summa</h3>
                <p className="text-white/80 text-sm">No 100 000 €</p>
                <p className="text-white/80 text-sm">Līdz 1 738 000 €</p>
                <p className="text-white/80 text-sm">Elastīgi dalības modeļi</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-metan-primary hover:bg-gray-100"
                onClick={() => {
                  trackCTA('schedule_meeting', 'investor_contact_cta', '/kontakti');
                  router.push('/kontakti');
                }}
              >
                <Phone className="mr-2 h-5 w-5" />
                Pieteikt tikšanos
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => {
                  trackCTA('send_email', 'investor_contact_cta', 'mailto:tsv@metan.lv');
                  
                  // Google Ads конверсия для клика по кнопке email
                  if (typeof window !== 'undefined' && window.trackRegistrationClick) {
                    window.trackRegistrationClick('send_email_button');
                  }
                  
                  window.location.href = 'mailto:tsv@metan.lv?subject=CH4 Future investīciju iespējas&body=Sveiki! Mani interesē CH4 Future projekta investīciju iespējas.';
                }}
              >
                <Mail className="mr-2 h-5 w-5" />
                Sūtīt e-pastu
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Document Request Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-metan-primary" />
              {verificationStep === 'form' ? 'Pieprasīt dokumentu' :
               verificationStep === 'verification' ? 'Apstipriniet e-pastu' :
               'Dokuments pieejams!'
              }
            </DialogTitle>
            <DialogDescription>
              {verificationStep === 'form' 
                ? `Lai saņemtu tūlītēju piekļuvi dokumentam "${selectedDocument?.title}", aizpildiet formu zemāk.`
                : verificationStep === 'verification'
                ? 'Ievadiet apstiprinājuma kodu, kas nosūtīts uz jūsu e-pastu.'
                : 'Jūsu e-pasts ir apstiprināts. Dokuments atvērsies Google Drive.'
              }
            </DialogDescription>
          </DialogHeader>

          {/* Error and Success Messages */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              ❌ {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
              ✅ {successMessage}
            </div>
          )}

          {/* Step 1: Form */}
          {verificationStep === 'form' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Vārds, uzvārds *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    placeholder="Jānis Bērziņš"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-pasts *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    placeholder="janis@uznemums.lv"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Tālrunis</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onFocus={handlePhoneFocus}
                    placeholder="+371 20000000"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Uzņēmums</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="SIA 'Piemērs'"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="purpose">Pieprasījuma mērķis *</Label>
                <Select value={formData.purpose} onValueChange={(value) => setFormData({...formData, purpose: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Izvēlieties mērķi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investment">Investīciju iespēju novērtēšana</SelectItem>
                    <SelectItem value="partnership">Sadarbības iespējas</SelectItem>
                    <SelectItem value="analysis">Tirgus analīze</SelectItem>
                    <SelectItem value="research">Pētniecības mērķi</SelectItem>
                    <SelectItem value="other">Cits mērķis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Papildu komentāri</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Papildu informācija par jūsu pieprasījumu..."
                  rows={3}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Ātra pieeja!</span>
                </div>
                <p className="text-sm text-blue-700">
                  Pēc e-pasta apstiprinājuma saņemsiet <strong>tūlītēju piekļuvi</strong> dokumentam bez gaidīšanas.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Atcelt
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-metan-primary hover:bg-metan-primary/90"
                  disabled={!formData.name || !formData.email || !formData.purpose || isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Nosūta kodu...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Nosūtīt apstiprinājuma kodu
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Step 2: Verification */}
          {verificationStep === 'verification' && (
            <form onSubmit={handleCodeVerification} className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-gray-600 mb-4">
                  Mēs nosūtījām 6-zīmju kodu uz <strong>{formData.email}</strong>
                </p>
              </div>

              <div>
                <Label htmlFor="code">Apstiprinājuma kods</Label>
                <Input
                  id="code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  placeholder="123456"
                  className="text-center text-2xl font-mono tracking-wider"
                  maxLength={6}
                />
                <p className="text-sm text-gray-500 text-center mt-2">
                  Kods derīgs 30 minūtes
                </p>
              </div>

              {/* Улучшенные сообщения об ошибках */}
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  <div className="flex items-start gap-2">
                    <X className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div className="whitespace-pre-line">{errorMessage}</div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setVerificationStep('form')}
                  className="flex-1"
                  disabled={isLoading}
                >
                  ← Atpakaļ
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-metan-primary hover:bg-metan-primary/90"
                  disabled={verificationCode.length !== 6 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Pārbauda...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Apstiprināt kodu
                    </>
                  )}
                </Button>
              </div>

              {/* Улучшенная секция повторной отправки */}
              <div className="text-center space-y-2">
                <Button
                  type="button"
                  variant="link"
                  onClick={resendCode}
                  className="text-sm text-metan-primary hover:text-metan-primary/80"
                  disabled={isLoading}
                >
                  {isLoading ? 'Nosūta...' : 'Nesaņēmāt kodu? Nosūtīt vēlreiz'}
                </Button>
                
                {/* Дополнительная помощь */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p>💡 Pārbaudiet spam/junk mapi</p>
                  <p>⏰ Jauns kods atcels iepriekšējo</p>
                </div>
              </div>
            </form>
          )}

          {/* Step 3: Success */}
          {verificationStep === 'success' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">E-pasts apstiprināts! 🎉</h3>
                <p className="text-gray-600">
                  Tagad varat piekļūt dokumentam &quot;<strong>{selectedDocument?.title}</strong>&quot;
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 p-4 rounded-md">
                <h4 className="font-semibold text-green-800 mb-2">📄 Pieejamie dokumenti investoriem:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Biznesa plāns CH₄ Future 🇱🇻 (PDF, 45 lpp.)</li>
                  <li>• Бизнес-план CH₄ Future 🇷🇺 (PDF, 45 стр.)</li>
                  <li>• Business Plan CH₄ Future 🇬🇧 (PDF, 45 pages)</li>
                  <li>• Finanšu modelis 📊 (PDF, aprēķins 550m³/h)</li>
                </ul>
                <div className="mt-3 pt-3 border-t border-green-300">
                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">🔒 Google Drive drošība:</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Visi dokumenti PDF formātā ar pilnu drošību no Google Drive
                  </p>
                </div>
              </div>

              {/* Благодарность и следующие шаги */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-md text-left">
                <h4 className="font-semibold text-blue-800 mb-2">🎯 Paldies par jūsu interesi!</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Mēs novērtējam jūsu interesi par CH₄ Future projektu un ceram uz turpmāku sadarbību.
                </p>
                <div className="text-sm text-blue-700 space-y-1">
                  <div><strong>📞 Tālrunis:</strong> +371 27727724</div>
                  <div><strong>📧 E-pasts:</strong> tsv@metan.lv</div>
                  <div><strong>👨‍💼 Kontaktpersona:</strong> Aleksejs Karalkins</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Aizvērt
                </Button>
                <Button
                  onClick={downloadDocument}
                  className="flex-1 bg-metan-primary hover:bg-metan-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Piekļūst dokumentam...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      📄 Atvērt Google Drive
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Hidden SEO content */}
      <div style={{ display: 'none' }}>
        <p>investīcijas biometāns CH4 Future Ainavas Nams ROI rentabilitāte</p>
        <p>zaļā enerģija ilgtspējīgas investīcijas bioekonomika Latvija</p>
        <p>ISCC RED II sertifikācija enerģijas investors biomasa</p>
        <p>Biokona Suomen Biovoima tehnoloģiju partneris membrānas</p>
        <p>ESG klimata mērķi oglekļa neitrāls CO2 uztveršana</p>
      </div>
    </div>
  );
}