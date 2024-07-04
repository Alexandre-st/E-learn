'use server';
import { createClient } from '../../utils/supabase/server';

export async function getUser() {
  const supabase = createClient();
  let {data: { user }} = await supabase.auth.getUser();
  
  let { data: userPublic } = await supabase.from('user').select('*').eq('user_id', user?.id).single();
  return userPublic;
  // return user;
}

