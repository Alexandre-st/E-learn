'use server';

import { createClient } from '../../utils/supabase/server';
import {redirect} from "next/navigation";

export async function getUser() {
  const supabase = createClient();

  let {data: { user }} = await supabase.auth.getUser();

  let { data: userPublic, error } = await supabase
      .from('user')
      .select('*')
      .eq('user_id', user?.id)
      .single();

  console.log(userPublic);
  return userPublic;
}

export async function goTo(id: number|string)  {
  redirect(`/cours/${id}`);
}

