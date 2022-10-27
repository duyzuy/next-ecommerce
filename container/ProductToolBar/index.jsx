import Select from '../../components/Select';
import { useMemo } from 'react';
const ProductToolBar = ({
  filter,
  isLoading,
  totalPage,
  currentPage,
  totalItem,
  onSetSelected
}) => {
  const filterOptions = [
    {
      key: '1',
      value: 'order=desc&orderby=date',
      text: 'Mới nhất'
    },
    {
      key: '2',
      value: 'order=desc&orderby=rating',
      text: 'Nổi bật nhất'
    },
    {
      key: '3',
      value: 'order=asc&orderby=price',
      text: 'Giá từ thấp lên cao'
    },
    {
      key: '4',
      value: 'order=desc&orderby=price',
      text: 'Giá từ cao xuống thấp'
    }
  ];

  const defaultSelect = useMemo(() => {
    const filterString = `order=${filter.order}&orderby=${filter.orderby}`;

    return filterOptions.find((filter) => filter.value === filterString);
  }, [filter.order, filter.orderby]);

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
        <div className="ec__product--sort">
          <div className="tool-filter">Sắp xếp sản phẩm theo</div>

          <Select
            name="orderby"
            // label="Sắp xếp sản phẩm theo"
            options={filterOptions}
            selected={defaultSelect}
            onSetSelected={onSetSelected}
          />
        </div>
      </div>
    </div>
  );
};
export default ProductToolBar;
