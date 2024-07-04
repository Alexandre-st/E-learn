// import { useEffect, useState } from 'react';
import { createClient } from '../../../utils/supabase/client';
import { getUser } from '../../hooks/getUser';
import CoursPreviewComponent from '../../components/CoursPreviewComponent';

const CoursPreview = async ({ params }: { params: { idCours: number } }) => {
  const supabase = createClient();

  const { data: cours, error } = await supabase.from('cours').select('*').eq('id', params.idCours).single();

  const user = await getUser();

  let userCourse: [];

  if (user) {
    const { data: userCours } = await supabase
      .from('user_cours')
      .select('*')
      .eq('user', user.id)
      .eq('cours', params.idCours);

      if (userCours) {
        userCourse = userCours;
      }
  } else {
    userCourse = [];
  }
  // const userCours: userCoursType;
  // console.log(userCours.length > 0 && userCours[0].termine);
  if (!cours) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {user ? (
      <CoursPreviewComponent
        cours={cours}
        isDone={userCourse && userCourse[0]?.termine}
        isFollowed={userCourse.length > 0}
      />
      
    ) : (
      <CoursPreviewComponent
        cours={cours}
        isDone={false}
        isFollowed={false}
      />
    )}
    </>
  );
};

export default CoursPreview;

