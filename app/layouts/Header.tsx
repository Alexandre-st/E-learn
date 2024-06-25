import Link from 'next/link';
import AuthButton from '../components/AuthButton';
import Menu from '../components/Menu';
import ThemeSwitcher from '../components/ThemeSwitcher';

const Header = () => {
  return (
    <header className='header'>
      <nav className='header-container container'>
        <Link className='header-container-logo' href='/'>eLearn</Link>
        <ul className='navbar'>
          <li>
            <Link href='/'>Accueil</Link>
          </li>
          <li>
            <Link href='/about'>About</Link>
          </li>
          <Link href="/courses">Course</Link>
        </ul>
        <div className='header-user'>
          <AuthButton />
          <ThemeSwitcher />
        </div>
        <Menu />
      </nav> 
    </header>
  );
};

export default Header;

