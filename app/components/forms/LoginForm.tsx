'use client';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { typeInputs } from '../../../types/types';
import loginPicture from '../../assets/login_picture.svg';
import { login } from '../../login/action';

const LoginForm = () => {
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [error, setError] = useState<string | null>(null);

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
    const response = await login(data);

    if (response && response.error) {
      setError(response.error);
    }
  };

  return (
    <section className='login'>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='inputStyle'>
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
        </div>
        <div className='inputStyle'>
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
        </div>
        {error && <p role='alert'>{error}</p>}
        <button className='button'>Se connecter</button>
      </form>
      <Image className='login-image' src={loginPicture} alt="Illustration de l'authentification" />
    </section>
  );
};

export default LoginForm;

