import Link from 'next/link';
import Tags from '@/components/Blog/PostTags';

const PostSummary = post => {
  const {component: PostContent, ...meta} = post;
  const {tags = [], author, published} = meta;

  const href = tags.indexOf('news') !== -1 ? `/news/${meta.id}` : `/blog/${meta.id}`;

  return <div className='blog-post-container'>
    <Tags tags={tags}/>
    <Link href={href}>
      <div className='blog-post-summary markdown-body'>
        <PostContent/>
      </div>
    </Link>
  </div>;
};

export default PostSummary;
