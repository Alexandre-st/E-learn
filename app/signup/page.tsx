import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';
import SignUpForm from '../components/forms/SignUpForm';

export const metadata: Metadata = {
  title: 'Inscription',
};

const SignUpPage = async () => {
  const supabase = createClient();
  const {data: { session }} = await supabase.auth.getSession();

  if (session) {
    return redirect('/');
  }
  return (
    <section className='form-page container'>
      <h1 className='big-title'>S&apos;inscrire</h1>
      <SignUpForm />
    </section>
  );
};

export default SignUpPage;

