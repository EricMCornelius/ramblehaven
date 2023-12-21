'use client';

import {active_posts} from '@/data/posts';
import Link from 'next/link';
import {format, formatDistanceToNow} from 'date-fns';
import {usePathname} from 'next/navigation';

const PostSummary = props => {
  const {id, title, published, resource, tags = []} = props;

  //const time = formatDistanceToNow(new Date(published), {addSuffix: true, includeSeconds: true});
  const time = format(new Date(published), 'MMM d, y');

  const href = resource === 'feed' ? (tags.indexOf('news') !== -1 ? `/news/${id}` : `/blog/${id}`) : `/${resource}/${id}/`;

  return <li className='blog-sidebar-item'>
    <Link className='nav-link' href={href}>{title ?? id}<br/>{time}</Link>
  </li>;
};

const Sidebar = props => {
  const {resource, label, posts} = props;

  return <div className='blog-sidebar'>
    <span className='blog-toc'>
      <span className='blog-sidebar-heading'>{label}</span>
      <hr className='blog-separator'/>
      <ul className='blog-sidebar-items'>
        {posts.map(p => <PostSummary key={p.id} resource={resource} {...p}/>)}
      </ul>
    </span>
  </div>;
}

const has_tag = tag => tag === 'all' ? p => true : p => (p?.tags ?? []).indexOf(tag) !== -1;
const do_negate = status => !status ? fn => (...args) => fn(...args) : fn => (...args) => !fn(...args);

const Layout = props => {
  const {children, negate = false, tag = 'all', label, params = {}} = props;
  const filter_tag = tag ?? params.tag;

  const path = usePathname();

  const [resource, instance] = path.split('/').filter(x => x !== '');
  const is_feed = resource === 'feed' || instance === undefined;

  // avoid double-wrapping tag feed
  if (resource === 'feed' && instance !== undefined && !params.tag) {
    return children;
  }

  const posts = active_posts.filter(do_negate(negate)(has_tag(filter_tag)));

  return <div className={`blog ${is_feed ? 'feed' : ''}`}>
    <div className='blog-content'>
      {!is_feed ? null : <Sidebar resource={resource} label={label} posts={posts}/>}
      <div className='blog-posts'>
        {children}
      </div>
    </div>
  </div>;
};

export default Layout;
