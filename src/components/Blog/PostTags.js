'use client';

import Link from 'next/link';

const Tag = props => {
  const {children} = props;
  return <Link className='blog-tag' href={`/feed/${children}`}>
    {children}
  </Link>;
};

const Tags = props => {
  const {tags = []} = props;
  return <div className='blog-tags'>
    {tags.map(t => <Tag key={t}>{t}</Tag>)}
  </div>;
};

export default Tags;
