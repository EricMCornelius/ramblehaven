'use client';

import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {usePathname} from 'next/navigation';

const CarouselImpl = props => {
  const path = usePathname();
  const slug = path.replace(/^\/blog\/([^/]+).*$/, '$1');

  const {items = []} = props;

  const resolve_path = src => `/${slug}/${src}`;

  console.log(items);

  return <Carousel width='100%' showThumbs={false}>
    {items.map((src, idx) => src.endsWith('.mp4') ?
      <video width='100%' height='auto' key={src} controls>
        <source src={resolve_path(src)} type='video/mp4'/>
      </video> :
      <img key={src} src={resolve_path(src)}/>
    )}
  </Carousel>;
};

export default CarouselImpl;
