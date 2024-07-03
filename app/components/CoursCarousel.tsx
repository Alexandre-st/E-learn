import { createClient } from "../../utils/supabase/client";
import CourseChild from "./CourseChild";

const CoursCarousel = async () => {
  const supabase = createClient();

  const { data: cours } = await supabase.from('cours').select('*').eq('isPublic', true).order('created_at', { ascending: false }).range(0,15);

  console.log(cours);
  
  return (
    <div className="container">
      <CourseChild cours={cours} />
    </div>
  );
}
 
export default CoursCarousel;