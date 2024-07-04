'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { typeInputs, typeUser } from '../../../types/types';
import { updateUser } from '../../login/action';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
  user: typeUser;
  setShowModal: (value: boolean) => void;
};

const UpdateForm = (props: Props) => {
  const { user, setShowModal } = props;
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<typeInputs>({
    defaultValues: {
      firstname: '',
      lastname: '',
      avatar: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<typeInputs> = async (data) => {
    const response = await updateUser(data);

    if (response && response.error) {
      setError(response.error);
      setShowModal(true);
    } else {
      setShowModal(false);
      toast('Votre profil à été modifié');
    }
  };

  return (
    <section className='modal-form'>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <div className='inputStyle'>
          <label htmlFor='avatar'>Modifier votre photo de profil</label>
        </div>
        <div className='inputStyle'>
          <label htmlFor='firstname'>Prénom</label>
          <input type='text' id='firstname' {...register('firstname')} placeholder={user.firstname} />
        </div>
        <div className='inputStyle'>
          <label htmlFor='lastname'>Nom</label>
          <input type='text' id='lastname' {...register('lastname')} placeholder={user.lastname} />
        </div>
        <div className='inputStyle'>
          <label htmlFor='password'>Mot de passe :</label>
          <input
            id='password'
            {...register('password', {
              minLength: {
                value: 8,
                message: 'Le mot de passe doit contenir au moins 8 caractères',
              },
            })}
            type='password'
            placeholder='Nouveau mot de passe'
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
          />
          {errors.confirmPassword && <p role='alert'>{errors.confirmPassword.message}</p>}
        </div>
        {error && (
          <p className='alert' role='alert'>
            {error}
          </p>
        )}
        <button className='button' type='submit'>
          Modifier le profil
        </button>
      </form>
    </section>
  );
};

export default UpdateForm;

