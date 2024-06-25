import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';

const Profile: React.FC = async () => {
  const supabase = createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/login');
  }
  
  return (
    <div className='container'>
      <h1>Profile Page</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
