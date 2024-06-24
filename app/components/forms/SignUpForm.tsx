'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signup } from '../../login/action';

export type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const password = watch('password');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signup(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='email'>Email:</label>
      <input
        {...register('email', { 
          required: "L'adresse email est obligatoire", 
          pattern: { 
            value: regexEmail, 
            message: "L'email que vous utilisez est incorrect" 
          }
        })}
        aria-invalid={errors.email ? 'true' : 'false'}
        autoComplete='email'
      />
      {errors.email && <p role='alert'>{errors.email.message}</p>}

      <label htmlFor='password'>Password:</label>
      <input 
        {...register('password', { 
          required: "Le mot de passe est obligatoire", 
          minLength: { 
            value: 8, 
            message: "Le mot de passe doit contenir au moins 8 caractères" 
          } 
        })} 
        autoComplete='current-password' 
      />
      {errors.password && <p role='alert'>{errors.password.message}</p>}

      <label htmlFor='confirmPassword'>Confirmez votre mot de passe :</label>
      <input 
        {...register('confirmPassword', { 
          required: "La confirmation du mot de passe est obligatoire", 
          validate: value =>
            value === password || "Les mots de passe ne correspondent pas"
        })} 
      />
      {errors.confirmPassword && <p role='alert'>{errors.confirmPassword.message}</p>}

      <button type="submit">S&apos;inscrire</button>
    </form>
  );
};

export default SignUpForm;

