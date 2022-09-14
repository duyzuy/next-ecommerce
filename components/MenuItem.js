import Link from 'next/link';
const MenuItem = (props) => {
  const { children } = props;
  let classes = 'item';
  props.active === true && (classes = classes.concat(' active'));
  return (
    <li>
      <Link href={props.path}>
        <a className={classes}>{props.name}</a>
      </Link>
      {children}
    </li>
  );
};

export default MenuItem;
