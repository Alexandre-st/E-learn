import { useEffect, useState } from 'react';
import CoursPreviewComponent from '../../components/CoursPreviewComponent';
import {Inputs, userCoursType} from '../../../types/types';
import { createClient } from '../../../utils/supabase/client';
import {getUser} from "../../hooks/getUser";


const CoursPreview = async ({ params }: { params: { idCours: number } }) => {
  const supabase = createClient();

  const { data: cours, error } = await supabase.from('cours').select('*').eq('id', params.idCours).single();

  const user = await getUser();

  // const userCours: userCoursType;
  const {data: userCours} = await supabase.from('user_cours').select('*').eq('user', user.id).eq('cours', params.idCours);
console.log(userCours.length > 0 && userCours[0].termine);
  if (!cours) {
    return <div>Loading...</div>;
  }

  return <><CoursPreviewComponent cours={cours} isDone={userCours.length > 0 && userCours[0].termine} isFollowed={userCours.length > 0}/></>;
};

export default CoursPreview;

