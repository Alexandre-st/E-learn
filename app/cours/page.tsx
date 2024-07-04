import { Metadata } from 'next';
import { typeCourses, typeCoursSuivis } from '../../types/types';
import { createClient } from '../../utils/supabase/client';
import CoursComponent from '../components/CoursComponent';
import { getUser } from '../hooks/getUser';

export const metadata: Metadata = {
  title: 'Liste des cours',
};

const Cours = async () => {
  const supabase = createClient();

  let { data: cours } = await supabase
    .from('cours')
    .select('*, user (id, firstname, lastname, role)')
    .eq('isPublic', true);



  // console.log(coursFollowed, coursNotFollowed);
  return (
    <section className='container'>
      <h1 className='mid-title'>Liste des cours</h1>
      <div className='card-container'>
        {cours?.map((cour) => (
          <CoursComponent cour={cour} key={cour.id} />
        ))}

        {/* {user ? (
          <>
            {cours?.map((cour) => (
              <>
                {coursFollowed.includes(cour) && <CoursComponent cour={cour} key={cour.id} isFollowed={true} />}
                {coursNotFollowed.includes(cour) && <CoursComponent cour={cour} key={cour.id} isFollowed={false} />}
              </>
            ))}
          </>
        ) : (
          <CoursComponent cour={cours} key={cours.id} isFollowed={false} />
        )} */}
      </div>
    </section>
  );
};

export default Cours;

