import Item from '../Item';
import * as Icon from 'react-feather';

const Slide = ({ items }) => {
  return (
    <div className="ec__slide">
      <ul className="ec__slide--list">
        {items.map((item) => {
          return (
            <Item
              name={item.name}
              path={item.path}
              thumbnail={item.thumbnail}
            />
          );
        })}
      </ul>
      <div className="ec__slide--nav">
        <span className="ec__slide--prev" onClick={handlePrev}>
          <Icon.ArrowLeft width={16} />
        </span>
        <span className="ec__slide--next" onClick={handleNext}>
          <Icon.ArrowRight width={16} />
        </span>
      </div>
    </div>
  );
};

export default Slide;
