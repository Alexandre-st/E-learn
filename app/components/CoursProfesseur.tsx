'use client';
import React from 'react';
import YouTube from 'react-youtube';
import { CoursProfesseurProps, Quiz } from '../../types/types';
import Image from 'next/image';
import SupabaseImage from './SupabaseImage';

const CoursProfesseur: React.FC<CoursProfesseurProps> = ({
  cours,
  isPublished,
  publish,
  _onReady,
  extractYouTubeID,
}) => {

  return (
    <>
      <div className='container coursePreview'>
        {cours.imageUrl && (
          <SupabaseImage alt={cours.titre} src={cours.imageUrl} width={300} height={170} location={'cours_images'} />
        )}
        {!isPublished && (
          <input className="button" type='submit' value='Publier le cours' onClick={publish} />
        )}
        <h1 className='shy-title'>{cours.titre}</h1>
        <p className='text'>{cours.description}</p>
        {cours.cours_content.map((content, index) => (
          <div key={index}>
            {content.type === 'text' && (
              <>
                <p className='text'>{content.title as string}</p>
                <p className='text'>{content.value as string}</p>
              </>
            )}
            {content.type === 'video' &&
              (() => {
                const videoId = extractYouTubeID(content.value as string);
                return videoId ? (
                  <YouTube videoId={videoId} onReady={_onReady} />
                ) : (
                  <iframe src={content.value as string} title='Video Content' />
                );
              })()}
            {content.type === 'quiz' && (
              <div className='quiz-content'>
                <h2 className='shy-title'>{content.title}</h2>
                {(content.value as Quiz).questions.map((question, qIndex) => (
                  <div className='quiz-content' key={qIndex}>
                    <h3>{question.question}</h3>
                    <ul className='quiz-content-element'>
                      {question.answers.map((answer, aIndex) => (
                        <li key={aIndex}>{answer}</li>
                      ))}
                    </ul>
                    <p>Bonne réponse : {question.answers[question.correctAnswer]}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default CoursProfesseur;

