"use client"
// pages/index.tsx
import React from "react";
import QuizComponent from "../components/QuizComponent";
import { FormProvider, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { createClient } from '@supabase/supabase-js';

type Inputs = {
    title: string;
    description: string;
    contents: Content[];
};

type Content = {
    type: "text" | "video" | "quiz";
    value: string | Quiz;
};

interface Question {
    question: string;
    answers: string[];
    correctAnswer: number; // Changed to number
}

interface Quiz {
    title: string;
    questions: Question[];
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const App: React.FC = () => {
    const methods = useForm<Inputs>({
        defaultValues: {
            title: "",
            description: "",
            contents: [],
        },
    });

    const { register, handleSubmit, formState: { errors }, control } = methods;

    const { fields, append, remove } = useFieldArray<Inputs>({
        control,
        name: "contents",
    });

    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
        console.log("Submitting form data:", formData);

        try {
            const { data, error } = await supabase
                .from('cours')
                .insert([
                    { cours_content: formData.contents, titre: formData.title, description: formData.description },
                ]);

            if (error) {
                console.error('Supabase insert error:', error);
                alert(`Erreur lors de l'insertion des données: ${error.message}`);
                return;
            }

            console.log('Supabase insert data:', data);
            alert('Les données ont été insérées avec succès !');

        } catch (error) {
            console.error('API error:', error);
            alert('Erreur lors de la communication avec le serveur');
        }
    };

    return (
        <>

        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} style={{textAlign: "center"}}>
                <div className="layout_title_course">
                    <h1 className="title_course">Création de cours</h1>
                    <input type="submit" value="Enregistrer le cours" className="submit_create_course"/>
                </div>

                <div>
                    <label className="title_course">Titre du cours :</label>
                    <input {...register("title", {required: true})} className="input_create_course"/>
                    {errors.title && <span>Ce champ est requis</span>}
                </div>
                <br/>

                <div>
                    <label className="label_create_course">Description :</label>
                    <input {...register("description", {required: true})} />
                    {errors.description && <span>Ce champ est requis</span>}
                </div>
                <br/>

                <div>
                    {fields.map((field, index) => (
                        <div key={field.id}>
                            {field.type === "text" && (
                                <>
                                    <label className="label_create_course">Insérez un texte</label>
                                    <br/>
                                    <textarea
                                        {...register(`contents.${index}.value` as const, {required: true})}
                                        placeholder="Entrez votre contenu texte"
                                    />
                                    <br/>
                                    <button type="button" onClick={() => remove(index)}>Supprimer ce champ de texte
                                    </button>
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
                                    <label className="label_create_course">Insérez votre lien vidéo YouTube</label>
                                    <br/>
                                    <textarea
                                        {...register(`contents.${index}.value` as const, {required: true})}
                                        placeholder="Entrez votre lien vidéo"
                                    />
                                    <br/>
                                    <button type="button" onClick={() => remove(index)}>Supprimer cette vidéo</button>
                                    <br/>
                                </>
                            )}
                            {errors.contents && errors.contents[index]?.value && (
                                <span>Ce champ est requis</span>
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

                <input type="submit" value="Soumettre"/>
            </form>
        </FormProvider>
        </>
    );
};

export default App;
