import * as Icon from 'react-feather';
import Input from '../../components/Input';
const ProductToolBar = ({ onFilter, filter }) => {
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
            asRadio
            content="Giá từ cao - thấp"
            icon={() => <Icon.ArrowDown size={10} />}
            name="productPrice"
            value="desc"
            id="priceDesc"
            checked={filter.order === 'desc' ? 'checked' : ''}
            onChange={() => onFilter('order', 'desc')}
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
            onChange={() => onFilter('order', 'asc')}
          />
        </div>
      </div>
    </div>
  );
};
export default ProductToolBar;
