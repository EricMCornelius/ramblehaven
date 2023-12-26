import Image from 'next/image';
import Carousel from '@/components/Carousel';

const ResponsiveImage = props => {
  const {style, src, alt, ...rest} = props;

  // TODO: figure out better way to access current static context than assigning to globals...
  const {slug} = global;

  console.log('IMAGE:', props, slug);

  const resolved = `/${slug}/${src}`;

  return <div style={{position: 'relative', height: 'min(400px, 50vh)', ...style}}>
    <Image src={resolved} alt={alt} style={{width: '100%', objectFit: 'contain', backgroundColor: 'transparent'}} sizes='(max-width: 768) 50vh, (max-width: 1200px) 50vw, 33vw' fill {...rest} />
  </div>;
};

const Video = props => {
  const {src} = props;

  // TODO: figure out better way to access current static context than assigning to globals...
  const {slug} = global;

  console.log('VIDEO:', props, slug);

  const resolved = `/${slug}/${src}`;

  return <source {...props} src={resolved}/>;
};

export function useMDXComponents(components) {
  return {
    ...components,
    Carousel,
    img: ResponsiveImage,
    Image: ResponsiveImage,
    VideoSource: Video
  };
}
