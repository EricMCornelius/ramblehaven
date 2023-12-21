const TOCTree = props => {
  const {children} = props;
  if (children === undefined || children.length === 0) {
    return null;
  }

  return <ul>{children.map(e => <li key={e.id}><a href={`#${e.id}`} className='nav-link blog-toc-link'>{e.value}</a><TOCTree>{e.children}</TOCTree></li>)}</ul>;
};

const TableOfContents = props => {
  const {hide_toc = false, toc} = props;
  if (hide_toc) {
    return null;
  }

  return <div className='blog-sidebar'>
    <div className='blog-toc'>
      <span className='blog-sidebar-heading'>Summary</span>
      <hr/>
      <TOCTree>{toc}</TOCTree>
    </div>
  </div>
};

export default TableOfContents;
