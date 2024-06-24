import Link from 'next/link';
import ThemeSwitcher from '../components/ThemeSwitcher';

const Header = () => {
  return (
    <header className='header'>
      <nav className='header-container container'>
        <Link href="/">eLearn</Link>
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
          <div className='login'>
            <Link href="/login">login</Link>
          </div>
          <Link href="/signup">Sign up for free</Link>
          <ThemeSwitcher />
        </div>
        <div className='header-menu'>
          <button>Menu</button>
          <nav>
            <ul className='header-menu-mobile'>
              <li>Home</li>
              <li>About</li>
              <li>Course</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>
      </nav>
    </header>
  );
};

export default Header;

