'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { Provider } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';
import { typeInputs } from '../../types/types';
import { createClient } from '../../utils/supabase/server';

// To logged to the database
export async function login(data: typeInputs) {
  const supabase = createClient();

  // Fetch the user data from the database
  const { data: userData, error: fetchError } = await supabase
    .from('user')
    .select('email, password')
    .eq('email', data.email)
    .single();

  if (fetchError || !userData) {
    return { error: 'Les informations que vous avez entrées sont incorrectes.' };
  }

  // Verify the password
  const passwordMatch = await bcrypt.compare(data.password, userData.password);

  if (!passwordMatch) {
    return { error: 'Les informations que vous avez entrées sont incorrectes.' };
  }

  // Sign in the user
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (loginError) {
    return { error: 'Les informations que vous avez entrées sont incorrectes.' };
  }

  // Redirect to the home page after successful login
  revalidatePath('/', 'layout');
  return redirect('/');
}

// To signed up to the database
export async function signup(data: typeInputs) {
  const supabase = createClient();
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (signupError) {
    return { error: "Erreur lors de l'inscription." };
  }

  // Get the fresh user who just signed up
  const user = signupData.user;

  // Give the user a default role
  const role = 'user';

  // Hash the password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const { error: insertError } = await supabase.from('user').insert([
    {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: hashedPassword,
      role: role,
      user_id: user?.id,
    },
  ]);

  if (insertError) {
    return { error: "Erreur lors de l'inscription." };
  }

  // Return success response & redirect
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect('/login?message=No provider selected');
  }

  const supabase = createClient();
  const redirectUrl = '/auth/callback';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    redirect('login?message=Could not authenticate user');
  }

  return redirect(data.url);
}

