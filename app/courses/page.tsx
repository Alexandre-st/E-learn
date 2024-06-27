import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liste des cours',
};

const Courses = () => {
  return (
    <section className='container'>
      <h1>Liste des cours</h1>
    </section>
  );
};

export default Courses;
