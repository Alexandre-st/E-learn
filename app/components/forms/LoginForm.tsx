'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { typeInputs } from '../../../types/types';
import { login } from '../../login/action';

const LoginForm = () => {
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<typeInputs> = async (data) => {
    await login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='email'>Email:</label>
      <input
        type='email'
        id='email'
        {...register('email', {
          required: "L'adresse email est obligatoire",
          pattern: {
            value: regexEmail,
            message: "L'email que vous utilisez est incorrect",
          },
        })}
        aria-invalid={errors.email ? 'true' : 'false'}
        autoComplete='email'
      />
      {errors.email && <p role='alert'>{errors.email.message}</p>}
      <label htmlFor='password'>Password:</label>
      <label htmlFor='password'>Password:</label>
      <input
        type='password'
        id='password'
        {...register('password', {
          required: 'Le mot de passe est obligatoire',
        })}
        autoComplete='current-password'
      />
      {errors.password && <p role='alert'>{errors.password.message}</p>}
      <button>Log in</button>
    </form>
  );
};

export default LoginForm;
