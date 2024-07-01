import React from 'react';
import { useFormContext, useFieldArray, Path } from 'react-hook-form';

interface AnswersComponentProps {
  quizIndex: number;
  questionIndex: number;
  handleCorrectAnswerChange: (quizIndex: number, questionIndex: number, answerIndex: number) => void;
}

const AnswerComponent: React.FC<AnswersComponentProps> = ({ quizIndex, questionIndex, handleCorrectAnswerChange }) => {
  const { control, register, getValues } = useFormContext();

  const {
    fields: answerFields,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: `contents.${quizIndex}.value.questions.${questionIndex}.answers` as Path<typeof control>,
  });

  const correctAnswerIndex = getValues(`contents.${quizIndex}.value.questions.${questionIndex}.correctAnswer`);

  return (
    <>
      <div className='quizContent-answer'>
        {answerFields.map((answerField, answerIndex) => (
          <div key={answerField.id}>
            <div className='inputStyle'>
              <label className='label_answer'>Réponse {answerIndex + 1} :</label>
              <input
                type='text'
                {...register(`contents.${quizIndex}.value.questions.${questionIndex}.answers.${answerIndex}` as const, {
                  required: true,
                })}
              />
            </div>
            <div className='inputStyle radio'>
              <label>Réponse correcte</label>
              <input
                type='radio'
                name={`contents.${quizIndex}.value.questions.${questionIndex}.correctAnswer`}
                checked={correctAnswerIndex === answerIndex}
                onChange={() => handleCorrectAnswerChange(quizIndex, questionIndex, answerIndex)}
              />
            </div>
            <button className='button-white' onClick={() => removeAnswer(answerIndex)}>
              Retirer la réponse
            </button>
          </div>
        ))}
      </div>
      <button className='button' onClick={() => appendAnswer('')}>
        Ajout d&apos;une réponse
      </button>
    </>
  );
};

export default AnswerComponent;

