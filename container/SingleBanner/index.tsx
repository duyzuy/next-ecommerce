import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import Image from 'next/image';
import Button from '../../components/Button';
import styles from '../../styles/banner.module.scss';
import * as Icon from 'react-feather';
const SingleBanner: React.FC<{
  image?: string;
  title?: string;
  subTitle?: string;
}> = ({
  image = '/assets/images/banner-ktc.png',
  title = 'Nhà bếp sài gòn',
  subTitle = 'Cho Không gian sang trọng & đẳng cấp'
}) => {
  return (
    <div className={`ec__section ${styles.single_banner}`}>
      <Container>
        <div className="banner-wrapper">
          <div className="col-left">
            <div className="banner-content">
              <Header as="h3" size="large">
                {title}
              </Header>
              <p className="sub-content">{subTitle}</p>
              <Button
                type="link"
                href="/product"
                outline
                color="light"
                icon={() => <Icon.ArrowRight size={14} />}
                iconPosition="right"
                name="Khám phá ngay"
              />
            </div>
          </div>
          <div className="col-right">
            <div className="image">
              <Image
                src={image}
                layout="fill"
                alt="nha bep saigon"
                objectFit="cover"
                objectPosition="center center"
                placeholder="blur"
                blurDataURL={image}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleBanner;
