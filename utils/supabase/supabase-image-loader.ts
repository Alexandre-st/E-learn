import Image from 'next/image';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
  location: string;
}

export const imageLoader = ({ src, width, quality, location }: ImageLoaderParams) => {
  const widthParam = width || 300;
  const qualityParam = quality ?? 75;

  return `${supabaseUrl}/storage/v1/object/public/${location}/${src}?width=${widthParam}&quality=${qualityParam}`;
};

