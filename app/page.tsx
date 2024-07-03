import { Metadata } from 'next';
import SearchBarComponent from './components/SearchBarComponent';
import CategorieComponent from './components/CategorieComponent';
import CoursCarousel from './components/CoursCarousel';
import Image from 'next/image';
import heroImg from './assets/hero.svg';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Votre plateforme de e-Learning',
};
export default function Home() {
  return (
    <main>
      <section className='container hero'>
        <Image className='hero-image' src={heroImg} alt='Illustration pour le hero' />
        <div className='hero-content'>
          <h1 className='big-title'>
            Accéder aux cours de <span className='blue'>nombreux</span> Instructeurs & Institutions
          </h1>
          <p className="text">Certaines versions ont évolués avec le temps, parfois par accidents.</p>
          <SearchBarComponent />
        </div>
      </section>
      <section className='categories'>
        <CategorieComponent />
      </section>

      <div className='cours'>
        <CoursCarousel />
      </div>

      <section className='realisations'>
        <h2>Nos réalisations</h2>
      </section>
    </main>
  );
}

