'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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

  // Debugging logs
  // console.log('Fetch Error:', fetchError);
  // console.log('User Data:', userData);
  // console.log('Data email:', data.email);
  // console.log('Data password:', data.password);

  if (fetchError || !userData) {
    console.error('User not found or fetch error:', fetchError);
    return redirect('/error');
  }

  // Verify the password
  const passwordMatch = await bcrypt.compare(data.password, userData.password);
  console.log(passwordMatch);

  if (!passwordMatch) {
    console.error('Invalid password');
    return redirect('/error');
  }

  // Sign in the user
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (loginError) {
    console.error('Login Error:', loginError);
    return redirect('/error');
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
    console.error(signupError);
    redirect('/error');
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
      user_id: user?.id
    },
  ]);

  if (insertError) {
    console.error(insertError);
    redirect('/error');
  }

  // Return success response
  
  // Redirect
  revalidatePath('/', 'layout');
  redirect('/');
}
