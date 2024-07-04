'use client';
import { useEffect, useState } from 'react';
import CoursProfesseur from '../../components/CoursProfesseur';
import { Inputs, User } from '../../../types/types';
import { getUser } from '../../nouveau-cours/action';
import CoursEleve from '../../components/CoursEleve';
import { createClient } from '../../../utils/supabase/client';
import { toast } from 'sonner';

const IdCours = ({ params }: { params: { idCours: number } }) => {
  const supabase = createClient();
  const [cours, setCours] = useState<Inputs | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getData = async () => {
      const { data: cours, error } = await supabase.from('cours').select('*').eq('id', params.idCours).single();

      if (error) {
        console.error('Erreur lors de la récupération des cours:', error);
      } else {
        setCours(cours);
        setIsPublished(cours.isPublic);
      }

      const user = await getUser();
      setUser(user);
    };
    getData();
  }, [supabase, params.idCours]);

  if (!cours) {
    return <div>Loading...</div>;
  }

  const _onReady = (event: any) => {
    event.target.pauseVideo();
  };

  const extractYouTubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const publish = async () => {
    const {} = await supabase.from('cours').update({ isPublic: true }).eq('id', params.idCours);

    setIsPublished(true);
    toast.success('Cours publié avec succès !');
  };

  return (
    <>
      {user?.id === cours.user && (
        <CoursProfesseur
          cours={cours}
          isPublished={isPublished}
          publish={publish}
          _onReady={_onReady}
          extractYouTubeID={extractYouTubeID}
        />
      )}
      {user?.id !== cours.user && (
        <CoursEleve cours={cours} userId={user?.id} _onReady={_onReady} extractYouTubeID={extractYouTubeID} />
      )}
    </>
  );
};

export default IdCours;

