import { useRef, useEffect } from 'react';
import InputRange from '../../components/InputRange';
const SideBar = (props) => {
  const { attribures } = props;
  const minPriceRef = useRef();
  const maxPriceRef = useRef();

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
          <InputRange
            ref={minPriceRef}
            label="Giá thấp nhất"
            asRelative={maxPriceRef}
            name="minPrice"
            min={0}
            max={15000000}
            step={200000}
            value={0}
            // onChange={onChangePrice}
          />

          <InputRange
            ref={maxPriceRef}
            label="Giá cao nhất"
            name="maxPrice"
            asRelative={minPriceRef}
            min={0}
            max={15000000}
            value={15000000}
            step={200000}
            // onChange={onChangePrice}
          />
        </div>
      </div>
    </>
  );
};
export default SideBar;
