import TestimonialCard from '@components/common/testimonial-card'
import SectionHeader from '@components/common/section-header'
import Carousel from '@components/ui/carousel/carousel'
import { testimonials } from '@framework/static/testimonials'
import { testimonialsTwo } from '@framework/static/testimonials-two'
import { SwiperSlide } from 'swiper/react'
import { useEffect, useState } from 'react'

interface TestimonialsProps {
  sectionHeading: string
  className?: string
  type?: 'rounded' | 'circle' | 'list'
}

const breakpoints = {
  '1720': {
    slidesPerView: 4,
  },
  '1366': {
    slidesPerView: 3,
  },
  '1025': {
    slidesPerView: 3,
  },
  '768': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
}

const TestimonialCarousel: React.FC<TestimonialsProps> = ({
  sectionHeading,
  className = 'mb-10 md:mb-12 xl:mb-14 md:pb-1 xl:pb-0',
  type,
}) => {
  const [testimonialsState, setTestimonialsState] = useState(testimonials)
  useEffect(() => {
    type === 'list' && setTestimonialsState(testimonialsTwo)
  }, [type])

  return (
    <div className={`heightFull ${className}`}>
      <SectionHeader sectionHeading={sectionHeading} />
      <Carousel
        autoplay={{
          delay: 4000,
        }}
        breakpoints={breakpoints}
        className='testimonial-carousel'
        scrollbar={{ draggable: true, hide: false }}
        {...(type === 'list'
          ? {
              buttonGroupClassName: '!w-auto !top-0 !end-6',
              type: 'list',
              buttonSize: 'small',
              isFraction: true,
              paginationFractionId: 'testimonialPaginationFraction',
              pagination: {
                el: '#testimonialPaginationFraction',
                type: 'fraction',
                formatFractionCurrent: function (number: number) {
                  return number
                },
              },
              prevActivateId: 'prev',
              nextActivateId: 'next',
            }
          : {
              buttonGroupClassName: 'hidden',
            })}
      >
        {testimonialsState?.map((testimonial, id) => (
          <SwiperSlide key={`testimonial--key-${id}`}>
            <TestimonialCard item={testimonial} type='modern' />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  )
}

export default TestimonialCarousel
