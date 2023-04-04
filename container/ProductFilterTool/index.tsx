import { useRef, useState } from 'react';
import InputRange from '../../components/InputRange';
import SliderRange from '../../components/SliderRange';
import { AttributeType, ProductAttributeType } from '../../model';
import * as Icon from 'react-feather';
import styles from './filtertool.module.scss';
type AttributeProductFilterType = AttributeType & {
  attrTerms: {
    id: number;
    count: number;
    menuOrder: number;
    name: string;
    slug: string;
  }[];
};
const ProductFilterTool: React.FC<{
  attribures: AttributeProductFilterType[];
  type: string;
}> = ({ attribures, type }) => {
  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  console.log({ attribures });
  const [priceRange, setPriceRange] = useState({
    minPrice: 0,
    maxPrice: 15000000
  });
  const onRange = (e) => {
    // console.log(e);
  };

  const priceFilters = [
    { priceFrom: 0, priceTo: 1000000 },
    { priceFrom: 1000000, priceTo: 2000000 },
    { priceFrom: 2000000, priceTo: 4000000 },
    { priceFrom: 4000000, priceTo: 8000000 },
    { priceFrom: 8000000, priceTo: 800000000 }
  ];
  return (
    <>
      <div className={styles.ec__product}>
        <div className="tool-header">
          <span className="icon">
            <Icon.Filter size={20} />
          </span>
          <span className="name">Bộ lọc</span>
        </div>
        {attribures.map((attr, index) => {
          return (
            <div key={index} className="tool-attr">
              <div className="attr-name">
                {attr.name} <Icon.ArrowDown size={12} />
              </div>
              <div className="attr-terms">
                {attr.attrTerms.map((term, index) => {
                  return (
                    <div key={index} className="ec__term">
                      {term.name}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="tool-attr">
          <div className="attr-name">Khoảng giá</div>
          <div className="attr-terms">
            {priceFilters.map((priceFilter) => (
              <div className="attr-item">
                <span className="check"></span>
                <div className="term-text">
                  {`Từ ${priceFilter.priceFrom}`}
                  {' - '}
                  {`Đến ${priceFilter.priceTo}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductFilterTool;
