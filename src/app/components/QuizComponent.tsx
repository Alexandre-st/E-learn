import React from "react";
import {useFormContext, useFieldArray, useWatch} from "react-hook-form";
import {number} from "prop-types";
import AnswerComponent from "@/app/components/AnswerComponent";

interface Props {
    index: number;
    removeQuiz() : void;
}

type Inputs = {
    title: string;
    description: string;
    contents: Content[];
    isPublic: boolean;
};

type Content = {
    type: "text" | "image" | "link" | "quiz";
    value: string | Quiz;
};

interface Question {
    question: string;
    answers: string[];
    correctAnswer: number;
}

interface Quiz {
    title: string;
    questions: Question[];
}

const QuizComponent: React.FC<Props> = ({ index, removeQuiz }) => {
    const { control, register, watch, formState: { errors} } = useFormContext<Inputs>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: `contents.${index}.value.questions`,
    });

    const addQuestion = () => {
        append({ question: "", answers: [], correctAnswer: 0 });
    };



    return (
        <div>
            <label>Quiz Title:</label>
            <br/>
            <input
                type="text"
                {...register(`contents.${index}.value.title`, {required: true})}
            />
            <button type="button" onClick={removeQuiz}>Remove Quiz</button>
            {errors.title && <span>This field is required</span>}
            {fields.map((questionField, questionIndex) => (
                    <>
                        <div key={questionField.id}>
                            <label>Question:</label>
                            <input
                                type="text"
                                {...register(
                                    `contents.${index}.value.questions.${questionIndex}.question`,
                                    {required: true}
                                )} />
                            <br/>
                            <label>Answers:</label>
                            {questionField.answers.map((answer, answerIndex) => (
                                <div key={answerIndex}>
                                    Réponse {answerIndex + 1} : {" "}
                                    <input
                                        type="text"
                                        {...register(
                                            `contents.${index}.value.questions.${questionIndex}.answers.${answerIndex}`,
                                            {required: true}
                                        )} />
                                </div>
                            ))}
                            <AnswerComponent quizIndex={index} questionIndex={questionIndex} />
                            <label>Correct Answer:</label>
                            <input
                                type="text"
                                {...register(
                                    `contents.${index}.value.questions.${questionIndex}.correctAnswer`,
                                    {required: true}
                                )} />
                        </div>
                        <button type="button" onClick={() => remove(questionIndex)}>Remove Question</button>
                    </>
                )
            )}
            <button type="button" onClick={addQuestion}>
                Add Question
            </button>
        </div>
    );
};

export default QuizComponent;