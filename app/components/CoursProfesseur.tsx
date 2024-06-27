"use client"
import React from 'react';
import YouTube from "react-youtube";

type Inputs = {
    titre: string;
    description: string;
    cours_content: Content[];
    isPublic: boolean;
    user: number;
};

type Content = {
    type: "text" | "video" | "quiz";
    value: string | Quiz;
};

interface Quiz {
    title: string;
    questions: Question[];
}

interface Question {
    question: string;
    answers: string[];
    correctAnswer: number;
}

interface CoursProfesseurProps {
    cours: Inputs;
    isPublished: boolean;
    user: User | undefined;
    publish: () => void;
    _onReady: (event: any) => void;
    extractYouTubeID: (url: string) => string | null;
}

type User = {
    id: number;
    role: string;
}

const CoursProfesseur: React.FC<CoursProfesseurProps> = ({ cours, isPublished, user, publish, _onReady, extractYouTubeID }) => {
    return (
        <>
            <div className='container'>
                {!isPublished && user?.id === cours.user &&
                    <input type="submit" value="Publier le cours" className="submit_create_course" onClick={publish} />
                }
                <h1>{cours.titre}</h1>
                <p>{cours.description}</p>
                {cours.cours_content.map((content, index) => (
                    <div key={index}>
                        {content.type === "text" && <p>{content.value as string}</p>}
                        {content.type === "video" && (() => {
                            const videoId = extractYouTubeID(content.value as string);
                            return videoId ? (
                                <YouTube videoId={videoId} onReady={_onReady} />
                            ) : (
                                <iframe src={content.value as string} title="Video Content" />
                            );
                        })()}
                        {content.type === "quiz" && (
                            <div>
                                <h2>{(content.value as Quiz).title}</h2>
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
