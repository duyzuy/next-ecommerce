import { Input } from 'semantic-ui-react';
import { useMemo } from 'react';
type PropsType = {
  className?: string;
};
const SearchProduct: React.FC<PropsType> = ({ className }) => {
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
