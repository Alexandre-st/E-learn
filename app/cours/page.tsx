import { Metadata } from 'next';
import { typeCourses } from '../../types/types';
import { createClient } from '../../utils/supabase/client';
import CoursComponent from '../components/CoursComponent';

export const metadata: Metadata = {
  title: 'Liste des cours',
};

const Cours = async () => {
  const supabase = createClient();

  let { data: cours } = await supabase.from('cours').select('*, user (id, firstname, lastname, role)');

  return (
    <section className='container'>
      <h1 className='mid-title'>Liste des cours</h1>
      <div className='card-container'>
        {cours?.map((cour: typeCourses) => (
          <CoursComponent cour={cour} key={cour.id} />
        ))}
      </div>
    </section>
  );
};

export default Cours;

