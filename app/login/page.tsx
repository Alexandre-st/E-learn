import { login, signup } from './action';

const LoginPage = () => {
  return (
    <section className='container'>
      <form>
        <label htmlFor='email'>Email:</label>
        <input id='email' name='email' type='email' autoComplete='email' required />
        <label htmlFor='password'>Password:</label>
        <input id='password' name='password' type='password' autoComplete='new-password' required />
        <button formAction={login}>Log in</button>
        {/* <button formAction={signup}>Sign up</button> */}
      </form>
    </section>
  );
};

export default LoginPage;

