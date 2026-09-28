import { RSVPRecord } from '../types';
import { WEDDING_DATA } from '../data/weddingData';

export const GOOGLE_SHEET_STORAGE_KEY = 'school_anniversary_google_sheet_url';

export function getGoogleSheetUrl(): string {
  try {
    const saved = localStorage.getItem(GOOGLE_SHEET_STORAGE_KEY);
    if (saved && saved.trim()) return saved.trim();
  } catch {
    // ignore
  }
  return WEDDING_DATA.googleSheetsWebhookUrl || '';
}

export function saveGoogleSheetUrl(url: string): void {
  try {
    localStorage.setItem(GOOGLE_SHEET_STORAGE_KEY, url.trim());
  } catch {
    // ignore
  }
}

/**
 * Sends RSVP record to the Google Apps Script Webhook.
 * Handles JSON payload, URL-encoded payload, and postData fallbacks to ensure compatibility with all Apps Script configurations.
 */
export async function sendRSVPToGoogleSheet(record: RSVPRecord): Promise<boolean> {
  const url = getGoogleSheetUrl();
  if (!url) return false;

  const payload = {
    date: new Date().toLocaleString('mn-MN'),
    id: record.id,
    name: record.name,
    attending: record.attending ? 'Тийм, ирнэ' : 'Очиж чадахгүй',
    guestCount: record.guestCount,
    phone: record.phone || '',
    note: record.note || '',
  };

  try {
    // Google Apps Script receives plain text best in no-cors mode without CORS preflight failures
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (error) {
    console.error('Fetch no-cors failed, trying URLSearchParams fallback:', error);
    try {
      const params = new URLSearchParams();
      params.append('data', JSON.stringify(payload));
      params.append('name', payload.name);
      params.append('phone', payload.phone);
      params.append('guestCount', String(payload.guestCount));
      params.append('attending', payload.attending);

      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: params,
      });
      return true;
    } catch (e) {
      console.error('Fallback also failed:', e);
      return false;
    }
  }
}
