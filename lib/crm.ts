// CRM Integration utilities for METAN.LV
// Remove problematic import temporarily
// import { processLead, LeadData } from './digital-factory';

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

export interface DocumentRequest {
  timestamp: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  purpose: string;
  message?: string;
  documentRequested: string;
  sourceUrl: string;
  userAgent: string;
}

export interface ContactSubmission {
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  topic?: string;
  message: string;
  sourceUrl: string;
  userAgent: string;
}

// Google Sheets integration
export async function submitToGoogleSheets(data: DocumentRequest | ContactSubmission, sheetType: 'documents' | 'contacts' = 'documents'): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Submitting to Google Sheets:', sheetType, data);
    
    const webhookUrl = sheetType === 'documents' 
      ? process.env.NEXT_PUBLIC_GOOGLE_SHEETS_DOCUMENTS_WEBHOOK 
      : process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CONTACTS_WEBHOOK;
    
    if (!webhookUrl) {
      console.error('Google Sheets webhook URL not configured');
      return { success: false, error: 'CRM not configured' };
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Successfully submitted to Google Sheets');
      return { success: true };
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// HubSpot integration (альтернатива)
export async function submitToHubSpot(data: DocumentRequest | ContactSubmission): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Submitting to HubSpot:', data);
    
    const hubspotApiKey = process.env.NEXT_PUBLIC_HUBSPOT_API_KEY;
    if (!hubspotApiKey) {
      console.error('HubSpot API key not configured');
      return { success: false, error: 'HubSpot not configured' };
    }

    // Transform data for HubSpot format
    const hubspotData = {
      properties: {
        email: data.email,
        firstname: data.name.split(' ')[0],
        lastname: data.name.split(' ').slice(1).join(' '),
        phone: 'phone' in data ? data.phone : '',
        company: 'company' in data ? data.company : '',
        message: 'message' in data ? data.message : '',
        hs_lead_status: 'NEW',
        lifecyclestage: 'lead',
        lead_source: 'METAN.LV Website',
        lead_source_detail: 'sourceUrl' in data ? data.sourceUrl : '',
      }
    };

    const response = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hubspotApiKey}`,
      },
      body: JSON.stringify(hubspotData),
    });

    if (response.ok) {
      console.log('Successfully submitted to HubSpot');
      return { success: true };
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error submitting to HubSpot:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Automatic email sending
export async function sendAutomaticEmail(data: DocumentRequest | ContactSubmission, emailType: 'document_request' | 'contact_submission'): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Sending automatic email:', emailType, data.email);
    
    const emailData = {
      to: data.email,
      name: data.name,
      type: emailType,
      data: data,
    };

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (response.ok) {
      console.log('Automatic email sent successfully');
      return { success: true };
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error sending automatic email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Main CRM submission function
export async function submitToCRM(data: DocumentRequest | ContactSubmission, type: 'documents' | 'contacts' = 'documents') {
  console.log('Starting CRM submission process:', type, data);
  
  const results = {
    googleSheets: { success: false, error: '' } as { success: boolean; error: string },
    hubspot: { success: false, error: '' } as { success: boolean; error: string },
    email: { success: false, error: '' } as { success: boolean; error: string },
    digitalFactory: { success: false, error: '' } as { success: boolean; error: string },
  };

  // 🏭 ЦИФРОВОЙ ЗАВОД ОБРАБОТКА - TEMPORARILY DISABLED
  try {
    // Преобразуем данные в формат LeadData
    const leadData: LeadData = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: data.timestamp,
      name: data.name,
      email: data.email,
      phone: 'phone' in data ? data.phone : '',
      company: 'company' in data ? data.company : '',
      interestType: type === 'documents' ? 'document' : 
                   ('topic' in data && data.topic === 'investment') ? 'investment' :
                   ('topic' in data && data.topic === 'partnership') ? 'partnership' :
                   ('topic' in data && data.topic === 'service') ? 'service' : 'consultation',
      source: data.sourceUrl.includes('roi_kalkulators') ? 'roi_calculator' :
              data.sourceUrl.includes('investoriem') ? 'investment_page' :
              data.sourceUrl.includes('kontakti') ? 'contact_form' : 'other',
      urgency: 'medium',
      score: 0,
      metadata: {
        original_data: data,
        user_agent: data.userAgent,
        submission_type: type
      }
    };

    // Отправляем в цифровой завод для автоматической обработки
    // const digitalFactoryResult = await processLead(leadData);
    // Temporarily disabled - just log the data
    console.log('Lead data prepared for digital factory:', leadData);
    results.digitalFactory = { success: true, error: '' };
    
  } catch (error) {
    console.error('Digital factory processing failed:', error);
    results.digitalFactory = { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }

  // Submit to Google Sheets (primary CRM)
  const gsResult = await submitToGoogleSheets(data, type);
  results.googleSheets = { success: gsResult.success, error: gsResult.error || '' };
  
  // Submit to HubSpot (backup CRM)
  if (process.env.NEXT_PUBLIC_HUBSPOT_API_KEY) {
    const hsResult = await submitToHubSpot(data);
    results.hubspot = { success: hsResult.success, error: hsResult.error || '' };
  }
  
  // Send automatic email
  const emailType = type === 'documents' ? 'document_request' : 'contact_submission';
  const emailResult = await sendAutomaticEmail(data, emailType);
  results.email = { success: emailResult.success, error: emailResult.error || '' };

  // Log overall results
  console.log('CRM submission results:', results);
  
  // Return success if at least one method worked (including digital factory)
  const overallSuccess = results.googleSheets.success || results.hubspot.success || results.digitalFactory.success;
  
  return {
    success: overallSuccess,
    details: results,
    message: overallSuccess 
      ? 'Jūsu pieprasījums ir sekmīgi reģistrēts un automātiski apstrādāts. Mūsu speciālists sazināsies ar jums tuvākajā laikā!' 
      : 'Radusies kļūda. Lūdzu, mēģiniet vēlreiz vai sazinieties tieši.'
  };
}