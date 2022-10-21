import * as Icon from 'react-feather';
import Input from '../../components/Input';
import {
  productQueryParam,
  productQueryValue
} from '../../constants/queryParams';
import { Select } from 'semantic-ui-react';
const ProductToolBar = ({ onFilterChangeRoute, filter, isLoading }) => {
  const onFilter = (key, value) => {
    if (isLoading) return;
    onFilterChangeRoute(key, value);
  };

  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', text: 'Angola' },
    { key: 'ai', value: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'ag', text: 'Antigua' },
    { key: 'ar', value: 'ar', text: 'Argentina' },
    { key: 'am', value: 'am', text: 'Armenia' },
    { key: 'aw', value: 'aw', text: 'Aruba' },
    { key: 'au', value: 'au', text: 'Australia' },
    { key: 'at', value: 'at', text: 'Austria' },
    { key: 'az', value: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', text: 'Benin' }
  ];
  return (
    <div className="ec__product--tools">
      <div className="tool-inner">
        <div className="tool-filter">Sắp xếp sản phẩm theo</div>
        <Select placeholder="Select your country" options={countryOptions} />
        {/* <div className="tool-sort desc">
          <Input
            asCheckbox
            label="Mới nhất"
            icon={() => <Icon.Star size={10} />}
            name="productOrderBy"
            value="date"
            id="prdDate"
            checked={filter.orderby === 'date' ? 'checked' : ''}
            onChange={() =>
              onFilter(productQueryParam.ORDERBY, productQueryValue.DATE)
            }
          />
        </div>
        <div className="tool-sort desc">
          <Input
            asCheckbox
            label="Đánh giá"
            icon={() => <Icon.Star size={10} />}
            name="productOrderBy"
            value="rating"
            id="prdRating"
            checked={filter.orderby === 'rating' ? 'checked' : ''}
            onChange={() =>
              onFilter(productQueryParam.ORDERBY, productQueryValue.RATING)
            }
          />
        </div>
        <div className="tool-sort desc">
          <Input
            asCheckbox
            label="Giá"
            icon={() => <Icon.Star size={10} />}
            name="productOrderBy"
            value="price"
            id="prdPrice"
            checked={filter.orderby === 'price' ? 'checked' : ''}
            onChange={() =>
              onFilter(productQueryParam.ORDERBY, productQueryValue.PRICE)
            }
          />
        </div>
        <div className="tool-sort desc">
          <Input
            asRadio
            label="Giá từ cao - thấp"
            icon={() => <Icon.ArrowDown size={10} />}
            name="productPrice"
            value="desc"
            id="priceDesc"
            checked={filter.order === 'desc' ? 'checked' : ''}
            onChange={() =>
              onFilter(productQueryParam.ORDER, productQueryValue.DESC)
            }
          />
        </div>
        <div className="tool-sort asc">
          <Input
            asRadio
            label="Giá từ thấp - cao"
            icon={() => <Icon.ArrowUp size={10} />}
            id="priceAsc"
            value="asc"
            name="productPrice"
            checked={filter.order === 'asc' ? 'checked' : ''}
            onChange={() =>
              onFilter(productQueryParam.ORDER, productQueryValue.ASC)
            }
          />
        </div> */}
      </div>
    </div>
  );
};
export default ProductToolBar;
