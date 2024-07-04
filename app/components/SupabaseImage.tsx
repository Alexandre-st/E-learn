// SupabaseImage.tsx
"use client";
import Image from 'next/image';
import { imageLoader } from '../../utils/supabase/supabase-image-loader';

type SupabaseImageProps = {
  src: string;
  width: number;
  quality?: number | undefined;
  location: string;
  height: number;
  alt: string;
};

const SupabaseImage: React.FC<SupabaseImageProps> = ({ src, width, quality, height, location, alt }) => {
  return (
    <Image
      loader={(params) => imageLoader({ ...params, location })}
      src={src}
      width={width}
      quality={quality ?? 75}
      height={height}
      alt={alt}
      priority={false}
    />
  );
};

export default SupabaseImage;
