import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Votre plateforme de e-Learning',
};
export default function Home() {
  return (
    <main>
      <div className='container'>
        <h1>Hello World</h1>
      </div>
    </main>
  );
}

