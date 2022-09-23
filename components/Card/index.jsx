import { useMemo } from 'react';
import Image from 'next/image';
import { Header } from 'semantic-ui-react';
import CustomImage from '../CustomImage';

const Card = (props) => {
  const { type, data } = props;
  const { images } = data;
  // console.log(data);

  const thumbnailUrl = useMemo(() => {
    if (images.length > 0) {
      return images[0].src;
    }
  }, []);

  return (
    <div className={`ec__card ${type}`}>
      <div className="ec__card--inner">
        <div className="ec__card--image">
          <div className="image">
            <CustomImage src={thumbnailUrl} alt={data.name} />
          </div>
        </div>
        <div className="ec__card--bottom">
          <h3 className="ec__card--title"> {data.name}</h3>
          <div className="ec__card--price">
            <p className="price regular">{data.regular_price}</p>
            <p className="price sale">{data.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
