import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
  setVerificationCode,
  getVerificationCode,
  deleteVerificationCode,
  isVerificationCodeValid,
  addVerifiedUser,
  cleanupExpiredCodes,
  getStats,
  CODE_EXPIRY
} from '@/lib/verification-store';

// SMTP транспорт
const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    return null;
  }
  
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// Генерация 6-значного кода
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Валидация email
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const { action, email, code, investorData } = await request.json();
    
    // Очистка старых кодов
    cleanupExpiredCodes();

    if (action === 'send_code') {
      const isResend = investorData?.resend === true;
      console.log(`📧 ${isResend ? 'Resending' : 'Sending'} verification code to:`, email);
      
      // Валидация email
      if (!email || !validateEmail(email)) {
        return NextResponse.json(
          { error: 'Nederīgs e-pasta formāts' },
          { status: 400 }
        );
      }

      // Если это повторная отправка, удаляем старый код
      if (isResend) {
        const oldData = getVerificationCode(email);
        if (oldData) {
          console.log(`🔄 Replacing existing code for ${email}`);
        }
      }

      // Генерация кода
      const verificationCode = generateVerificationCode();
      
      // Сохранение в общем хранилище
      setVerificationCode(email, {
        code: verificationCode,
        timestamp: Date.now(),
        data: investorData,
        verified: false
      });

      // HTML шаблон для email
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>METAN.LV - Koda apstiprinājums</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2D5A27 0%, #4A7C59 100%); color: white; padding: 30px 20px; border-radius: 12px 12px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px; }
            .code-box { background: white; border: 2px solid #2D5A27; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
            .code { font-size: 32px; font-weight: bold; color: #2D5A27; letter-spacing: 8px; font-family: 'Courier New', monospace; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .logo { font-size: 28px; font-weight: bold; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; }
            .resend-notice { background: #e3f2fd; border: 1px solid #2196f3; padding: 15px; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🔐 METAN.LV</div>
            <h1 style="margin: 10px 0 0 0; font-size: 24px;">${isResend ? 'Jauns koda apstiprinājums' : 'Koda apstiprinājums'}</h1>
            <p style="margin: 0; opacity: 0.9;">Investoru dokumentu pieeja</p>
          </div>
          <div class="content">
            <h2>Sveiks, ${investorData?.name || 'Investori'}! 👋</h2>
            ${isResend ? '<div class="resend-notice"><p style="margin: 0;"><strong>🔄 Jauns kods:</strong> Iepriekšējais kods vairs nav derīgs.</p></div>' : ''}
            <p>Lai piekļūtu CH₄ Future projekta dokumentācijai, lūdzu izmantojiet šo apstiprinājuma kodu:</p>
            
            <div class="code-box">
              <div class="code">${verificationCode}</div>
              <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">Ievadiet šo kodu vietnē</p>
            </div>

            <div class="warning">
              <p style="margin: 0;"><strong>⏰ Svarīgi:</strong><br>
              • Kods ir spēkā <strong>30 minūtes</strong><br>
              • Izmantojiet to tikai jūs - nedalieties ar citiem<br>
              • Pēc apstiprinājuma saņemsiet tūlītēju piekļuvi dokumentiem<br>
              ${isResend ? '• Šis ir jaunākais kods - iepriekšējie vairs nedarbojas' : ''}</p>
            </div>

            <h3 style="color: #2D5A27;">📄 Jums būs pieejami dokumenti:</h3>
            <ul style="color: #666;">
              <li>Biznesa plāns CH₄ Future (PDF, 45 lpp.)</li>
              <li>Finanšu modelis (Excel, detalizēts)</li>
              <li>Biokona tehnoloģijas piedāvājums</li>
              <li>Licences un atļaujas</li>
            </ul>

            <p><strong>Problēmas ar kodu?</strong><br>
            Rakstiet mums: <a href="mailto:tsv@metan.lv">tsv@metan.lv</a> vai zvaniet +371 27727724</p>
          </div>
          <div class="footer">
            <p>Ar cieņu,<br><strong>SIA "Ainavas Nams" komanda</strong></p>
            <p>🌍 <a href="https://metan.lv">metan.lv</a> | Investīcijas zaļajā enerģijā</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 12px; color: #999;">
              Šis kods tika nosūtīts pēc pieprasījuma vietnē metan.lv/investoriem<br>
              SIA "Ainavas Nams" | Rūpniecības iela 2D, Bēne, Dobeles nov., LV-3711
            </p>
          </div>
        </body>
        </html>
      `;

      // Отправка email
      const transporter = createTransporter();
      if (transporter) {
        try {
          const info = await transporter.sendMail({
            from: `"METAN.LV Investoriem" <${process.env.SMTP_USER}>`,
            to: email,
            subject: `🔐 METAN.LV - ${isResend ? 'Jauns ' : ''}Apstiprinājuma kods dokumentiem`,
            html: emailHtml,
            replyTo: 'tsv@metan.lv'
          });

          console.log(`✅ ${isResend ? 'Resend' : 'Verification'} email sent:`, {
            email,
            messageId: info.messageId,
            code: verificationCode // Логируем для отладки
          });

          return NextResponse.json({ 
            success: true, 
            message: `Apstiprinājuma kods ${isResend ? 'atkārtoti ' : ''}nosūtīts uz jūsu e-pastu`
          });
        } catch (error) {
          console.error('❌ Email sending error:', error);
          
          // Fallback - показываем код в консоли для отладки (только в логах, НЕ в ответе клиенту)
          console.log(`🔧 FALLBACK - ${isResend ? 'Resend' : 'Verification'} code for`, email, ':', verificationCode);
          
          // В продакшене НЕ возвращаем debug_code клиенту из соображений безопасности
          return NextResponse.json({ 
            success: true, 
            message: `Kods ģenerēts ${isResend ? '(atkārtoti, ' : '('}provizoriski). Ja neesat saņēmis e-pastu, sazinaties ar mums.`
          });
        }
      } else {
        // No SMTP - показываем код в консоли для отладки (только в логах, НЕ в ответе клиенту)
        console.log(`📧 DEBUG - ${isResend ? 'Resend' : 'Verification'} code for`, email, ':', verificationCode);
        
        // В продакшене НЕ возвращаем debug_code клиенту из соображений безопасности
        return NextResponse.json({ 
          success: true, 
          message: `Kods ģenerēts ${isResend ? '(atkārtoti, ' : '('}lokālā testā). Pārbaudiet konzoli serverim.`
        });
      }

    } else if (action === 'verify_code') {
      console.log('🔍 Verifying code for:', email);
      
      // Проверка кода через улучшенную функцию
      const verificationResult = isVerificationCodeValid(email, code);
      
      if (!verificationResult.valid) {
        console.log(`❌ Code verification failed for ${email}:`, verificationResult.error);
        return NextResponse.json({
          success: false,
          error: verificationResult.error || 'Koda pārbaude neizdevās',
          details: verificationResult.details
        }, { status: 400 });
      }

      // Получаем данные пользователя
      const storedData = getVerificationCode(email);
      if (!storedData) {
        return NextResponse.json({
          success: false,
          error: 'Datu kļūda. Pieprasiet jaunu kodu.'
        }, { status: 400 });
      }

      // Помечаем как верифицированный и добавляем в систему скачивания
      storedData.verified = true;
      setVerificationCode(email, storedData);
      
      // 🔒 ДОБАВЛЯЕМ В СИСТЕМУ ЗАЩИЩЕННОГО СКАЧИВАНИЯ
      const verifiedUser = addVerifiedUser(email, storedData.data);

      // 📧 ОТПРАВЛЯЕМ УВЕДОМЛЕНИЕ АГЕНТУ О НОВОМ ВЕРИФИЦИРОВАННОМ LIДЕ
      if (storedData.data) {
        try {
          const agentNotificationResponse = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/send-agent-notification`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: 'tsv@metan.lv',
              subject: `🎯 JAUNS INVESTORS! ${storedData.data.name} - ${storedData.data.documentRequested}`,
              template: 'investor_verified',
              data: {
                urgency_emoji: '🔥',
                action_required: 'Sazināties ar investoru 5 minūšu laikā',
                document_requested: storedData.data.documentRequested,
                lead: {
                  name: storedData.data.name,
                  email: storedData.data.email,
                  phone: storedData.data.phone,
                  company: storedData.data.company,
                  purpose: storedData.data.purpose,
                  message: storedData.data.message,
                  sourceUrl: storedData.data.sourceUrl,
                  timestamp: storedData.data.timestamp,
                  score: 95 // Высокий скор для верифицированного лида
                }
              }
            })
          });

          if (agentNotificationResponse.ok) {
            console.log(`📧 Agent notification sent for verified investor: ${email}`);
          } else {
            console.error('❌ Failed to send agent notification');
          }
        } catch (error) {
          console.error('❌ Error sending agent notification:', error);
        }
      }

      console.log(`✅ Email verified successfully: ${email}`);
      console.log(`🔐 User added to secure download system`);
      console.log(`📊 Current stats:`, getStats());
      console.log(`⏰ Code had ${verificationResult.details?.remainingMinutes || 0} minutes remaining`);

      return NextResponse.json({
        success: true,
        message: 'E-pasts veiksmīgi apstiprināts! Tagad jums ir piekļuve dokumentiem.',
        verified: true,
        timeDetails: {
          remainingMinutes: verificationResult.details?.remainingMinutes,
          codeAge: verificationResult.details?.codeAge
        }
      });

    } else {
      return NextResponse.json(
        { error: 'Nepareiza darbība' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Verification API error:', error);
    return NextResponse.json(
      { 
        error: 'Servera kļūda',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');
  
  if (!email) {
    return NextResponse.json({ error: 'Email nav norādīts' }, { status: 400 });
  }

  cleanupExpiredCodes();
  const storedData = getVerificationCode(email);
  
  return NextResponse.json({
    exists: !!storedData,
    verified: storedData?.verified || false,
    expired: storedData ? (Date.now() - storedData.timestamp > CODE_EXPIRY) : false,
    stats: getStats() // Для отладки
  });
}