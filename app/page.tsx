import { Metadata } from 'next';
import SearchBarComponent from './components/SearchBarComponent';
import CategorieComponent from './components/CategorieComponent';
import CoursCarousel from './components/CoursCarousel';
import Image from 'next/image';
import heroImg from './assets/hero.svg';
import RealisationsComponent from './components/RealisationsComponent';
import followImage from './assets/follow.svg';
import Link from 'next/link';

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
          <p className='text'>Certaines versions ont évolués avec le temps, parfois par accidents.</p>
          <SearchBarComponent />
        </div>
      </section>
      <section className='cours'>
        <div className='container cours-container'>
          <h3 className='mid-title'>
            Nos <span className='blue'>Cours à Succès</span>
          </h3>
          <CoursCarousel />
        </div>
      </section>
      <section className='categories'>
        <CategorieComponent />
      </section>

      {/* <section className='realisations'>
        <RealisationsComponent />
      </section> */}

      <section className='follow'>
        <div className='container follow-container'>
          <Image className='follow-image' src={followImage} alt='Follow' />
          <div className='follow-content'>
            <h3 className='shy-title'>
              Rejoins <span className='blue'>gratuitement</span> la plateforme aujourd’hui.
            </h3>
            <p className='text'>
              <i>“Celui qui aime à apprendre est bien près du savoir.”</i> - Confucius
            </p>
            <Link className='button' href="/signup">S&apos;inscrire gratuitement</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

