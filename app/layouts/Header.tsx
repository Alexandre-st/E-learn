import Link from 'next/link';
import AuthButton from '../components/AuthButton';
import Menu from '../components/Menu';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { createClient } from '../../utils/supabase/server';
// import { getUser } from '../hooks/getUser';

const Header = async () => {
  const supabase = createClient();
  const { data: { user }} = await supabase.auth.getUser();
  const { data: userInfos } = await supabase.from('user').select('*').eq('user_id', user?.id).single();
  
  return (
    <header className='header'>
      <nav className='header-container container'>
        <Link className='header-container-logo' href='/'>
          eLearn
        </Link>
        <ul className='navbar'>
          <li>
            <Link href='/'>Accueil</Link>
          </li>
          <li>
            <Link href='/about'>About</Link>
          </li>
          <Link href='/cours'>Cours</Link>
          {userInfos?.role === 'professeur' && (
            <li>
              <Link href='/profile'>Mon Profil</Link>
            </li>
          )}
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

