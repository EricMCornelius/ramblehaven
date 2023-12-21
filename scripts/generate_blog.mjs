#!/usr/bin/env runner

import {mkdir, writeFile, symlink} from 'node:fs/promises';
import {resolve, dirname} from 'node:path';
import list_files from 'src/utils/list_files';

const gen_page = slug => `'use client'
import ${slug} from '@/blog/posts/${slug}/page.mdx';

export default ${slug};
`;

const posts = [];

for await (const file of list_files('src/blog')) {
  let slug = null;

  const is_post = file.endsWith('page.mdx');

  if (is_post) {
    slug = file.replace(/blog\/posts\/(.*)\/page.mdx/, '$1').replace(/\//g, '_').replace(/^src_/, '');
    slug = `post_${slug}`;
    posts.push({slug, file: file.replace(/^src\//, '@/')});
  }

  const imports = posts.reduce((agg, post) => `${agg}import {default as ${post.slug}_impl, meta as ${post.slug}_meta, tableOfContents as ${post.slug}_toc} from '${post.file}';\n`, '');
  const exports = posts.map(p => `  {id: '${p.slug}', component: ${p.slug}_impl, ...${p.slug}_meta, toc: ${p.slug}_toc}`).join(',\n');
  const all_posts = `export const posts = [\n${exports}\n].sort((a, b) => b.published.localeCompare(a.published));`;
  const active_posts = `export const active_posts = posts.filter(p => new Date(p.published) < new Date());`;
  await writeFile('src/data/posts.js', `${imports}\n${all_posts}\n${active_posts}\n`);

  if (is_post) {
    const post_dir = dirname(file);
    try {
      await symlink(resolve(post_dir), `public/${slug}`);
    }
    catch (err) {

    }
  }
}
