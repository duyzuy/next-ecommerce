import { Container, Header } from 'semantic-ui-react';
import Image from 'next/image';
import Button from '../components/Button';
import styles from '../styles/banner.module.scss';
import * as Icon from 'react-feather';
const SingleBanner = (props) => {
  const { banner } = props;
  return (
    <div className={`ec__section ${styles.single_banner}`}>
      <Container>
        <div className="banner-wrapper">
          <div className="col-left">
            <div className="banner-content">
              <Header size="large">Nhà bếp sài gòn</Header>
              <p className="sub-content">Không gian sang trọng đẳng cấp</p>
              <Button
                type="link"
                href="/product"
                outline
                color="light"
                icon={() => <Icon.ArrowRight size={14} />}
                iconPosition="right"
              >
                Tìm hiểu ngay
              </Button>
            </div>
          </div>
          <div className="col-right">
            <div className="image">
              <Image
                src={'/assets/images/banner-ktc.png'}
                layout="fill"
                alt="nha bep saigon"
                objectFit="cover"
                objectPosition="center center"
                placeholder="blur"
                blurDataURL={'/assets/images/banner-ktc.png'}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleBanner;
