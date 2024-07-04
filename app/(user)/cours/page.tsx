import { Metadata } from 'next';
import { createClient } from '../../../utils/supabase/client';
import { getUser } from '../../hooks/getUser';
import CoursComponent from '../../components/CoursComponent';
// import { typeCourses, typeCoursSuivis } from '../../types/types';
// import { createClient } from '../../utils/supabase/client';
// import CoursComponent from '../components/CoursComponent';
// import { getUser } from '../hooks/getUser';

export const metadata: Metadata = {
  title: 'Liste des cours',
};

const Cours = async () => {
  const supabase = createClient();

  let { data: cours } = await supabase
    .from('cours')
    .select('*, user (id, firstname, lastname, role)')
    .eq('isPublic', true);

  let user = await getUser();

  const { data: coursSuivis } = await supabase.from('user_cours').select('cours ()').eq('user', user.id);

  // Extraire les identifiants des cours suivis
  const coursSuivisIds = coursSuivis?.map((courSuivi) => courSuivi.cours.id);

  // Filtrer les cours pour ne garder que ceux suivis par l'utilisateur
  const coursFollowed = cours?.filter((cour) => coursSuivisIds?.includes(cour.id));
  const coursNotFollowed = cours?.filter((cour) => !coursSuivisIds?.includes(cour.id));
  return (
    <section className='container'>
      <h1 className='mid-title'>Liste des cours</h1>
      <div className='card-container'>
        {cours?.map((cour) => (
          <>
            {coursFollowed.includes(cour) && <CoursComponent cour={cour} key={cour.id} isFollowed={true} />}
            {coursNotFollowed.includes(cour) && <CoursComponent cour={cour} key={cour.id} isFollowed={false} />}
          </>
        ))}
      </div>
    </section>
  );
};

export default Cours;

