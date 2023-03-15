import { Input } from 'semantic-ui-react';
import { useMemo } from 'react';
const SearchProduct = ({ className }) => {
  const clss = useMemo(() => {
    const cls = className;
    return cls;
  }, [className]);
  return (
    <div className={clss}>
      <Input icon="search" placeholder="Nhập sản phẩm cần tìm..." />
    </div>
  );
};
export default SearchProduct;
