import { Metadata } from 'next';
import SearchBarComponent from './components/SearchBarComponent';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Votre plateforme de e-Learning',
};
export default function Home() {
  return (
    <main>
      <div className='container hero'>
        <h1 className='big-title'>Accéder aux cours de <span className='blue'>nombreux</span> Instructeurs & Institutions</h1>
        <SearchBarComponent />
      </div>
    </main>
  );
}

