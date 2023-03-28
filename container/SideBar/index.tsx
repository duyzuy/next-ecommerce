import { useRef, useState } from 'react';
import InputRange from '../../components/InputRange';
import SliderRange from '../../components/SliderRange';
const SideBar = (props: any) => {
  const { attribures } = props;
  const minPriceRef = useRef();
  const maxPriceRef = useRef();

  const [priceRange, setPriceRange] = useState({
    minPrice: 0,
    maxPrice: 15000000
  });
  const onRange = (e) => {
    // console.log(e);
  };
  return (
    <>
      <div className="ec__product--sidebar">
        <div className="ec__sidebar--header">Lọc sản phẩm theo</div>
        {attribures.map((attr, index) => {
          return (
            <div key={index} className="ec__sidebar-attr">
              <div className="attr-name">{attr.name}</div>
              {attr.attrTerms.map((term, index) => {
                return (
                  <div key={index} className="ec__term">
                    {term.name}
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="ec__sidebar-attr">
          <div className="attr-name">Khoảng giá</div>
          <SliderRange min={0} max={15000000} onRange={onRange} />
          <button type="button" className="button">
            Lọc
          </button>
        </div>
      </div>
    </>
  );
};
export default SideBar;
