"use client"
import React from 'react';
import YouTube from "react-youtube";
import {CoursProfesseurProps, Quiz} from "../../types/types";
import Image from 'next/image';

const CoursProfesseur: React.FC<CoursProfesseurProps> = ({cours, isPublished, publish, _onReady, extractYouTubeID}) => {
    return (
        <>
            <div>
                {cours.imageUrl &&
                    <Image alt="course image" src={cours.imageUrl} width={300} height={170}/>
                }
                {!isPublished &&
                    <input type="submit" value="Publier le cours" className="submit_create_course" onClick={publish}/>
                }
                <h1>{cours.titre}</h1>
                <p>{cours.description}</p>
                {cours.cours_content.map((content, index) => (
                    <div key={index}>
                        {content.type === "text" &&
                            <>
                                <p>{content.title as string}</p>
                                <p>{content.value as string}</p>
                            </>}
                        {content.type === "video" && (() => {
                            const videoId = extractYouTubeID(content.value as string);
                            return videoId ? (
                                <YouTube videoId={videoId} onReady={_onReady}/>
                            ) : (
                                <iframe src={content.value as string} title="Video Content"/>
                            );
                        })()}
                        {content.type === "quiz" && (
                            <div>
                                <h2>{content.title}</h2>
                                {(content.value as Quiz).questions.map((question, qIndex) => (
                                    <div key={qIndex}>
                                        <h3>{question.question}</h3>
                                        <ul>
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
