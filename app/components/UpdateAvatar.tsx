'use client';

import { ChangeEvent, useState } from 'react';
import { createClient } from '../../utils/supabase/client';
import { toast } from 'sonner';

const UpdateAvatar = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (evt: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const supabase = createClient();
    const file = evt.target.files ? evt.target.files[0] : null;

    if (!file) {
      setLoading(false);
      return;
    }

    // Upload the avatar to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(`avatar_${Date.now()}.png`, file);

    if (uploadError) {
      console.log(uploadError);
      toast.error("Erreur lors de l'upload de la photo.");
      setLoading(false);
      return;
    }

    if (uploadData) {
      const avatarUrl = uploadData.path;
      const { data: user, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.log(userError);
        toast.error("Erreur lors de la récupération de l'utilisateur.");
        setLoading(false);
        return;
      }

      const { error: updateError } = await supabase
        .from('user')
        .update([{ avatar: avatarUrl }])
        .eq('user_id', user.user.id);

      if (updateError) {
        toast.error('Erreur lors de la mise à jour du profil utilisateur.');
      } else {
        toast.success('Votre photo a bien été ajoutée.');
      }
    }

    setLoading(false);
  };

  return (
    <>
      <input type='file' id='avatar' onChange={handleFileChange} disabled={loading} />
      {loading && <p>Chargement...</p>}
    </>
  );
};

export default UpdateAvatar;

