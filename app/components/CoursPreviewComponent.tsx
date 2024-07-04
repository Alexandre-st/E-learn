'use client';
import React from 'react';
import { CoursPreviewProps } from '../../types/types';
import Image from 'next/image';
import { getUser } from '../hooks/getUser';
import { createUserCours } from '../cours-preview/[idCours]/action';
import SupabaseImage from './SupabaseImage';
import { goTo } from '../nouveau-cours/action';

const CoursPreviewComponent: React.FC<CoursPreviewProps> = ({ cours, isDone, isFollowed }) => {
  const followCourse = async () => {
    const user = await getUser();
    const error = await createUserCours(user.id, cours.id);
    if (error) {
      console.log(error);
      return;
    }
  };

  let videos = 0;
  let texts = 0;
  let quizs = 0;
  cours.cours_content.map((content) => {
    if (content.type == 'video') {
      videos = videos + 1;
    } else if (content.type === 'text') {
      texts = texts + 1;
    } else {
      quizs = quizs + 1;
    }
  });

  const handleGo = () => {
    goTo(`/cours/${cours.id}`);
  };

  return (
    <div className='container coursePreview'>
      <div>
        {cours.imageUrl && (
          <SupabaseImage alt={cours.titre} src={cours.imageUrl} width={300} height={170} location={'cours_images'} />
        )}
        <h1 className='shy-title'>{cours.titre}</h1>
      </div>
      <div className='coursePreview-content'>
        <p className='text'>{cours.description}</p>

        <aside className='coursePreview-aside'>
          {isDone && <p className='completed-course text'>Vous avez terminé ce cours !</p>}
          {isFollowed && (
            <>
              <h3 className='submit_create_course'>Accéder au cours</h3>
              <button className='button' onClick={handleGo}>
                Aller au cours
              </button>
            </>
          )}
          {!isFollowed && (
            <>
              <h3 className='submit_create_course'>S&apos;abonner au cours</h3>
              <button className='button' onClick={followCourse}>
                S&apos;abonner
              </button>
            </>
          )}
          <h3 className='coursePreview-aside-element'>Ce cours contient :</h3>
          <div className='coursePreview-aside-element-p'>
            {texts > 0 && (
              <p className='text'>
                {texts} {texts > 1 ? 'textes' : 'texte'}
              </p>
            )}
            {videos > 0 && (
              <p className='text'>
                {videos} {videos > 1 ? 'videos' : 'video'}
              </p>
            )}
            {quizs > 0 && (
              <p className='text'>
                {quizs} {quizs > 1 ? 'quizs' : 'quiz'}
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CoursPreviewComponent;

