import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';
import SignUpForm from '../components/forms/SignUpForm';

const SignUpPage = async () => {
  const supabase = createClient();
  const {data: { session }} = await supabase.auth.getSession();

  if (session) {
    return redirect('/');
  }
  return (
    <section className='container'>
      <SignUpForm />
    </section>
  );
};

export default SignUpPage;
