"use client"
import React, {useEffect, useState} from 'react';
import YouTube from "react-youtube";
import {Content, CoursEleveProps, Quiz} from "../../types/types";
import {createClient} from '../../utils/supabase/client';
import {getUser} from "../hooks/getUser";


const CoursEleve: React.FC<CoursEleveProps> = ({cours, userId, _onReady, extractYouTubeID}) => {
    const [content, setContent] = useState<Content>(cours.cours_content[0]);
    const [maxStep, setMaxStep] = useState(0);
    const [currentEtape, setCurrentEtape] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState<{ [questionIndex: number]: number }>({});
    const [bool, setBool] = useState(false);
    const [note, setNote] = useState(0);
    const supabase = createClient();

    useEffect(() => {
        const getData = async () => {
            const {
                data: etape,
                error
            } = await supabase.from('user_cours').select('*').eq('user', userId).eq('cours', cours.id).single();
            if (error) {
                console.error("Erreur lors de la récupération de l'étape:", error);
                return;
            }
            setMaxStep(etape.etape);
            handleChangeStep(etape.etape);
        };
        if(userId) getData();

    }, [cours.cours_content, cours.id, userId, supabase]);

    const handleChangeStep = async (index: number) => {
        setContent(cours.cours_content[index]);
        if (cours.cours_content[index].type === 'quiz') {
            const {data} = await supabase
                .from('user_quiz')
                .select('*')
                .eq('user', userId)
                .eq('cours', cours.id)
                .eq('etape', index);
            if (data?.length > 0) {
                setBool(true);
                setQuizAnswers(data[0].quiz);
            } else {
                setBool(false);
                setQuizAnswers({});
            }
        }
        setCurrentEtape(index);
    }

    const handleNextStep = async () => {
        console.log(userId, currentEtape, cours.id);
        const {error} = await supabase
            .from('user_cours')
            .update({etape: currentEtape + 1})
            .eq('user', userId)
            .eq('cours', cours.id);
        if (error) {
            console.error("Erreur lors de la mise à jour de l'étape:", error);
            return;
        }
        await handleChangeStep(currentEtape + 1);
        setMaxStep(currentEtape + 1);
    }

    const handleQuiz = async () => {
        const quiz = content.value as Quiz;
        let correctAnswersCount = 0;

        quiz.questions.forEach((question, qIndex) => {
            if (quizAnswers[qIndex] === question.correctAnswer) {
                correctAnswersCount++;
            }
        });
        const {error} = await supabase
            .from('user_quiz')
            .insert({cours: cours.id, user: userId, etape: currentEtape, quiz: quizAnswers, note: correctAnswersCount});
        await handleChangeStep(currentEtape);
    }

    const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
        setQuizAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: answerIndex,
        }));
    }

    return (
        <>
            <div className={'container'}>
                <button onClick={() => {
                    handleChangeStep(maxStep)
                }}>Allez à la dernière étape validée
                </button>
                <div>
                    {content.type === 'text' &&
                        <>
                            <h3 className={'shy-title'}>{content.title}</h3>
                            <label>{content.value as string}</label>
                            <button onClick={handleNextStep}>Valider l&apos;étape</button>
                        </>
                    }
                    {content.type === "video" && (() => {
                        const videoId = extractYouTubeID(content.value as string);
                        return videoId ? (
                            <>
                                <YouTube videoId={videoId} onReady={_onReady}/>
                                <button onClick={handleNextStep}>Valider l&apos;étape</button>
                            </>
                        ) : (
                            <>
                                <iframe src={content.value as string} title="Video Content"/>
                                <button onClick={handleNextStep}>Valider l&apos;étape</button>
                            </>
                        );
                    })()}
                    {content.type === 'quiz' &&
                        <div>
                            <h2 className={'lil-title'}>{content.title}</h2>
                            {(content.value as Quiz).questions.map((question, qIndex) => (
                                <div key={qIndex}>
                                    <h3 className={'shy-title'}>{question.question}</h3>
                                    <ul>
                                        {question.answers.map((answer, aIndex) => (
                                            <li key={aIndex}>
                                                <label className={'label_answer'}>
                                                    Réponse {aIndex + 1}: {answer}
                                                        <input
                                                            type="checkbox"
                                                            name={`question-${qIndex}`}
                                                            checked={quizAnswers[qIndex] === aIndex}
                                                            onChange={() => handleAnswerChange(qIndex, aIndex)}
                                                            disabled={bool}
                                                        />
                                                </label>
                                            </li>
                                        ))}
                                        {bool &&
                                            <label className={'label_answer'}>Bonne réponse : {question.correctAnswer + 1} - {question.answers[question.correctAnswer]}</label>
                                        }
                                    </ul>
                                </div>
                            ))}
                            {!bool &&
                                <button onClick={handleQuiz}>Valider le quiz</button>
                            }
                            {bool &&
                                <>
                                    <label>Votre note : {note}</label>
                                    <button onClick={handleNextStep}>Etape suivante</button>
                                </>
                            }
                        </div>
                    }
                </div>
                <div>
                    {cours.cours_content.map((contenu, index) => (
                        <div key={index}>
                            {contenu.type === "text" &&
                                <label
                                    onClick={() => handleChangeStep(index)}>Etape {index + 1}: {contenu.title}</label>
                            }
                            {contenu.type === "video" &&
                                <label onClick={() => handleChangeStep(index)}>Etape {index + 1}: Vidéo</label>
                            }
                            {contenu.type === "quiz" &&
                                <label onClick={() => handleChangeStep(index)}>Etape {index + 1}: Quiz</label>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CoursEleve;
