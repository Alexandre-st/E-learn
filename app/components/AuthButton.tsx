import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";

export default async function AuthButton () {
  const supabase = createClient();
  const {data: { user }} = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect('/login');
  }

  return (
    <>
      {!user ? (
        <div className='header-user-content'>
          <Link className='login' href='/login'>
            login
          </Link>
          <Link href='/signup'>Sign up for free</Link>
        </div>
      ) : (
        <div className='header-user-content'>
          <form action={signOut}>
            <button>Logout</button>
          </form>
          <Link href='/signup'>Mon Profil</Link>
        </div>
      )}
    </>
  )
}