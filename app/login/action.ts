'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { Provider } from '@supabase/supabase-js';
import { typeInputs } from '../../types/types';
import { createClient } from '../../utils/supabase/server';

// To logged to the database
export async function login(data: typeInputs) {
  const supabase = createClient();

  // Sign in the user
  const { data: signInData, error: loginError } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (loginError) {
    return { error: 'Les informations que vous avez entrées sont incorrectes.' };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    return { error: 'Impossible de récupérer les informations utilisateur.' };
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

  const { error: insertError } = await supabase.from('user').insert([
    {
      firstname: data.firstname,
      lastname: data.lastname,
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

// To update user information
export async function updateUser(data: typeInputs) {
  const supabase = createClient();

  const { data: updateData, error: updateError } = await supabase.auth.updateUser({
    password: data.password,
  });

  if (updateError) {
    return { error: 'Erreur lors de la modification du profile' };
  }

  // Get the fresh user who just updated his profile
  const user = updateData.user;

  const updates: any = {};

  if (data.firstname) updates.firstname = data.firstname;
  if (data.lastname) updates.lastname = data.lastname;
  if (data.avatar) updates.avatar = data.avatar;

  const { error: insertError } = await supabase.from('user').update([updates]).eq('user_id', user.id);

  if (insertError) {
    return { error: "Erreur lors de l'inscription." };
  }
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

