import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// SMTP транспорт для уведомлений (внутренняя отправка, без relay)
const createTransporter = () => {
  // Унифицируем пароль: SMTP_PASS (как в .env.production)
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = (process.env.SMTP_SECURE === 'true') || port === 465;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.zoho.eu',
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Agent notification API called');

    const body = await request.json();
    const { subject, template, data: notificationData } = body || {};

    const leadsInbox = process.env.LEADS_INBOX || process.env.SMTP_USER;
    if (!leadsInbox) {
      return NextResponse.json({ success: false, error: 'LEADS_INBOX not configured' }, { status: 500 });
    }

    const transporter = createTransporter();
    if (!transporter) {
      // Не логируем лид-данные в проде
      console.warn('⚠️ No SMTP config for agent notification');
      return NextResponse.json({ success: false, error: 'SMTP not configured' }, { status: 500 });
    }

    const leadEmail = notificationData?.lead?.email || '';
    const safeSubject = subject || 'METAN.LV — Investor lead';

    const mailOptions = {
      from: `"METAN.LV Investori" <${process.env.SMTP_USER}>`,
      to: leadsInbox, // ВАЖНО: только внутренний адрес
      subject: safeSubject,
      html: generateAgentNotificationHTML(notificationData || {}),
      replyTo: leadEmail || leadsInbox,
      priority: 'high' as const,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
        'X-Mailer': 'METAN.LV System',
        'X-Auto-Response-Suppress': 'OOF, DR, NDR, RN, NRN',
      }
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Agent notification sent successfully',
      messageId: info.messageId,
      template: template || null
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
  const { lead, urgency_emoji, action_required, document_requested } = data || {};
  const safeLead = lead || {};

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Новый лид - ${safeLead?.name || 'N/A'}</title>
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
            .document-section { background: #fef3c7; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #f59e0b; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="urgency">${urgency_emoji || '⚡'} JAUNS INVESTORS!</div>
                <h2>📋 Dokuments pieprasīts: ${document_requested || 'Nav norādīts'}</h2>
                <p>Nepieciešama darbība: ${action_required || 'Nav norādīts'}</p>
            </div>

            <div class="lead-info">
                <h3 style="color: #065f46; margin-bottom: 15px;">👤 Investora informācija:</h3>
                <div class="field"><span class="label">Vārds, uzvārds:</span> <span class="value">${safeLead.name || 'Nav norādīts'}</span></div>
                <div class="field"><span class="label">E-pasts:</span> <span class="value">${safeLead.email || 'Nav norādīts'}</span></div>
                <div class="field"><span class="label">Tālrunis:</span> <span class="value">${safeLead.phone || 'Nav norādīts'}</span></div>
                <div class="field"><span class="label">Uzņēmums:</span> <span class="value">${safeLead.company || 'Fiziska persona'}</span></div>
                <div class="field"><span class="label">Pieprasījuma mērķis:</span> <span class="value">${safeLead.purpose || 'Nav norādīts'}</span></div>
                ${safeLead.message ? `
                <div class="field"><span class="label">Papildu komentāri:</span> <span class="value">${safeLead.message}</span></div>
                ` : ''}
                <div class="field"><span class="label">Lappuses URL:</span> <span class="value">${safeLead.sourceUrl || 'Nav norādīts'}</span></div>
                <div class="field"><span class="label">Pieteikuma laiks:</span> <span class="value">${safeLead.timestamp ? new Date(safeLead.timestamp).toLocaleString('lv-LV', { timeZone: 'Europe/Riga' }) : 'Nav norādīts'}</span></div>
            </div>

            <div style="text-align:center;margin:30px 0;">
                <a href="mailto:${safeLead.email || ''}?subject=RE:%20${encodeURIComponent(document_requested || 'Dokuments')}" class="action-button">
                    📧 Atbildēt investoram
                </a>
                <br>
                <a href="tel:${safeLead.phone || ''}" class="action-button" style="background:#059669;margin-left:10px;">
                    📞 Zvanīt: ${safeLead.phone || 'Nav telefona'}
                </a>
            </div>
        </div>
    </body>
    </html>
  `;
}
