'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from './embla/EmblaCarouselDotButton';
import { PrevButton, NextButton, usePrevNextButtons } from './embla/EmblaCarouselArrowButtons';

type Props = {
  cours: string[];
};

const CourseChild = (props: Props) => {
  const { cours } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const OPTIONS: EmblaOptionsType = { align: 'start' };
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <div className='embla' ref={emblaRef}>
      <div className='embla__container'>
        {cours.map(cour => (
          <div className='emba__slide' key={cour.id}>
            <h3>{cour.titre}</h3>
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

