import { createClient } from '../../utils/supabase/client';
import CourseChild from './CourseChild';

const CoursCarousel = async () => {
  const supabase = createClient();

  const { data: cours } = await supabase
    .from('cours')
    .select('*, user (id, firstname, lastname)')
    .eq('isPublic', true)
    .order('created_at', { ascending: false })
    .range(0, 7);

  return <CourseChild cours={cours} />;
};

export default CoursCarousel;
