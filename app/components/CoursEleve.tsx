'use client';
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { Content, CoursEleveProps, Quiz, User } from '../../types/types';
import { createClient } from '../../utils/supabase/client';
import { getUser } from '../hooks/getUser';
import { motion } from 'framer-motion';
import { background, backgroundContent } from '../../utils/motion/motion';
// import ActionButtons from './ActionButtons';
import Image from 'next/image';
import openIcon from '../assets/hamburger.svg';
import closeIcon from '../assets/close.svg';

const CoursEleve: React.FC<CoursEleveProps> = ({ cours, _onReady, extractYouTubeID }) => {
  const [content, setContent] = useState<Content>(cours.cours_content[0]);
  const [maxStep, setMaxStep] = useState<number>(0);
  const [currentEtape, setCurrentEtape] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [questionIndex: number]: number }>({});
  const [bool, setBool] = useState<boolean>(false);
  const [note, setNote] = useState<number>(0);
  const supabase = createClient();
  const [openStep, setOpenStep] = useState<boolean>(false);

  const handleClick = () => {
    setOpenStep((prevMenu) => !prevMenu);
  };

  useEffect(() => {
    const getData = async () => {
      const userInfos = await getUser();
      const { data: etape, error } = await supabase
        .from('user_cours')
        .select('*')
        .eq('user', userInfos.id)
        .eq('cours', cours.id)
        .single();

      if (error) {
        console.error("Erreur lors de la récupération de l'étape:", error);
        return;
      }

      setMaxStep(etape.etape);
      setUser(userInfos.id);

      // Si appel de handleChangeStep, le user est null a ce moment
      if (content.type === 'quiz') {
        const { data } = await supabase
          .from('user_quiz')
          .select('*')
          .eq('user', userInfos.id)
          .eq('cours', cours.id)
          .eq('etape', etape.etape);

        if (data && data.length > 0) {
          setBool(true);
          setQuizAnswers(data[0].quiz);
        } else {
          setQuizAnswers({});
        }
      }

      setContent(cours.cours_content[etape.etape]);
      setCurrentEtape(etape.etape);
    };
    getData();
  }, [cours.cours_content, cours.id, supabase, content.type]);

  const handleChangeStep = async (index: number) => {
    setContent(cours.cours_content[index]);

    if (cours.cours_content[index].type === 'quiz') {
      const { data } = await supabase
        .from('user_quiz')
        .select('*')
        .eq('user', user)
        .eq('cours', cours.id)
        .eq('etape', index);

      if (data && data.length > 0) {
        setBool(true);
        setQuizAnswers(data[0].quiz);
      } else {
        setBool(false);
        setQuizAnswers({});
      }
    }

    setCurrentEtape(index);
  };

  const handleNextStep = async () => {
    const { error } = await supabase
      .from('user_cours')
      .update({ etape: currentEtape + 1 })
      .eq('user', user)
      .eq('cours', cours.id);

    if (error) {
      console.error("Erreur lors de la mise à jour de l'étape:", error);
      return;
    }

    await handleChangeStep(currentEtape + 1);
    setMaxStep(currentEtape + 1);
  };

  const handleQuiz = async () => {
    const quiz = content.value as Quiz;
    let correctAnswersCount = 0;

    quiz.questions.forEach((question, qIndex) => {
      if (quizAnswers[qIndex] === question.correctAnswer) {
        correctAnswersCount++;
      }
    });

    const { error } = await supabase
      .from('user_quiz')
      .insert({ cours: cours.id, user: user, etape: currentEtape, quiz: quizAnswers, note: correctAnswersCount });
    await handleChangeStep(currentEtape);
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answerIndex,
    }));
  };

  return (
    <div onClick={() => openStep && handleClick()} className='container liveCourse'>
      <button
        className='button buttonFloat'
        onClick={() => {
          handleChangeStep(maxStep);
        }}
      >
        Allez à la dernière étape validée
      </button>
      <div className='liveCourse-header'>
        {content.type === 'text' && (
          <>
            <h3 className={'shy-title'}>{content.title}</h3>
            <p className='text'>{content.value as string}</p>
            <button className='button' onClick={handleNextStep}>
              Valider l&apos;étape
            </button>
          </>
        )}
        {content.type === 'video' &&
          (() => {
            const videoId = extractYouTubeID(content.value as string);
            return videoId ? (
              <div className='videoContent'>
                <YouTube videoId={videoId} onReady={_onReady} />
                <button className='button' onClick={handleNextStep}>
                  Valider l&apos;étape
                </button>
              </div>
            ) : (
              <div className='videoContent'>
                <iframe src={content.value as string} title='Video Content' />
                <button className='button videoButton' onClick={handleNextStep}>
                  Valider l&apos;étape
                </button>
              </div>
            );
          })()}
        {content.type === 'quiz' && (
          <div>
            <h2 className='lil-title'>{content.title}</h2>
            {(content.value as Quiz).questions.map((question, qIndex) => (
              <div className='quiz-content' key={qIndex}>
                <h3 className='shy-title'>{question.question}</h3>
                <ul className='quiz-content-element'>
                  {question.answers.map((answer, aIndex) => (
                    <li key={aIndex}>
                      <label className={'label_answer'}>
                        {answer}
                        <input
                          type='checkbox'
                          name={`question-${qIndex}`}
                          checked={quizAnswers[qIndex] === aIndex}
                          onChange={() => handleAnswerChange(qIndex, aIndex)}
                          disabled={bool}
                        />
                      </label>
                    </li>
                  ))}
                  {bool && (
                    <label className={'label_answer'}>
                      Bonne réponse : {question.correctAnswer + 1} - {question.answers[question.correctAnswer]}
                    </label>
                  )}
                </ul>
              </div>
            ))}
            {!bool && (
              <button className='button quizButton' onClick={handleQuiz}>
                Valider le quiz
              </button>
            )}
            {bool && (
              <>
                <label>Votre note : {note}</label>
                <button onClick={handleNextStep}>Etape suivante</button>
              </>
            )}
          </div>
        )}
      </div>
      <motion.div
        className='liveCourse-step'
        initial='initial'
        animate={openStep ? 'open' : 'closed'}
        variants={background}
      >
        <Image
          onClick={handleClick}
          src={openStep ? closeIcon : openIcon}
          alt={openStep ? 'Fermer le menu des étapes' : 'Ouvrir le menu des étapes'}
          className='liveCourse-step-img'
        />
        {cours.cours_content.map((contenu, index) => (
          <motion.div key={index} initial='initial' animate={openStep ? 'open' : 'closed'} variants={backgroundContent}>
            {contenu.type === 'text' && (
              <h4 onClick={() => handleChangeStep(index)}>
                Etape {index + 1}: {contenu.title}
              </h4>
            )}
            {contenu.type === 'video' && <h4 onClick={() => handleChangeStep(index)}>Etape {index + 1}: Vidéo</h4>}
            {contenu.type === 'quiz' && <label onClick={() => handleChangeStep(index)}>Etape {index + 1}: Quiz</label>}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CoursEleve;

