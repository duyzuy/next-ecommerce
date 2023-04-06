import { useRef, useState } from 'react';
import InputRange from '../../components/InputRange';
import SliderRange from '../../components/SliderRange';
import { AttributeType, ProductAttributeType } from '../../model';
import * as Icon from 'react-feather';
import styles from './filtertool.module.scss';
import FilterItem from './FilterItem';
const ProductFilterTool: React.FC<{
  attribures: AttributeType[];
  type: string;
}> = ({ attribures, type }) => {
  const [isShow, setShowFilter] = useState(false);
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
    {
      from: {
        text: 'Từ 0 VND',
        value: 0,
        key: '0'
      },
      to: {
        text: 'Đến 1tr VND',
        value: 3000000,
        key: 'to-1000000'
      }
    },
    {
      from: {
        text: 'Từ 2tr VND',
        value: 3000000,
        key: 'from-2000000'
      },
      to: {
        text: 'Đến 3tr VND',
        value: 5000000,
        key: '1000000'
      }
    },
    {
      from: {
        text: 'Từ 3tr VND',
        value: 5000000,
        key: 'from-3000000'
      },
      to: {
        text: 'Đến 5tr VND',
        value: 8000000,
        key: 'to-5000000'
      }
    },
    {
      from: {
        text: 'Từ 8tr VND',
        value: 8000000,
        key: '0'
      },
      to: {
        text: 'Đến 15tr VND',
        value: 15000000,
        key: 'to-15000000'
      }
    },
    {
      from: {
        text: 'Từ 15tr VND',
        value: 15000000,
        key: '0'
      },
      to: {
        text: 'trở lên',
        value: 9999999999,
        key: 'to-999999999'
      }
    }
  ];

  const onFilterProducts = () => {};
  const onShowFilterOptions = () => {
    setShowFilter((isShow) => !isShow);
  };
  return (
    <>
      <div className={styles.ec__product}>
        <div className="tool-header">
          <span className="icon">
            <Icon.Filter size={20} />
          </span>
          <span className="name">Bộ lọc</span>
        </div>
        <div className="tool-body">
          {attribures.map((attr, index) => (
            <FilterItem options={attr.options} attribute={attr} />
          ))}
          <div className="attr-item">
            <div className="attr-top" onClick={onShowFilterOptions}>
              <span className="name">Khoảng giá</span>
              <span className="icon">
                <Icon.ArrowDown size={12} />
              </span>
            </div>
            {(isShow && (
              <div className="attr-options">
                {priceFilters.map((priceFilter) => (
                  <div className="term-item">
                    <div className="text">
                      {priceFilter.from.text}
                      {' - '}
                      {priceFilter.to.text}
                    </div>
                  </div>
                ))}
              </div>
            )) || <></>}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductFilterTool;
