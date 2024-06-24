import { signup } from '../login/action';

const SignUpPage = () => {
  return (
    <section className='container'>
      <form>
        <label htmlFor='email'>Email:</label>
        <input id='email' name='email' type='email' autoComplete='email' required />
        <label htmlFor='password'>Password:</label>
        <input id='password' name='password' type='password' autoComplete='current-password' required />
        <button formAction={signup}>Sign up</button>
      </form>
    </section>
  );
};

export default SignUpPage;

