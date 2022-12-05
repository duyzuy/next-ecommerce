const OrderDetail = ({ data }) => {
  return (
    <div className="order__detail">
      <div className="order__detail--items">
        <h4 className="title">Sản phẩm</h4>
        <div className="prd--items">
          <div className="header--items">
            <div className="prd--image"></div>
            <div className="prd--name">Tên sản phẩm</div>
            <div className="prd--quality">Số lượng</div>
            <div className="prd--price">Giá tiền</div>
          </div>

          {data.items.map((item) => (
            <div className="line--item" key={item.id}>
              <div className="image">
                <img
                  src={item.image.src}
                  alt={item.name}
                  width={60}
                  height="auto"
                />
              </div>
              <div className="name">{item.name}</div>
              <div className="price">{item.quantity}</div>
              <div className="price">{item.price}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="order__detail--shipping">
        <h4>Thông tin giao giàng</h4>
        <div className="content">
          <div className="row-content">
            <div className="label">Họ</div>
            <div className="value">{data.shipping.first_name}</div>
          </div>
          <div className="row-content">
            <div className="label">Tên đệm và tên</div>
            <div className="value">{data.shipping.last_name}</div>
          </div>
          <div className="row-content">
            <div className="label">Điện thoại</div>
            <div className="value">{data.shipping.phone || '--'}</div>
          </div>
          <div className="row-content">
            <div className="label">Thành phố</div>
            <div className="value">{data.shipping.city || '--'}</div>
          </div>
          <div className="row-content">
            <div className="label">Địa chỉ</div>
            <div className="value">{data.shipping.address_1 || '--'}</div>
          </div>
        </div>
      </div>
      <div className="order__detail--billing">
        <h4>Thông tin thanh toán</h4>
        <div className="content">
          <div className="row-content">
            <div className="label">Họ</div>
            <div className="value">{data.billing.first_name}</div>
          </div>
          <div className="row-content">
            <div className="label">Tên đệm và tên</div>
            <div className="value">{data.billing.last_name}</div>
          </div>
          <div className="row-content">
            <div className="label">Điện thoại</div>
            <div className="value">{data.billing.phone || '--'}</div>
          </div>
          <div className="row-content">
            <div className="label">Email</div>
            <div className="value">{data.billing.email || '--'}</div>
          </div>
          <div className="row-content">
            <div className="label">Thành phố</div>
            <div className="value">{data.billing.city || '--'}</div>
          </div>
          <div className="row-content">
            <div className="label">Địa chỉ</div>
            <div className="value">{data.billing.address_1 || '--'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
