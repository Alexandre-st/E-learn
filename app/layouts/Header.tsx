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
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/about'>About</Link>
          </li>
          <li>Course</li>
          <li>Contact</li>
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

