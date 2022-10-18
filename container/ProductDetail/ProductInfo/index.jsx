import { memo } from 'react';
import { Header } from 'semantic-ui-react';
import * as Icon from 'react-feather';
const ProductInfo = ({ title, informations }) => {
  return (
    <>
      <Header as="h4" className="ec__product--body--title">
        <Icon.Grid
          size={22}
          style={{
            marginRight: 10,
            position: 'relative',
            marginRight: 10,
            top: 4
          }}
        />
        {title}
      </Header>
      <div className="ec__product--infor">
        <div className="ec__product--attr">
          {informations.map((attr, index) => (
            <div className="attr-item" key={`attr-item-${index}`}>
              <p className="attr-label">{attr.name}</p>
              <p className="arrr-names">
                {attr?.options?.map((op, index) => (
                  <span className="attr-name" key={`n-${index}`}>
                    {op}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="ec__product--more--infor">
        <span className="button button--link has-icon">
          Xem chi tiết cấu hình <Icon.ChevronRight size={14} />
        </span>
      </div>
    </>
  );
};

export default memo(ProductInfo);
