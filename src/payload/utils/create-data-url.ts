import sharp from 'sharp';

export async function createDataUrl(url: string, mimeType?: string | null): Promise<string> {
  const image = await fetch(url);
  const imageBuffer = await image.arrayBuffer();
  const sharpBuffer = await sharp(imageBuffer).resize(50).toBuffer();
  const dataUrl = `data:${mimeType || 'image/png'};base64,${sharpBuffer.toString('base64')}`;

  return dataUrl;
}
