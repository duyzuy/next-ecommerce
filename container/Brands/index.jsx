import React from 'react';
import Slider from '../../components/Slider';
import { Container, Header } from 'semantic-ui-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/brand.module.scss';

const breakPoint = {
  mobile: {
    width: 320,
    itemView: 3,
    itemScroll: 1
  },
  tablet: {
    width: 768,
    itemView: 5,
    itemScroll: 2
  },
  desktop: {
    width: 992,
    itemView: 6,
    itemScroll: 2
  }
};
const Brands = (props) => {
  const { data } = props;
  return (
    <div className={`ec__section ${styles.ec__brand}`}>
      <Container>
        <Header as="h2" className="ec__title">
          Thương hiệu nổi bật
        </Header>
        <div className="ec__brand--list">
          <Slider
            itemScroll={2}
            itemView={6}
            main
            itemSpacing={15}
            breakPoint={breakPoint}
          >
            {data &&
              data.map((brand, index) => (
                <Slider.Item key={index} asChild>
                  <div className="ec__brand--item">
                    <Link href={brand.path}>
                      <a className="ec__brand--link">
                        <div className="ec__brand--thumbnail">
                          <Image
                            src={brand.thumbnail}
                            alt={brand.name}
                            width={100}
                            height={40}
                            layout="responsive"
                            priority
                          />
                        </div>
                        <div className="ec__brand--text">
                          <p className="sub--text">{brand.name}</p>
                        </div>
                      </a>
                    </Link>
                  </div>
                </Slider.Item>
              ))}
          </Slider>
        </div>
      </Container>
    </div>
  );
};

export default Brands;
