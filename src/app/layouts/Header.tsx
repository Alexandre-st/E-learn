import ThemeSwitcher from "../components/ThemeSwitcher";

const Header = () => {
  return (
    <header className='header'>
      <nav className='header-container container'>
        <h2>e-Learn</h2>
        <ul className='navbar'>
          <li>Home</li>
          <li>About</li>
          <li>Course</li>
          <li>Contact</li>
        </ul>
        <div className='header-user'>
          <div className='login'>
            <p>login</p>
          </div>
          <button>Sign up for free</button>
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

