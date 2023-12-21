import Tags from '@/components/Blog/PostTags';

const PostWrapper = post => {
  const {component: PostContent, ...meta} = post;
  const {tags = [], author, published} = meta;

  return <div className='blog-post-container'>
    <Tags tags={tags}/>
    <div className='blog-post markdown-body'>
      <PostContent/>
    </div>
  </div>;
};

export default PostWrapper;
