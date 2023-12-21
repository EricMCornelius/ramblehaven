import meta from '@/data/meta';
import Feed from '@/components/Blog/Feed';

export const metadata = meta.blog;

const BlogFeed = props => <Feed tag='news' negate/>;

export default BlogFeed;
