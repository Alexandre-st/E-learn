import {useFieldArray, useFormContext} from "react-hook-form";

const AnswerComponent: React.FC<{ quizIndex: number, questionIndex: number }> = ({ quizIndex, questionIndex }) => {
    const { control, register } = useFormContext();

    const { fields: answerFields, append: appendAnswer, remove: removeAnswer } = useFieldArray({
        control,
        name: `contents.${quizIndex}.value.questions.${questionIndex}.answers`,
    });

    return (
        <div>
            {answerFields.map((answerField, answerIndex) => (
                <div key={answerField.id}>
                    <input
                        type="text"
                        {...register(`contents.${quizIndex}.value.questions.${questionIndex}.answers.${answerIndex}`, { required: true })}
                    />
                    <button type="button" onClick={() => removeAnswer(answerIndex)}>Remove Answer</button>
                </div>
            ))}
            <button type="button" onClick={() => appendAnswer("")}>Add Answer</button>
        </div>
    );
};

export default AnswerComponent;