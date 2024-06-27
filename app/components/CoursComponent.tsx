import Link from 'next/link';
import { typeCourses } from '../../types/types';

type Props = {
  cour: typeCourses;
};

const CoursComponent = (props: Props) => {
  const { cour } = props;

  return (
    <div className='card'>
      <h3 className='card-title'>{cour.titre}</h3>
      <p className='card-description'>{cour.description}</p>

      <div className='card-link'>
        {cour.user && (
          <>
            <p className='card-link-author'>
              {cour.user.firstname} {cour.user.lastname}
            </p>
            <Link className='card-link-img' href={`/cours/${cour.user.id}`}>Cours</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CoursComponent;

