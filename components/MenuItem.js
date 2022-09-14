import Link from 'next/link';
const MenuItem = (props) => {
  const { children } = props;
  return (
    <li>
      <Link href={props.path}>
        <a className={`item ${props.active && 'active'}`}>{props.name}</a>
      </Link>
      {children}
    </li>
  );
};

export default MenuItem;
