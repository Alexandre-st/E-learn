'use client';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { typeInputs } from '../../../types/types';
import { signup } from '../../login/action';

const SignUpForm = () => {
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<typeInputs>({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const password = watch('password');

  const onSubmit: SubmitHandler<typeInputs> = async (data) => {
    const response = await signup(data);
    
    if (response && response.error) {
      setError(response.error);
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div className='inputStyle'>
        <label htmlFor='firstname'>Prénom</label>
        <input type='text' id='firstname' {...register('firstname', { required: 'Le prénom est obligatoire' })} />
        {errors.firstname && <p role='alert'>{errors.firstname.message}</p>}
      </div>
      <div className='inputStyle'>
        <label htmlFor='lastname'>Nom</label>
        <input type='text' id='lastname' {...register('lastname', { required: 'Le nom est obligatoire' })} />
        {errors.lastname && <p role='alert'>{errors.lastname.message}</p>}
      </div>
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
            minLength: {
              value: 8,
              message: 'Le mot de passe doit contenir au moins 8 caractères',
            },
          })}
          autoComplete='current-password'
        />
        {errors.password && <p role='alert'>{errors.password.message}</p>}
      </div>
      <div className='inputStyle'>
        <label htmlFor='confirmPassword'>Confirmez votre mot de passe :</label>
        <input
          type='password'
          id='confirmPassword'
          {...register('confirmPassword', {
            required: 'La confirmation du mot de passe est obligatoire',
            validate: (value) => value === password || 'Les mots de passe ne correspondent pas',
          })}
          autoComplete='current-password'
        />
        {errors.confirmPassword && <p role='alert'>{errors.confirmPassword.message}</p>}
      </div>
      {error && <p className="alert" role='alert'>{error}</p>}
      <button className='button' type='submit'>S&apos;inscrire</button>
    </form>
  );
};

export default SignUpForm;

