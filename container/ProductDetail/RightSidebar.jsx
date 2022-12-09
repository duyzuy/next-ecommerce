import { useState, useCallback } from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';
import Rating from '../../components/Rating';
import Price from '../../components/Price';
import Button from '../../components/Button';
import Quantity from '../../components/Quantity';

const ACTIONS = {
  UP: 'up',
  DOWN: 'down'
};
const RightSidebar = (props) => {
  const { data, addToCart } = props;
  const [quantity, setQuantity] = useState(1);

  const onSetQuantity = useCallback(
    (type) => {
      if (type === ACTIONS.UP) {
        setQuantity((prevState) => prevState + 1);
      } else {
        if (quantity === 1) return;
        setQuantity((prevState) => prevState - 1);
      }
    },
    [quantity]
  );

  const onResetQuantity = () => {
    setQuantity(1);
  };
  return (
    <>
      <div className="ec__product--right">
        <div className="ec__product--right--inner">
          <div className="ec__product--shortDes">
            <Rating
              average={data.average_rating}
              rating={data.rating_count}
              isAllow={data.reviews_allowed}
              starIcon={() => (
                <Icon.Star size={18} style={{ marginRight: 5 }} />
              )}
            />
            <h1
              className="ec__product--title"
              dangerouslySetInnerHTML={{ __html: data?.name }}
            ></h1>

            <div className="ec__product--info">
              <p className="info-item sku">
                <span className="info-label">SKU</span>
                <span className="info-name">{data?.sku}</span>
              </p>
              <p className="info-item">
                <span className="info-label">In-stock</span>
                <span className="info-name">
                  {data?.stock_status === 'instock' ? (
                    <span className="info-icon in-stock">
                      <Icon.CheckCircle
                        size={14}
                        style={{ color: '#4caf50' }}
                      />
                    </span>
                  ) : (
                    <span className="stock-icon out-stock">
                      <Icon.Slash size={14} />
                    </span>
                  )}
                </span>
              </p>
            </div>
            <div className="ec__product--cat">
              <div className="ec__product--label">Danh mục</div>
              <div className="ec__product--catnames">
                {data?.categories.map((cat) => (
                  <span className="cat-name" key={cat.id}>
                    <Link href={`../product-cat/${cat.slug}`}>
                      <a>{cat.name}</a>
                    </Link>
                  </span>
                ))}
              </div>
            </div>
            <Price
              asSingle
              price={data?.price}
              regularPrice={data?.regular_price}
              salePrice={data?.sale_price}
            />

            <Quantity
              onSetQuantity={onSetQuantity}
              quantity={quantity}
              title="Số lượng"
            />
            <div className="ec__product--action">
              <Button
                fluid
                color="primary"
                icon={() => <Icon.ShoppingCart size={20} />}
                onClick={() => addToCart(data, quantity, onResetQuantity)}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
