import React from 'react';
import { useFormContext, useFieldArray, Path } from 'react-hook-form';
import AnswerComponent from './AnswerComponent'; // Import the new AnswersComponent

interface Props {
  index: number;
  removeQuiz: () => void;
}

const QuizComponent: React.FC<Props> = ({ index, removeQuiz }) => {
  const { control, register, setValue, getValues } = useFormContext();

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: `contents.${index}.value.questions` as Path<typeof control>,
  });

  const handleCorrectAnswerChange = (quizIndex: number, questionIndex: number, answerIndex: number) => {
    const currentQuestions = getValues(`contents.${quizIndex}.value.questions`);
    currentQuestions[questionIndex].correctAnswer = answerIndex;
    setValue(`contents.${quizIndex}.value.questions`, currentQuestions);
  };

  return (
    <>
      <div className='inputStyle'>
        <label className='label_create_course'>Quiz Title :</label>
        <input
          type='text'
          {...register(`contents.${index}.title` as const, { required: true })}
          placeholder='Titre du quiz'
        />
      </div>
      {questionFields.map((questionField, questionIndex) => (
        <div className='quizContent' key={questionField.id}>
          <div className='inputStyle'>
            <label htmlFor="" className='label_create_course'>Question {questionIndex + 1} :</label>
            <input
              type='text'
              {...register(`contents.${index}.value.questions.${questionIndex}.question`, { required: true })}
            />
          </div>
          <AnswerComponent
            quizIndex={index}
            questionIndex={questionIndex}
            handleCorrectAnswerChange={handleCorrectAnswerChange}
            removeQuestion={removeQuestion}
          />
          <button className='button-white deleteAnswer' onClick={() => removeQuestion(questionIndex)}>
            Supprimer les réponses
          </button>
        </div>
      ))}
      <div className='quizButton'>
        <button className='button-white' onClick={removeQuiz}>
          Supprimer le quizz
        </button>
        <button className='button' onClick={() => appendQuestion({ question: '', answers: [''], correctAnswer: 0 })}>
          Ajouter une question
        </button>
      </div>
    </>
  );
};

export default QuizComponent;

