import Link from 'next/link';
import { typeCourses } from '../../types/types';

type Props = {
  cour: typeCourses;
  isFollowed: boolean;
};

const CoursComponent = async (props: Props) => {
  const { cour } = props;  
  
  return (
    <div className='card'>
      <Link href={`/cours-preview/${cour.id}`} className='card-title'>
        {cour.titre}
      </Link>
      <p className='card-description'>
        {cour.description.length > 100 ? cour.description.substring(0, 120) + '...' : cour.description}
      </p>
      <div className='card-link'>
        {cour.user && (
          <>
            <p className='card-link-author'>
              {cour.user.firstname} {cour.user.lastname}
            </p>
            {props.isFollowed && (
              <Link className='card-link-img' href={`/cours/${cour.id}`}>
                Continuer le cours
              </Link>
            )}
            {!props.isFollowed && (
              <Link className='card-link-img' href={`/cours-preview/${cour.id}`}>
                Voir le cours
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoursComponent;

