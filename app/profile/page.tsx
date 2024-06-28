import { differenceInDays } from 'date-fns';
import { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { typeCourses } from '../../types/types';
import { createClient } from '../../utils/supabase/client';
import profilePic from '../assets/Profile_pic.svg';
import CoursComponent from '../components/CoursComponent';
import { getUser } from '../hooks/getUser';

export const metadata: Metadata = {
  title: 'Profil',
};

const Profile: React.FC = async () => {
  const user = await getUser();
  const supabase = createClient();
  const { data: cours, error } = await supabase
    .from('cours')
    .select('*, user (id, firstname, lastname, role)')
    .eq('user', user.id);

  if (!user) {
    redirect('/login');
  }

  // To manage the date for the user inscription
  const currentDate = new Date();
  const date = differenceInDays(currentDate, user.created_at);

  return (
    <section className='profile'>
      <div className='container'>
        <div className='profile-header'>
          <h1 className='mid-title'>Dashboard</h1>
          <button className='button'>Modifier mon profil</button>
        </div>
        <div className='profile-content'>
          <div className='profile-content-image'>
            <Image src={profilePic} alt={`${user.firstname} picture`} />
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
        <div className='profile-course'>
          {user.role === 'professeur' && (
            <div className='profile-course-content'>
              <h2 className='mid-title'>
                Mes <span className='blue'>Cours</span>
              </h2>
              <div className='card-container'>
                {cours.map((cour: typeCourses) => (
                  <CoursComponent cour={cour} key={cour.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;

