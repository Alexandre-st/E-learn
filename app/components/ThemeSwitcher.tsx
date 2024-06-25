'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import moonIcon from '../assets/icon-moon.svg';
import sunIcon from '../assets/icon-sun.svg';

const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  // Ensures the component is only rendered on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevents rendering on the server
  if (!mounted) return null;

  return (
    <>
      {resolvedTheme === 'dark' ? (
        <Image className='theme' src={sunIcon} alt='Passer en couleur clair' onClick={() => setTheme('light')} width={12} height={12} />
      ) : (
        <Image className='theme' src={moonIcon} alt='Passer en couleur sombre' onClick={() => setTheme('dark')} width={12} height={12} />
      )}
    </>
  );
};

export default ThemeSwitcher;

