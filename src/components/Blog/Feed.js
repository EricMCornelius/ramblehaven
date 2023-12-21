import {active_posts as posts} from '@/data/posts';

import PostSummary from '@/components/Blog/PostSummary';

const has_tag = tag => tag === 'all' ? p => true : p => (p?.tags ?? []).indexOf(tag) !== -1;
const do_negate = status => !status ? fn => (...args) => fn(...args) : fn => (...args) => !fn(...args);

const Feed = props => {
  const {tag = 'all', negate = false} = props;
  const filter = do_negate(negate)(has_tag(tag));
  const filtered_posts = posts.filter(filter);

  return filtered_posts.map(p => <section key={p.id}>
    <PostSummary {...p}/>
    <hr/>
  </section>);
};

export default Feed;
