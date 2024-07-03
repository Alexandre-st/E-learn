'use client';
import React from 'react';
import { CoursPreviewProps } from '../../types/types';
import Image from 'next/image';
import { getUser } from '../hooks/getUser';
import { createUserCours } from '../cours-preview/[idCours]/action';
import SupabaseImage from "./SupabaseImage";
import {goTo} from "../nouveau-cours/action";

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
    goTo(`/cours/${cours.id}`)
  }

  return (
    <div className='container'>
      <div>
        {cours.imageUrl && <SupabaseImage alt='course image' src={cours.imageUrl} width={300} height={170} location={'cours_images'} />}
        <h1 className='title_course'>{cours.titre}</h1>
        <h2>Description</h2>
        <p>{cours.description}</p>
      </div>
      <div>
        {isDone &&
            <p className='completed-course'>Vous avez terminé ce cours !</p>
        }
        {isFollowed &&
            <>
              <input type='submit' value="Aller au cours" className='submit_create_course' onClick={handleGo} />
            </>
        }
        {!isFollowed &&
            <>
          <h2>S&apos;abonner au cours</h2>
          <input type='submit' value="S'abonner" className='submit_create_course' onClick={followCourse} />
          </>
      }
        <h3>Ce cours contient :</h3>
        {texts > 0 && (
          <p>
            <label>{texts} texts</label>
          </p>
        )}
        {videos > 0 && (
          <p>
            <label>{videos} vidéos</label>
          </p>
        )}
        {quizs > 0 && (
          <p>
            <label>{quizs} quizs</label>
          </p>
        )}
      </div>
    </div>
  );
};

export default CoursPreviewComponent;

