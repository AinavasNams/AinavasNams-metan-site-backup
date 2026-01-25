import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ========================================
// 1. CONFIGURATION & TYPES
// ========================================

interface EmailData {
  [key: string]: any;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string;
  serviceType?: string;
  serviceName?: string;
  city?: string;
  customerAddress?: string;
  calculatedPrice?: any;
  monthlyPrice?: any;
  template?: string;
  type?: string;
}

type TemplateType =
  | 'consultation_request'
  | 'document_request'
  | 'contact_submission'
  | 'service_calculation'
  | 'waste_collection_request'
  | 'investor_inquiry'
  | string;

// ========================================
// 2. VALIDATION & SANITIZATION
// ========================================

function sanitize(value: any): string {
  if (value == null) return '';
  return String(value)
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 10000);
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// ========================================
// 3. SMTP TRANSPORTS
// ========================================

function createTransport(type: 'primary' | 'fallback') {
  const isPrimary = type === 'primary';

  const host = isPrimary ? process.env.SMTP_HOST : process.env.SMTP_FALLBACK_HOST;
  const port = Number(isPrimary ? process.env.SMTP_PORT : process.env.SMTP_FALLBACK_PORT) || (isPrimary ? 465 : 587);
  const secure = (isPrimary && process.env.SMTP_SECURE === 'true') || port === 465;

  const user = isPrimary ? process.env.SMTP_USER : process.env.SMTP_FALLBACK_USER;
  const pass = isPrimary ? process.env.SMTP_PASS : process.env.SMTP_FALLBACK_PASS;

  if (!host || !user || !pass) {
    throw new Error(`SMTP config missing (${type})`);
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

async function sendEmailWithFallback(options: any) {
  try {
    const t = createTransport('primary');
    const info = await t.sendMail(options);
    return { success: true, id: info.messageId };
  } catch (err) {
    console.warn('Primary SMTP failed, trying fallback:', err);
    const t2 = createTransport('fallback');
    const info2 = await t2.sendMail(options);
    return { success: true, id: info2.messageId, fallback: true };
  }
}

// ========================================
// 4. CLIENT EMAIL TEMPLATES
// ========================================

const EMAIL_TEMPLATES: Record<string, { subject: string; html: (data: EmailData) => string }> = {
  service_calculation: {
    subject: 'METAN.LV - Cenu piedāvājums',
    html: (data) => `
      <div style="font-family:Arial;max-width:600px;margin:0 auto;border:1px solid #ddd">
        <div style="background:#2D5A27;color:white;padding:20px;text-align:center"><h1>METAN.LV</h1></div>
        <div style="padding:20px">
          <h2>Sveiki, ${sanitize(data.name)}!</h2>
          <p>Jūsu aprēķins:</p>
          <table style="width:100%;border-collapse:collapse;margin-top:15px">
            <tr><td><strong>Pakalpojums:</strong></td><td>${sanitize(data.serviceType || data.serviceName)}</td></tr>
            <tr><td><strong>Objekts:</strong></td><td>${sanitize(data.city || data.customerAddress)}</td></tr>
            <tr><td><strong>Cena:</strong></td><td><strong>${sanitize(data.calculatedPrice ?? data.monthlyPrice)} EUR/mēn</strong></td></tr>
          </table>
          <p style="margin-top:20px">Ja vēlaties precizēt detaļas, atbildiet uz šo e-pastu.</p>
        </div>
      </div>
    `
  },
  contact_submission: {
    subject: 'METAN.LV - Ziņojums saņemts',
    html: (data) => `
      <div style="font-family:Arial;max-width:600px;margin:0 auto;border:1px solid #ddd">
        <div style="background:#2D5A27;color:white;padding:20px;text-align:center"><h1>METAN.LV</h1></div>
        <div style="padding:20px">
          <h2>Paldies, ${sanitize(data.name)}!</h2>
          <p>Mēs saņēmām jūsu ziņu un sazināsimies ar jums.</p>
        </div>
      </div>
    `
  }
};

// ========================================
// 5. INTERNAL EMAIL (FULL LEAD)
// ========================================

function buildInternalHtml(data: any) {
  const rows = Object.entries(data)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px;border-bottom:1px solid #eee"><strong>${sanitize(
          k
        )}</strong></td><td style="padding:6px;border-bottom:1px solid #eee">${sanitize(v)}</td></tr>`
    )
    .join('');

  return `
    <div style="font-family:Arial;max-width:800px;margin:0 auto;border:1px solid #ddd">
      <div style="background:#111827;color:white;padding:15px">
        <strong>METAN.LV — JAUNA PIETEIKUMA DATI</strong>
      </div>
      <div style="padding:15px">
        <table style="width:100%;border-collapse:collapse">
          ${rows}
        </table>
      </div>
    </div>
  `;
}

// ========================================
// 6. MAIN HANDLER
// ========================================

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();

    // flatten { data: {...} }
    let data: any = { ...rawBody };
    if (rawBody.data && typeof rawBody.data === 'object') {
      data = { ...data, ...rawBody.data };
      delete data.data;
    }

    // detect template/type
    let template: TemplateType =
      rawBody.template || rawBody.type || data.template || data.type || 'contact_submission';

    if (template === 'precise_offer') {
      template = 'service_calculation';
      data.serviceType = data.serviceName || data.serviceType;
      data.city = data.customerAddress || data.city;
      data.calculatedPrice = data.monthlyPrice || data.calculatedPrice;
    }

    const enrichedData = { ...data, template };

    const leadsInbox = process.env.LEADS_INBOX || process.env.SMTP_USER;
    if (!leadsInbox) {
      return NextResponse.json({ error: 'LEADS_INBOX not configured' }, { status: 500 });
    }

    const clientEmail =
      enrichedData.email && validateEmail(enrichedData.email) ? enrichedData.email : '';

    // 1) INTERNAL EMAIL (always)
    await sendEmailWithFallback({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: leadsInbox,
      replyTo: clientEmail || undefined,
      subject: `[LEAD] ${sanitize(template)} | ${sanitize(enrichedData.phone || '')}`,
      html: buildInternalHtml(enrichedData)
    });

    // 2) CLIENT EMAIL (only if email valid)
    if (clientEmail) {
      const tpl = EMAIL_TEMPLATES[template] || EMAIL_TEMPLATES.contact_submission;
      await sendEmailWithFallback({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: clientEmail,
        replyTo: leadsInbox,
        subject: tpl.subject,
        html: tpl.html(enrichedData)
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Handler error:', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
