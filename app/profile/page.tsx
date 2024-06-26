import { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import profilePic from '../assets/Profile_pic.svg';
import { getUser } from '../hooks/getUser';

export const metadata: Metadata = {
  title: 'Profil',
};

const Profile: React.FC = async () => {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const calculateDateDifference = (inputDate: string): number => {
    const currentDate = new Date();
    const dateToCompare = new Date(inputDate);

    const differenceInMilliseconds = currentDate.getTime() - dateToCompare.getTime();
    const differenceInSeconds = differenceInMilliseconds / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    const differenceInDays = differenceInHours / 24;

    return Math.floor(differenceInDays);
  };

  const inputDate: string = '2024-06-25T10:22:41.280098+00:00';
  const differenceInDays: number = calculateDateDifference(inputDate);

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
              Inscrit sur la plateforme depuis - {differenceInDays} {differenceInDays > 1 ? 'jours' : 'jour'}
            </p>
          </div>
        </div>
        {/* <p>{user.email}</p> */}
      </div>
    </section>
  );
};

export default Profile;

