import Post from '@/components/Blog/Post';

import {posts} from '@/data/posts';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return posts.map(({id, published}) => ({slug: id}));
};

export default Post;
