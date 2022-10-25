import * as Icon from 'react-feather';
import Input from '../../components/Input';
import {
  productQueryParam,
  productQueryValue
} from '../../constants/queryParams';
import Select from '../../components/Select';
const ProductToolBar = ({
  onFilterChangeRoute,
  filter,
  isLoading,
  totalPage,
  currentPage,
  totalItem
}) => {
  const onFilter = (key, value) => {
    if (isLoading) return;
    onFilterChangeRoute(key, value);
  };

  const handleSelection = (val) => {
    console.log(val);
  };
  const countryOptions = [
    { key: 'desc', value: 'date1', text: 'Mới nhất' },
    { key: 'desc', value: 'rating1', text: 'Nổi bật nhất' },
    { key: 'asc', value: 'price1', text: 'Giá từ thấp lên cao' },
    { key: 'desc', value: 'date2', text: 'Mới nhất' },
    { key: 'desc', value: 'rating2', text: 'Nổi bật nhất' },
    { key: 'asc', value: 'price2', text: 'Giá từ thấp lên cao' },
    { key: 'desc', value: 'date3', text: 'Mới nhất' },
    { key: 'desc', value: 'rating3', text: 'Nổi bật nhất' },
    { key: 'asc', value: 'price3', text: 'Giá từ thấp lên cao' },
    { key: 'desc', value: 'date', text: 'Mới nhất' },
    { key: 'desc', value: 'rating', text: 'Nổi bật nhất' },
    { key: 'asc', value: 'price', text: 'Giá từ thấp lên cao' },
    { key: 'desc', value: 'price', text: 'Giá từ cao xuống thấp' }
  ];

  return (
    <div className="ec__product--tools">
      <div className="tool-inner">
        <div className="ec__pagination--note">
          <div>
            <span>
              Trang {currentPage} / {totalPage} - {totalItem} sản phẩm
            </span>
          </div>
        </div>
        <div className="tool-filter">Sắp xếp sản phẩm theo</div>
        <Select
          name="orderby"
          label="Sắp xếp sản phẩm theo"
          options={countryOptions}
          onSelection={handleSelection}
        />
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
