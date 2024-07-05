'use client';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import QuizComponent from '../components/QuizComponent';
import { getCategories, getUser, goTo } from './action';
import { categorieType, NouveauCoursInputs } from '../../types/types';
import { createClient } from '../../utils/supabase/client';
import { toast } from 'sonner';
import { Metadata } from 'next';

const NouveauCours: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<categorieType>([]);
  const supabase = createClient();
  const methods = useForm<NouveauCoursInputs>({
    defaultValues: {
      title: '',
      description: '',
      contents: [],
      categorie: 1,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = methods;
  const { fields, append, remove } = useFieldArray<NouveauCoursInputs>({
    control,
    name: 'contents',
  });

  useEffect(() => {
    const requestCategories = async () => {
      let categorie = await getCategories();
      setCategories(categorie);
    };
    requestCategories();
  }, []);

  const onSubmit: SubmitHandler<NouveauCoursInputs> = async (formData) => {
    const user = await getUser();

    try {
      let image = null;
      if (imageFile) {
        const { data, error } = await supabase.storage
          .from('cours_images')
          .upload(`/public/${imageFile.name}`, imageFile);

        if (error) {
          if (error.statusCode !== '409') {
            if (error.statusCode === '415') {
              console.error('Error uploading image:', error);
              alert("Erreur lors du téléchargement de l'image: Le type de fichier n'est pas supporté");
              return;
            }
            console.error('Error uploading image:', error);
            alert("Erreur lors du téléchargement de l'image");
            return;
          }
        }
        image = `/public/${imageFile.name}`;
      }

      const { data, error } = await supabase
        .from('cours')
        .insert([
          {
            cours_content: formData.contents,
            titre: formData.title,
            description: formData.description,
            user: user?.id,
            imageUrl: image,
            categories: formData.categorie,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        alert(`Erreur lors de l'insertion des données: ${error.message}`);
        return;
      }

      goTo(`cours/${data.id}`);
      toast('Les données ont été insérées avec succès !');
    } catch (error) {
      // console.error('API error:', error);
      alert('Erreur lors de la communication avec le serveur');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <section className='createCourse container'>
      <FormProvider {...methods}>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <div className='layout_title_course'>
            <h1 className='mid-title'>Enregistrer le cours</h1>
            <button type='submit' className='button'>
              Enregistrer le cours
            </button>
          </div>

          <div className='inputStyle title_course'>
            <label className='shy-title'>Titre du cours :</label>
            <input {...register('title', { required: true })} className='input_create_course' />
            {errors.title && <span>Ce champ est requis</span>}
            <select {...register('categorie', { required: true })}>
              {categories.map((categorie, index) => (
                <option key={index} value={categorie.id}>
                  {categorie.nom}
                </option>
              ))}
            </select>
          </div>

          <div className='inputStyle'>
            <label className='label_create_course'>Description :</label>
            <textarea {...register('description', { required: true })} rows={10} cols={30} />
            {errors.description && <span>Ce champ est requis</span>}
          </div>

          <div className='inputStyle'>
            <label className='label_create_course'>Image du cours :</label>
            <input type='file' onChange={handleImageChange} />
          </div>

          <div className='contentCourse'>
            <h2 className='shy-title'>Contenu du cours</h2>
            {fields.map((field, index) => (
              <div key={field.id}>
                {field.type === 'text' && (
                  <>
                    <div className='inputStyle textContent'>
                      <label className='label_create_course'>Insérez un texte</label>
                      <input
                        {...register(`contents.${index}.title` as const, { required: true })}
                        placeholder="Entrez le titre de l'étape"
                      />
                      <textarea
                        {...register(`contents.${index}.value` as const, { required: true })}
                        rows={10}
                        cols={30}
                        placeholder='Entrez le contenu texte'
                      />
                    </div>
                    <button className='button' onClick={() => remove(index)}>
                      Supprimer ce champ de texte
                    </button>
                  </>
                )}
                {field.type === 'quiz' && (
                  <>
                    <h3 className='shy-title'>Quiz</h3>
                    <QuizComponent index={index} removeQuiz={() => remove(index)} />
                  </>
                )}
                {field.type === 'video' && (
                  <div className='inputStyle videoContent'>
                    <label>Insérez votre lien vidéo YouTube</label>
                    <input
                      {...register(`contents.${index}.value` as const, { required: true })}
                      placeholder='Entrez votre lien vidéo'
                    />
                    <button className='button-white' onClick={() => remove(index)}>
                      Supprimer cette vidéo
                    </button>
                  </div>
                )}
                {errors.contents && errors.contents[index]?.value && <span>Ce champ est requis</span>}
              </div>
            ))}
          </div>
          <section className='creation'>
            <div className='buttonCreate'>
              <button className='button-white' onClick={() => append({ type: 'text', value: '', title: '' })}>
                Ajouter un texte
              </button>
              <button
                className='button-white'
                onClick={() => append({ type: 'quiz', value: { questions: [] }, title: '' })}
              >
                Créer un quiz
              </button>
              <button className='button-white' onClick={() => append({ type: 'video', value: '', title: '' })}>
                Ajouter une vidéo
              </button>
            </div>
          </section>
          <input className='button' type='submit' value='Soumettre' />
        </form>
      </FormProvider>
    </section>
  );
};

export default NouveauCours;

