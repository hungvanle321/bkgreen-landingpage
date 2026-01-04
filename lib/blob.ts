import { put } from '@vercel/blob'

export async function uploadFile(file: File): Promise<string> {
  try {
    // Generate unique filename to prevent conflicts
    const fileExtension = file.name.split('.').pop() || ''
    const uniqueFilename = `${crypto.randomUUID()}.${fileExtension}`

    const blob = await put(uniqueFilename, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    return blob.url
  } catch (error) {
    console.error('Error uploading file:', error)
    throw new Error('Failed to upload file')
  }
}

export async function deleteFile(url: string): Promise<void> {
  try {
    // Skip deletion if URL is relative (not a full blob URL)
    if (!url || !url.startsWith('http')) {
      console.warn('Skipping deletion of relative URL:', url)
      return
    }

    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
    })
  } catch (error) {
    console.error('Error deleting file:', error)
    throw new Error('Failed to delete file')
  }
}