'use client';
import { useEffect, useState } from 'react';
import { getUser } from '../../nouveau-cours/action';
import CoursPreviewComponent from '../../components/CoursPreviewComponent';
import { Inputs, User } from '../../../types/types';
import { createClient } from '../../../utils/supabase/client';

const CoursPreview = ({ params }: { params: { idCours: number } }) => {
  const supabase = createClient();
  const [cours, setCours] = useState<Inputs | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getData = async () => {
      const { data: cours, error } = await supabase.from('cours').select('*').eq('id', params.idCours).single();

      // console.log(cours);

      if (error) {
        console.error('Erreur lors de la récupération des cours:', error);
      } else {
        setCours(cours);
        setIsPublished(cours.isPublic);
        // console.log(cours);
      }

      const user = await getUser();
      setUser(user);
      // console.log(user.id);
    };
    
    getData();
  }, [supabase, params.idCours]);

  if (!cours) {
    return <div>Loading...</div>;
  }

  return <>{user?.role === 'professeur' && <CoursPreviewComponent cours={cours} />}</>;
};

export default CoursPreview;

