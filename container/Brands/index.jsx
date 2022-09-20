import React from 'react';
import Slider from '../../components/Slider';
import { Container, Header } from 'semantic-ui-react';
const Brands = (props) => {
  const { data } = props;
  return (
    <div className="ec__section ec__brand">
      <Container>
        <Header as="h2" className="ec__title">
          Thương hiệu nổi bật
        </Header>
        <div className="ec__brand--list">
          <Slider itemScroll={1}>
            {data &&
              data.map((brand, index) => (
                <Slider.Item
                  key={index}
                  name={brand.name}
                  path={brand.path}
                  thumbnail={brand.thumbnail}
                />
              ))}
          </Slider>
        </div>
      </Container>
    </div>
  );
};

export default Brands;
