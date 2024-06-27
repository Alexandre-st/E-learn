import { Metadata } from 'next';
import LoginForm from '../components/forms/LoginForm';
import { OAuthButtons } from './oAuth-login';

export const metadata: Metadata = {
  title: 'Connexion',
};

const LoginPage = () => {
  return (
    <section className='form-page container'>
      <h1 className='big-title'>Se connecter</h1>
      <LoginForm />
      <OAuthButtons />
    </section>
  );
};

export default LoginPage;

