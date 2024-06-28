"use server";
import { createClient } from '../../../utils/supabase/server';
import {redirect} from "next/navigation";

export async function createUserCours(idUser: number, idCours: number){
    const supabase = createClient();

    const { data, error } = await supabase
        .from('user_cours')
        .insert([
            { cours: idCours, user: idUser, etape: 0 },
        ])
        .select()

    // redirect(`/cours/${idCours}`);

    return error;
}