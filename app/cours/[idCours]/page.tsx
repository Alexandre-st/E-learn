"use client"
import React, {useEffect, useState} from 'react';
import {createClient} from '@supabase/supabase-js';
import {getUser} from "../../nouveau-cours/action";
import CoursProfesseur from "../../components/CoursProfesseur";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

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

interface Question {
    question: string;
    answers: string[];
    correctAnswer: number;
}

interface Quiz {
    title: string;
    questions: Question[];
}

type User = {
    id: number;
    role: string;
}

const App = ({params}: { params: { idCours: number } }) => {
    const [cours, setCours] = useState<Inputs | null>(null);
    const [isPublished, setIsPublished] = useState(false);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const getData = async () => {
            const {data: cours, error} = await supabase
                .from('cours')
                .select("*")
                .eq('id', params.idCours)
                .single();

            console.log(cours);

            if (error) {
                console.error('Erreur lors de la récupération des cours:', error);
            } else {
                setCours(cours);
                setIsPublished(cours.isPublic);
                console.log(cours);
            }

            const user = await getUser();
            setUser(user);
            console.log(user.id);
        };
        getData();

    }, [params.idCours]);

    if (!cours) {
        return <div>Loading...</div>;
    }

    const _onReady = (event: any) => {
        event.target.pauseVideo();
    };

    const extractYouTubeID = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const publish = async () => {
        const { } = await supabase
            .from('cours')
            .update({ isPublic: true })
            .eq('id', params.idCours);

        setIsPublished(true);
        alert('Cours publié avec succès !')
    }

    return (
        <>
            {user?.role === "professeur" &&
            <CoursProfesseur
                cours={cours}
                isPublished={isPublished}
                user={user}
                publish={publish}
                _onReady={_onReady}
                extractYouTubeID={extractYouTubeID}
            />
            }
        </>
    );
};

export default App;