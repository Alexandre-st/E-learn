'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';

const SearchBarComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);

  useEffect(() => {
    const handleSearch = async () => {
      const supabase = createClient();
      if (query.length === 0) {
        setResults([]);
        setNoResults(false);
        return;
      }

      const { data, error } = await supabase
        .from('cours')
        .select('*')
        .ilike('titre', `%${query}%`)
        .range(0, 3); // Limite à 4 résultats

      if (error) {
        console.error(error);
      } else {
        setResults(data);
        setNoResults(data.length === 0);
      }
    };

    const debounceSearch = setTimeout(() => {
      handleSearch();
    }, 300); // Ajoute un délai de 300 ms pour éviter les requêtes trop fréquentes

    return () => clearTimeout(debounceSearch);
  }, [query]);

  return (
    <div className='searchBar'>
      <div className='inputStyle'>
        <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search courses...' />
      </div>
      <button className='button' type='submit'>
        Search
      </button>
      {/* </form> */}
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.titre}</li>
        ))}
      </ul>
      {noResults && <p>Pas de résultats</p>}
    </div>
  );
};

export default SearchBarComponent;

