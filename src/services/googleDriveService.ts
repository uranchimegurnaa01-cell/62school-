export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  iconLink?: string;
  webViewLink?: string;
  webContentLink?: string;
  createdTime?: string;
  size?: string;
}

export interface DriveListResponse {
  files: DriveFile[];
  nextPageToken?: string;
}

/**
 * Searches and lists image files from user's Google Drive.
 */
export async function listDriveImages(
  accessToken: string,
  searchQuery = '',
  pageToken?: string
): Promise<DriveListResponse> {
  const qParts = ["mimeType contains 'image/'", 'trashed = false'];
  if (searchQuery.trim()) {
    // Sanitize search query for Drive q parameter
    const safeQuery = searchQuery.replace(/'/g, "\\'");
    qParts.push(`name contains '${safeQuery}'`);
  }

  const params = new URLSearchParams({
    q: qParts.join(' and '),
    pageSize: '24',
    fields: 'nextPageToken, files(id, name, mimeType, thumbnailLink, webViewLink, webContentLink, createdTime, size)',
    orderBy: 'modifiedTime desc',
  });

  if (pageToken) {
    params.set('pageToken', pageToken);
  }

  const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Google Drive-аас файлууд уншихад алдаа гарлаа');
  }

  return response.json();
}

/**
 * Converts a Google Drive file ID into an optimized direct CDN view URL.
 */
export function getDirectDriveImageUrl(fileId: string): string {
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}
