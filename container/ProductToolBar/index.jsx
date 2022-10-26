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

  // const handleSelection = (select) => {
  //   let queries = select.value.split('&');
  //   queries = queries.map((q) => {
  //     return {
  //       key: q.split('=')[0],
  //       value: q.split('=')[1]
  //     };
  //   });
  //   onFilter(queries);
  // };
  const defaultSelect = useMemo(() => {
    const filterString = `order=${filter.order}&orderby=${filter.orderby}`;

    return filterOptions.find((filter) => filter.value === filterString);
  }, [filter.order, filter.orderby]);
  console.log(defaultSelect);

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
          options={filterOptions}
          selected={defaultSelect}
          onSetSelected={onSetSelected}
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
