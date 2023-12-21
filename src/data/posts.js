import {default as post_2023_12_20_impl, meta as post_2023_12_20_meta, tableOfContents as post_2023_12_20_toc} from '@/blog/posts/2023/12/20/page.mdx';

export const posts = [
  {id: 'post_2023_12_20', component: post_2023_12_20_impl, ...post_2023_12_20_meta, toc: post_2023_12_20_toc}
].sort((a, b) => b.published.localeCompare(a.published));
export const active_posts = posts.filter(p => new Date(p.published) < new Date());
