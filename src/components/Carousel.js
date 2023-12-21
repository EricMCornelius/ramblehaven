'use client';

import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {usePathname} from 'next/navigation';

const CarouselImpl = props => {
  const path = usePathname();
  const slug = path.replace(/^\/blog\/([^/]+).*$/, '$1');

  const {images = []} = props;

  const resolve_path = src => `/${slug}/${src}`;

  return <Carousel>
    {images.map((img, idx) => <div key={idx}><img src={resolve_path(img)}/></div>)}
  </Carousel>;
};

export default CarouselImpl;
