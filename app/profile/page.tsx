import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';

const Profile: React.FC = async () => {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }
  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
};

export default Profile;
