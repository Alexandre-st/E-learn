import { differenceInDays } from 'date-fns';
import { Metadata } from 'next';
import Image from 'next/image';
import { getUser } from '../../hooks/getUser';
import { createClient } from '../../../utils/supabase/client';
import UpdateProfile from '../../components/UpdateProfile';
import profilePic from '../../assets/Profile_pic.svg';
import SupabaseImage from '../../components/SupabaseImage';
import UpdateAvatar from '../../components/UpdateAvatar';
import { typeCourses } from '../../../types/types';
import CoursComponent from '../../components/CoursComponent';

export const metadata: Metadata = {
  title: 'Profil',
};

const Profile: React.FC = async () => {
  const user = await getUser();
  const supabase = createClient();
  const { data: cours } = await supabase
    .from('cours')
    .select('*, user (id, firstname, lastname, role, avatar)')
    .eq('user', user.id);

  const { data: coursSuivis } = await supabase.from('user_cours').select('cours (*)').eq('user', user.id);

  // To manage the date for the user inscription
  const currentDate = new Date();
  const date = differenceInDays(currentDate, user.created_at);

  return (
    <section className='profile'>
      <div className='container'>
        <div className='profile-header'>
          <h1 className='mid-title'>Dashboard</h1>
          <UpdateProfile user={user} />
        </div>
        <div className='profile-content'>
          <div className='profile-content-image'>
            {user.avatar ? (
              <SupabaseImage src={user.avatar} width={100} height={100} location='avatars' alt={user.firstname + 'picture'} />
            ) : (
              <Image src={profilePic} alt={user.firstname + 'picture'} priority={false} />
            )}
            <UpdateAvatar />
          </div>
          <div className='profile-content-name'>
            <h3 className='shy-title'>
              {user.firstname} {user.lastname}
            </h3>
            <p className='text'>
              Inscrit sur la plateforme depuis - {date} {date > 1 ? 'jours' : 'jour'}
            </p>
          </div>
        </div>
        {/* <p>{user.email}</p> */}
        {coursSuivis && coursSuivis?.length > 0 && (
          <div className='profile-course'>
            <h2 className='mid-title'>
              Mes <span className='blue'>Cours</span> Suivis
            </h2>
            <div className='card-container'>
              {coursSuivis?.map((courSuivi) => (
                <CoursComponent cour={courSuivi.cours} key={courSuivi.cours.id} isFollowed={true} />
              ))}
            </div>
          </div>
        )}
        {user.role === 'professeur' && cours?.length > 0 && (
          <div className='profile-course'>
            <div className='profile-course-content'>
              <h2 className='mid-title'>
                Mes <span className='blue'>Cours</span>
              </h2>
              <div className='card-container'>
                {cours?.map((cour: typeCourses) => (
                  <CoursComponent cour={cour} key={cour.id} isFollowed={true} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;

