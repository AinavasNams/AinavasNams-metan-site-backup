import { NextRequest, NextResponse } from 'next/server';

// SMTP транспорт для уведомлений инвесторов
const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    return null;
  }
  
  const nodemailer = require('nodemailer');
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

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Agent notification API called');
    
    const data = await request.json();
    const { to, subject, template, data: notificationData } = data;

    console.log('📨 Sending agent notification to:', to);
    console.log('📋 Subject:', subject);

    // Используем нашу SMTP систему для отправки уведомлений
    const transporter = createTransporter();
    if (transporter) {
      try {
        const mailOptions = {
          from: `"METAN.LV Investori" <${process.env.SMTP_USER}>`,
          to: to,
          subject: subject,
          html: generateAgentNotificationHTML(notificationData),
          replyTo: notificationData.lead?.email || 'tsv@metan.lv',
          // Улучшенные заголовки против спама
          priority: 'high' as const,
          headers: {
            'X-Priority': '1',
            'X-MSMail-Priority': 'High',
            'Importance': 'high',
            'X-Mailer': 'METAN.LV System',
            'List-Unsubscribe': '<mailto:tsv@metan.lv?subject=unsubscribe>',
            'X-Auto-Response-Suppress': 'OOF, DR, NDR, RN, NRN',
            'Authentication-Results': 'gmail.com; spf=pass'
          }
        };

        console.log('📨 Sending via SMTP to:', to);
        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Agent notification sent successfully:', {
          messageId: info.messageId,
          to: to,
          subject: subject,
          priority: 'high'
        });
        
        return NextResponse.json({ 
          success: true, 
          message: 'Agent notification sent successfully',
          messageId: info.messageId
        });
      } catch (error) {
        console.error('❌ SMTP sending failed:', error);
        
        // Fallback - логируем для отладки
        console.log('📧 FALLBACK - Agent notification log:');
        console.log('To:', to);
        console.log('Subject:', subject);
        console.log('Data:', notificationData);
        
        return NextResponse.json({ 
          success: false, 
          error: 'Email sending failed, but logged for manual processing' 
        });
      }
    } else {
      // Нет SMTP конфигурации - логируем для отладки
      console.log('⚠️ No SMTP configuration, logging agent notification:');
      console.log('📧 AGENT NOTIFICATION LOG:');
      console.log('To:', to);
      console.log('Subject:', subject);
      console.log('Lead data:', notificationData.lead);
      console.log('Document requested:', notificationData.document_requested);
      console.log('---');
      
      return NextResponse.json({ 
        success: true, 
        message: 'Agent notification logged (no SMTP configured)' 
      });
    }

    // Логируем для аналитики
    console.log('Agent notification processed:', {
      to,
      template,
      timestamp: new Date().toISOString(),
      lead_score: notificationData.lead?.score
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Agent notification sent' 
    });
    
  } catch (error) {
    console.error('Error sending agent notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}

function generateAgentNotificationHTML(data: any) {
  const { lead, urgency_emoji, action_required, document_requested } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Новый лид - ${lead.name}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #065f46, #22c55e); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .urgency { font-size: 24px; margin-bottom: 10px; }
            .lead-info { background: #f8fafc; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .field { margin: 8px 0; }
            .label { font-weight: bold; color: #374151; }
            .value { color: #1f2937; }
            .action-button { background: #dc2626; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin: 20px 0; }
            .score { font-size: 18px; font-weight: bold; color: #059669; }
            .document-section { background: #fef3c7; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #f59e0b; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="urgency">${urgency_emoji} JAUNS INVESTORS!</div>
                <h2>📋 Dokuments pieprasīts: ${document_requested || 'Nav norādīts'}</h2>
                <p>Nepieciešama darbība: ${action_required}</p>
            </div>
            
            <div class="lead-info">
                <h3 style="color: #065f46; margin-bottom: 15px;">👤 Investora informācija:</h3>
                <div class="field">
                    <span class="label">Vārds, uzvārds:</span> 
                    <span class="value">${lead.name}</span>
                </div>
                <div class="field">
                    <span class="label">E-pasts:</span> 
                    <span class="value">${lead.email}</span>
                </div>
                <div class="field">
                    <span class="label">Tālrunis:</span> 
                    <span class="value">${lead.phone || 'Nav norādīts'}</span>
                </div>
                <div class="field">
                    <span class="label">Uzņēmums:</span> 
                    <span class="value">${lead.company || 'Fiziska persona'}</span>
                </div>
                <div class="field">
                    <span class="label">Pieprasījuma mērķis:</span> 
                    <span class="value">${lead.purpose || 'Nav norādīts'}</span>
                </div>
                ${lead.message ? `
                <div class="field">
                    <span class="label">Papildu komentāri:</span> 
                    <span class="value">${lead.message}</span>
                </div>
                ` : ''}
                <div class="field">
                    <span class="label">Lappuses URL:</span> 
                    <span class="value">${lead.sourceUrl || 'Nav norādīts'}</span>
                </div>
                <div class="field">
                    <span class="label">Pieteikuma laiks:</span> 
                    <span class="value">${new Date(lead.timestamp).toLocaleString('lv-LV', { timeZone: 'Europe/Riga' })}</span>
                </div>
            </div>

            ${document_requested ? `
            <div class="document-section">
                <h3 style="color: #f59e0b; margin-bottom: 10px;">📄 Pieprasitais dokuments:</h3>
                <p style="margin: 0; font-weight: bold;">${document_requested}</p>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #92400e;">
                    ⚡ Investors gaida ātrumu! Atbildiet 5 minūšu laikā.
                </p>
            </div>
            ` : ''}
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${lead.email}?subject=RE: CH4 Future dokuments&body=Sveiki ${lead.name},%0A%0APaldies par interesi par CH4 Future projektu.%0A" class="action-button">
                    📧 Atbildēt investoram
                </a>
                <br>
                <a href="tel:${lead.phone || ''}" class="action-button" style="background: #059669; margin-left: 10px;">
                    📞 Zvanīt: ${lead.phone || 'Nav telefona'}
                </a>
            </div>
            
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
            
            <p style="font-size: 12px; color: #6b7280;">
                💡 <strong>Ieteikums:</strong> Sazinies ar investoru 5 minūšu laikā - tā konversija ir 9x augāka!<br>
                🎯 <strong>Prioritāte:</strong> Augsta - dokuments pieprasīts aktīvi.<br>
                🔗 <strong>Sistēma:</strong> METAN.LV investor CRM | ${new Date().toLocaleString('lv-LV')}
            </p>
        </div>
    </body>
    </html>
  `;
}