import * as Icon from 'react-feather';
import Input from '../../components/Input';
import {
  productQueryParam,
  productQueryValue
} from '../../constants/queryParams';
const ProductToolBar = ({ onFilterChangeRoute, filter, isLoading }) => {
  const onFilter = (key, value) => {
    if (isLoading) return;
    onFilterChangeRoute(key, value);
  };
  return (
    <div className="ec__product--tools">
      <div className="tool-inner">
        <div className="tool-filter">
          <span className="ec__icon">
            <Icon.Filter size={16} />
          </span>
          Lọc Sản phẩm
        </div>
        <div className="tool-sort desc">
          <Input
            asCheckbox
            content="Mới nhất"
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
            content="Đánh giá"
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
            content="Giá"
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
            content="Giá từ cao - thấp"
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
            content="Giá từ thấp - cao"
            icon={() => <Icon.ArrowUp size={10} />}
            id="priceAsc"
            value="asc"
            name="productPrice"
            checked={filter.order === 'asc' ? 'checked' : ''}
            onChange={() =>
              onFilter(productQueryParam.ORDER, productQueryValue.ASC)
            }
          />
        </div>
      </div>
    </div>
  );
};
export default ProductToolBar;
