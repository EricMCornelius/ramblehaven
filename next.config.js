const {join} = require('path');

const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
    //mdxRs: true
  },
  reactStrictMode: true,
  //swcMinify: true,
  sassOptions: {
    includePaths: [join(__dirname, 'styles')],
    prependData: `@import '_vars.scss';`,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  output: 'export',
  webpack(config, opts) {
    //console.log('WEBPACK CONFIG:', config, opts);
    return config;
  },
  productionBrowserSourceMaps: true
};

module.exports = async () => {
  const prism = require('remark-prism');
  const gfm = await import('remark-gfm').then(x => x.default);

  // https://nickymeuleman.netlify.app/blog/table-of-contents#add-css-ids-to-all-headings
  //const slug = await import('remark-slug').then(x => x.default);

  const withSlugs = await import('rehype-slug').then(x => x?.default ?? x);
  const withToc = await import('@stefanprobst/rehype-extract-toc').then(x => x?.default ?? x);
  const withTocExport = await import('@stefanprobst/rehype-extract-toc/mdx').then(x => x?.default ?? x);

  const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [prism, gfm],
      rehypePlugins: [withSlugs, withToc, withTocExport]
    }
  });

  return withMDX(nextConfig);
};
