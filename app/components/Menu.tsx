'use client';
import Image from 'next/image';
import { useState } from 'react';
import closeIcon from '../assets/close.svg';
import hamburgerIcon from '../assets/hamburger.svg';
import ThemeSwitcher from './ThemeSwitcher';
import { backgroundMenu } from '../../utils/motion/motion';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AuthButton from './AuthButton';

const Menu = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const handleMenu = () => {
    setToggleMenu((prevMenu) => !prevMenu);
  };

  return (
    <div className='header-menu'>
      <ThemeSwitcher />
      {!toggleMenu ? (
        <Image className="header-menu-image" onClick={handleMenu} src={hamburgerIcon} alt='Ouvrir le menu' />
      ) : (
        <Image className="header-menu-image" onClick={handleMenu} src={closeIcon} alt='Ferme le menu' />
      )}
      <motion.div
        className='header-menu-background'
        initial='initial'
        animate={toggleMenu ? 'open' : 'closed'}
        variants={backgroundMenu}
      >
        <nav className='header-menu-mobile'>
          <ul>
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/cours">Cours</Link></li>
          </ul>
        </nav>
      </motion.div>
    </div>
  );
};

export default Menu;

