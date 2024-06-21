"use client"
import QuizComponent from "@/app/components/QuizComponent";
import {FormProvider, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import React from "react";
import YouTube from "react-youtube";

type Inputs = {
    title: string;
    description: string;
    contents: Content[];
    isPublic: boolean;
};

type Content = {
    type: "text" | "video" | "quiz";
    value: string | Quiz;
};

interface Question {
    question: string;
    answers: string[];
    correctAnswer: string;
}

interface Quiz {
    title: string;
    questions: Question[];
}

const App = () => {
    const methods = useForm<Inputs>({
        defaultValues: {
        },
    });

    const { register, handleSubmit, formState: { errors }, control } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "contents",
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        data.isPublic = false;
        console.log(data);
    }

    const _onReady = (e: any) => {
        e.target.pauseVideo();
    }

    return (
        <><FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Titre :</label>
                    <input {...register("title", {required: true})} />
                    {errors.title && <span>This field is required</span>}
                </div>
                <br/>

                <div>
                    <label>Description :</label>
                    <input {...register("description", {required: true})} />
                    {errors.description && <span>This field is required</span>}
                </div>
                <br/>

                <div>
                    {fields.map((field, index) => (
                        <div key={field.id}>
                            {field.type === "text" && (
                                <>
                                <label>Insérez un texte</label>
                                <br />
                                    <textarea
                                        {...register(`contents.${index}.value`, {required: true})}
                                        placeholder="Entrez votre contenu texte"/>
                                    <br />
                                    <button type={"button"} onClick={() => remove(index)}>Supprimer ce champ de texte</button>
                                </>
                            )}
                            {field.type === "quiz" && (
                                <>
                                    <QuizComponent index={index} removeQuiz={() => remove(index)}/>
                                    <br/>
                                </>
                            )}
                            {field.type === "video" && (
                                <>
                                    <label>Insérez votre lien vidéo YouTube</label>
                                    <br/>
                                    <textarea
                                        {...register(`contents.${index}.value`, {required: true})}
                                        placeholder="Entrez votre lien vidéo"/>
                                    <br />
                                    <button type={"button"} onClick={() => remove(index)}>Supprimer cette vidéo</button>
                                    <br/>
                                </>
                            )}
                            {errors.contents && errors.contents[index]?.value && (
                                <span>This field is required</span>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={() => append({type: "text", value: ""})}
                >
                    Ajouter un texte
                </button>
                <button
                    type="button"
                    onClick={() => append({type: "quiz", value: {title: "", questions: []}})}
                >
                    Créer un quiz
                </button>
                <button
                    type="button"
                    onClick={() => append({type: "video", value: ""})}
                >
                    Ajouter une vidéo
                </button>
                <br/>

                <input type="submit"/>
            </form>
        </FormProvider>
        </>
    );
};

export default App;