'use server';

import { createClient } from '../../utils/supabase/server';
import {redirect} from "next/navigation";

const supabase = createClient();

export async function getUser() {
  let {data: { user }} = await supabase.auth.getUser();

  let { data: userPublic, error } = await supabase
      .from('user')
      .select('*')
      .eq('user_id', user?.id)
      .single();

  console.log(userPublic);
  return userPublic;
}

export async function goTo(id: string)  {
  redirect(id);
}

export async function getCategories(){
  let { data: categories, error } = await supabase
      .from('categories')
      .select('*')

  return categories;
}

