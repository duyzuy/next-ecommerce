import Link from 'next/link';
import { Container } from 'semantic-ui-react';
const Breadcrumb = (props) => {
  const { items } = props;
  const itemCount = items.length;

  const BreadItem = ({ href, name, current, isLast }) => {
    return current !== true ? (
      <>
        <span className="bread-item">
          <Link href={href}>
            <a dangerouslySetInnerHTML={{ __html: name }}></a>
          </Link>
        </span>
        {isLast !== true && <span className="bread-space">/</span>}
      </>
    ) : (
      <>
        <span
          className="bread-item"
          dangerouslySetInnerHTML={{ __html: name }}
        ></span>
        {isLast !== true && <span className="bread-space">/</span>}
      </>
    );
  };
  return (
    <div className="ec__breadcrumb">
      <Container>
        <div className="breadcrumb">
          {items.map((item, index) => (
            <BreadItem
              key={index}
              href={item.href}
              name={item.name}
              isLast={itemCount - 1 === index}
              current={item.current}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
export default Breadcrumb;
