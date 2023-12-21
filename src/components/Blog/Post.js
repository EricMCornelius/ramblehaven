import {posts} from '@/data/posts';
import PostWrapper from '@/components/Blog/PostWrapper';
import TableOfContents from '@/components/Blog/TableOfContents';

const Post = async ({params}) => {
  const {slug} = params;

  const lookup = posts.filter(p => p.id === slug)[0];
  if (!lookup) {
    return null;
  }

  global.slug = slug;

  return <div className='blog-post-view'>
    {lookup.hide_toc ? null : <TableOfContents toc={lookup.toc}/>}
    <PostWrapper {...lookup}/>
  </div>;
};

export default Post;
