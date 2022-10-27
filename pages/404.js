import { Container, Header } from 'semantic-ui-react';
import * as Icon from 'react-feather';
import styles from '../styles/page404.module.scss';
import Link from 'next/link';
const Page404 = () => {
  return (
    <>
      <Container>
        <div className={styles.page__404}>
          <div className="icon">
            <Icon.Frown size={120} />
          </div>
          <div className="number-404">404</div>

          <div className="content">
            <Header>Oops!. Không tìm thấy trang theo yêu cầu</Header>
            <p>Nhấn vào đây để quay về cửa hàng</p>
            <Link href="/product">
              <a>
                <Icon.ShoppingBag size={16} /> Cua hang
              </a>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Page404;
export function getServerSideProps(ctx) {
  console.log(ctx);

  return {
    props: {}
  };
}
