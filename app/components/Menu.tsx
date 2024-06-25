'use client';
import Image from 'next/image';
import { useState } from 'react';
import closeIcon from '../assets/close.svg';
import hamburgerIcon from '../assets/hamburger.svg';
import ThemeSwitcher from './ThemeSwitcher';

const Menu = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const handleMenu = () => {
    setToggleMenu((prevMenu) => !prevMenu);
  };

  return (
    <div className='header-menu'>
      <ThemeSwitcher />
      {toggleMenu ? (
        <Image onClick={handleMenu} src={hamburgerIcon} alt='Ouvrir le menu' />
      ) : (
        <Image onClick={handleMenu} src={closeIcon} alt='Ferme le menu' />
      )}
      {/* <Image src={hamburgerIcon} alt='Ouvrir le menu' /> */}
      <nav className='header-menu-mobile'>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Course</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;

