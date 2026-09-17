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
 * Google Apps Script Web Apps require no-cors mode for cross-origin browser POSTs.
 */
export async function sendRSVPToGoogleSheet(record: RSVPRecord): Promise<boolean> {
  const url = getGoogleSheetUrl();
  if (!url) return false;

  try {
    // Use no-cors mode because Google Apps Script redirects with 302, which standard fetch CORS blocks in browsers
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: new Date().toLocaleString('mn-MN'),
        id: record.id,
        name: record.name,
        attending: record.attending ? 'Оролцоно' : 'Оролцохгүй',
        guestCount: record.guestCount,
        phone: record.phone || '',
        note: record.note || '',
      }),
    });
    return true;
  } catch (error) {
    console.error('Failed to sync RSVP to Google Sheets:', error);
    return false;
  }
}
