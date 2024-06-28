import { createClient } from '../../utils/supabase/server';
import UserLayout from '../components/UserClient';

export default async function layout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const { data: { user }} = await supabase.auth.getUser();
  
  if (!user) {
    return <div></div>;
  }

  return <UserLayout user={user}>{children}</UserLayout>;
}