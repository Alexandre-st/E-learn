import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '',
  description: '',
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

