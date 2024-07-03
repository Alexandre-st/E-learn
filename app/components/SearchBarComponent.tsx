'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';
import Link from 'next/link';

const SearchBarComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);

  console.log(results);

  useEffect(() => {
    const handleSearch = async () => {
      const supabase = createClient();
      if (query.length === 0) {
        setResults([]);
        setNoResults(false);
        return;
      }

      const { data, error } = await supabase.from('cours').select('*').ilike('titre', `%${query}%`).range(0, 3); // Limite à 4 résultats
      
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
    <div className='searchBar form'>
      <div className='inputStyle'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Rechercher votre cours...'
        />
      </div>
      {results.length > 0 && (
        <>
          <ul className='searchBar-results'>
            {results.map((result) => (
              <li key={result.id}>
                <Link href={`cours-preview/${result.id}`}>
                  {result.titre}
                </Link>
              </li>
            ))}
          </ul>
          {noResults && <p>Pas de résultats</p>}
        </>
      )}
    </div>
  );
};

export default SearchBarComponent;

