import { createClient } from '../../utils/supabase/client';

const CategorieComponent = async () => {
  const supabase = createClient();

  let { data: categories } = await supabase.from('categories').select('*').range(0, 11);
  
  return (
    <section className='container categorieComponent'>
      <h2 className='mid-title'>
        Nos <span className='blue'>Catégories</span>
      </h2>

      <div className="categorieComponent-content">
        {categories && categories?.map(categorie => (
          <div className="categorieComponent-content-element" key={categorie.id}>
            <h5>{categorie.nom}</h5>
          </div>
        )) }
      </div>
    </section>
  );
};

export default CategorieComponent;

