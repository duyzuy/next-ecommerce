import React from 'react';
import Slider from '../../components/Slider';
import { Container, Header } from 'semantic-ui-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/brand.module.scss';
const Brands = (props) => {
  const { data } = props;
  return (
    <div className="ec__section ec__brand">
      <Container>
        <Header as="h2" className="ec__title">
          Thương hiệu nổi bật
        </Header>
        <div className="ec__brand--list">
          <Slider itemScroll={1} itemView={6} main>
            {data &&
              data.map((brand, index) => (
                <Slider.Item key={index} asChild>
                  <div className={styles.ec_brand_item}>
                    <Link href={brand.path}>
                      <a className="ec__brand--link">
                        <div className="ec__brand--thumbnail">
                          <Image
                            src={brand.thumbnail}
                            alt={brand.name}
                            width={100}
                            height={100}
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
