'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from './embla/EmblaCarouselDotButton';
import { PrevButton, NextButton, usePrevNextButtons } from './embla/EmblaCarouselArrowButtons';
import SupabaseImage from './SupabaseImage';
import { Inputs } from '../../types/types';
import Link from 'next/link';

type Props = {
  cours: Inputs[];
};

const CourseChild = (props: Props) => {
  const { cours } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const OPTIONS: EmblaOptionsType = { align: 'start', containScroll: true };
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  console.log(cours);

  return (
    <div className='embla' ref={emblaRef}>
      <div className='embla__container embla-flex'>
        {cours.map((cour) => (
          <div className='emba__slide slide' key={cour.id}>
            {cour.imageUrl && (
              <SupabaseImage src={cour.imageUrl} alt={cour.titre} width={100} height={100} location={'cours_images'} />
            )}
            <Link href={`/cours-preview/${cour.id}`} className='card-title'>{cour.titre}</Link>
            <p className='card-description'>
              {cour.description.length > 100 ? cour.description.substring(0, 120) + '...' : cour.description}
            </p>
            <div className='card-link'>
              {cour.user && (
                <>
                  <p className='card-link-author'>
                    {cour.user.firstname} {cour.user.lastname}
                  </p>
                  <Link className='card-link-img' href={`/cours/${cour.id}`}>
                    Cours
                  </Link>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className='embla__controls'>
        <div className='embla__buttons'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className='embla__dots'>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(index === selectedIndex ? ' embla__dot--selected' : '')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseChild;

