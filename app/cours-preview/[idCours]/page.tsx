"use client"
import React, {useEffect, useState} from 'react';
import {createClient} from '@supabase/supabase-js';
import {getUser} from "../../nouveau-cours/action";
import CoursPreview from "../../components/CoursPreview";
import {Inputs, User} from "../../../types/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);


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

    return (
        <>
            {user?.role === "professeur" &&
            <CoursPreview
                cours={cours}
                isPublished={isPublished}
                user={user}
            />
            }
        </>
    );
};

export default App;
