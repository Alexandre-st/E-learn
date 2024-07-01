import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';

export default async function AuthButton() {
  const supabase = createClient();
  const { data: { user }} = await supabase.auth.getUser();
  const { data: userInfos } = await supabase.from('user').select('*').eq('user_id', user?.id).single();

  const signOut = async () => {
    'use server';
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect('/login');
  };
  
  return (
    <>
    {!user ? (
      <div className='header-user-content'>
        <Link className='subscribe' href='/signup'>S&apos;inscrire</Link>
        <Link className='button' href='/login'>Se connecter</Link>
      </div>
    ) : (
      <div className='header-user-content'>
        <form className='logout' action={signOut}>
          <button type='submit'>Se déconnecter</button>
        </form>
        {userInfos?.role === 'professeur' ? (
          <Link className='button' href='/nouveau-cours'>Nouveau Cours</Link>
        ) : (
          <Link className='button' href='/profile'>Mon Profil</Link>
        )}
      </div>
    )}
  </>
  );
}

