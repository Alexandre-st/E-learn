import React from "react";
import { useFormContext, useFieldArray, Path } from "react-hook-form";
import AnswerComponent from "./AnswerComponent"; // Import the new AnswersComponent

interface Props {
    index: number;
    removeQuiz: () => void;
}

const QuizComponent: React.FC<Props> = ({ index, removeQuiz }) => {
    const { control, register, setValue, getValues } = useFormContext();

    const { fields: questionFields, append: appendQuestion, remove: removeQuestion } = useFieldArray({
        control,
        name: `contents.${index}.value.questions` as Path<typeof control>,
    });

    const handleCorrectAnswerChange = (quizIndex: number, questionIndex: number, answerIndex: number) => {
        const currentQuestions = getValues(`contents.${quizIndex}.value.questions`);
        currentQuestions[questionIndex].correctAnswer = answerIndex;
        setValue(`contents.${quizIndex}.value.questions`, currentQuestions);
    };

    return (
        <div>
            <label className="label_create_course">Quiz Title:</label>
            <input
                type="text"
                {...register(`contents.${index}.title` as const, { required: true })}
            />
            {questionFields.map((questionField, questionIndex) => (
                <div key={questionField.id}>
                    <label className="label_create_course">Question {questionIndex + 1}:</label>
                    <input
                        type="text"
                        {...register(`contents.${index}.value.questions.${questionIndex}.question`, { required: true })}
                    />
                    <AnswerComponent
                        quizIndex={index}
                        questionIndex={questionIndex}
                        handleCorrectAnswerChange={handleCorrectAnswerChange}
                    />
                    <button type="button" onClick={() => removeQuestion(questionIndex)}>Remove Question</button>
                </div>
            ))}
            <button type="button" onClick={() => appendQuestion({ question: "", answers: [""], correctAnswer: 0 })}>
                Add Question
            </button>
            <button type="button" onClick={removeQuiz}>
                Remove Quiz
            </button>
        </div>
    );
};

export default QuizComponent;
