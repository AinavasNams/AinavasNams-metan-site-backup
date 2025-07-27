import { NextRequest, NextResponse } from 'next/server';
import { 
  getVerifiedUser, 
  isUserVerified, 
  incrementDownloadCount,
  getStats
} from '@/lib/verification-store';

// 🔒 Google Drive документы в формате совместимом с браузерами (PDF формат)
const SECURE_DOCUMENT_URLS = {
  business_plan_lv: 'https://drive.google.com/file/d/1RWLg6w3RgqgMrPuKeIiAGARd-j-NFsXa/view?usp=sharing', // CH4_Future_AN_2025_styled_lv-2.docx.pdf (Латышский)
  business_plan_ru: 'https://drive.google.com/file/d/1Vy4PFI8a2JQaQ1QqZwc7qauvWurDzswL/view?usp=sharing', // CH4_Future_AN_2025_styled.pdf (Русский)
  business_plan_en: 'https://drive.google.com/file/d/1R6zuSALB-NPPtfv-qKB8PR9AgHkO7pQq/view?usp=sharing', // CH4_Future_AN_2025_styled en-US.docx.pdf (Английский)
  financial_model: 'https://drive.google.com/file/d/17jLhBUDMD6hbEOpP9sq7Gik8r2lhUf2q/view?usp=sharing' // Financial_Model_Biomethane_EN_v2 2.xlsx - aprēķins_550m3h.pdf
};

// 📄 Информация о документах для отслеживания
const DOCUMENT_INFO = {
  business_plan_lv: {
    title: 'Biznesa plāns CH₄ Future (Latviešu)',
    filename: 'CH4_Future_Business_Plan_LV.pdf',
    size: 'PDF, 45 lpp.',
    language: 'Latviešu'
  },
  business_plan_ru: {
    title: 'Бизнес-план CH₄ Future (Русский)',
    filename: 'CH4_Future_Business_Plan_RU.pdf',
    size: 'PDF, 45 стр.',
    language: 'Русский'
  },
  business_plan_en: {
    title: 'Business Plan CH₄ Future (English)',
    filename: 'CH4_Future_Business_Plan_EN.pdf',
    size: 'PDF, 45 pages',
    language: 'English'
  },
  financial_model: {
    title: 'Finanšu modelis (Финансовая модель)',
    filename: 'Financial_Model_Biomethane_550m3h.pdf',
    size: 'PDF, detalizēts aprēķins',
    language: 'Multi-language'
  }
};

export async function POST(request: NextRequest) {
  console.log('📥 Document download request received');
  
  try {
    const { email, documentType, userAgent, verificationCode } = await request.json();
    
    if (!email || !documentType) {
      return NextResponse.json({
        success: false,
        error: 'Email и тип документа обязательны'
      }, { status: 400 });
    }

    console.log(`🔍 Checking verification for user: ${email}, document: ${documentType}`);
    console.log(`📊 Current system stats:`, getStats());

    // Проверка верификации пользователя через общее хранилище
    const userData = getVerifiedUser(email);
    
    if (!userData) {
      console.log(`❌ User ${email} not found in verified users system`);
      return NextResponse.json({
        success: false,
        error: 'Пользователь не верифицирован. Пройдите верификацию email.',
        code: 'USER_NOT_VERIFIED',
        suggestion: 'Вернитесь к форме и пройдите верификацию email заново.'
      }, { status: 403 });
    }

    // Проверка доступа к документу
    if (!userData.allowedDocuments.includes(documentType)) {
      return NextResponse.json({
        success: false,
        error: 'Нет доступа к данному документу'
      }, { status: 403 });
    }

    // Получаем ссылку на документ
    const downloadUrl = SECURE_DOCUMENT_URLS[documentType as keyof typeof SECURE_DOCUMENT_URLS];
    const docInfo = DOCUMENT_INFO[documentType as keyof typeof DOCUMENT_INFO];
    
    if (!downloadUrl) {
      return NextResponse.json({
        success: false,
        error: 'Документ не найден'
      }, { status: 404 });
    }

    // Увеличиваем счетчик скачиваний через общее хранилище
    incrementDownloadCount(email);

    console.log(`✅ Document access granted for ${email}, document: ${docInfo.title}`);
    
    // Логирование для безопасности и аналитики
    console.log(`📊 Security log: ${email} (${userData.name}) accessed ${docInfo.title}, total downloads: ${userData.downloadsCount + 1}`);

    return NextResponse.json({
      success: true,
      downloadUrl: downloadUrl,
      documentInfo: {
        title: docInfo.title,
        filename: docInfo.filename,
        size: docInfo.size
      },
      message: `Документ "${docInfo.title}" открывается в Google Drive`,
      thankYouMessage: `Paldies par jūsu interesi par CH₄ Future projektu! Dokuments "${docInfo.title}" tagad atvērsies Google Drive.`
    });

  } catch (error) {
    console.error('❌ Document download error:', error);
    return NextResponse.json({
      success: false,
      error: 'Ошибка предоставления доступа к документу'
    }, { status: 500 });
  }
}

// Убираем GET endpoint, так как теперь используем прямые ссылки
export async function GET(request: NextRequest) {
  return NextResponse.json({
    error: 'Прямой доступ к документам запрещен. Используйте форму верификации.'
  }, { status: 403 });
}