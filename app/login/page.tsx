import { Metadata } from 'next';
import LoginForm from '../components/forms/LoginForm';
import { OAuthButtons } from './oAuth-login';

export const metadata: Metadata = {
  title: 'Connexion',
};

const LoginPage = () => {
  return (
    <section className='container'>
      <LoginForm />
      <OAuthButtons />
    </section>
  );
};

export default LoginPage;

