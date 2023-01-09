import { withBookingLayout } from '../../HOCs/withBookingLayout';
import * as Icon from 'react-feather';
import styles from '../../styles/thankyou.module.scss';
import BookingSummary from '../../components/BookingSummary';
import { useSelector } from '../../providers/hooks';
import ProductSummaryItems from '../../components/ProductSummaryItems';
import SubtotalSummary from '../../components/SubtotalSummary';
const ThankYouPage = () => {
  const bookingInfor = useSelector((state) => state.booking);
  const currency = useSelector((state) => {
    return (
      state.setting.general?.woocommerceCurrency.value ||
      state.setting.general?.woocommerceCurrency.default
    );
  });

  return (
    <>
      <div className="inner_body">
        <div className="col-left">
          <div className="thankyou__text">
            <Icon.Smile size={20} />
            <p>Cảm ơn bạn. Đơn hàng của bạn đã được nhận.</p>
          </div>
          <div className="order_detail">
            <h4 className="title">Chi tiết đơn hàng</h4>
            <ProductSummaryItems
              data={bookingInfor.products.items}
              currency={currency}
            />
            <SubtotalSummary data={bookingInfor} currency={currency} />
          </div>
          <div className="billing-infor">
            <h4 className="title">Thông tin thanh toán</h4>
            <div className="content">
              <div className="row">
                <div className="label">Họ</div>
                <div className="value">NGUYEN</div>
              </div>
              <div className="row">
                <div className="label">Tên đệm và tên</div>
                <div className="value">VAN A</div>
              </div>
              <div className="row">
                <div className="label">Email</div>
                <div className="value">nguyenvana@gmail.com</div>
              </div>
              <div className="row">
                <div className="label">Điện thoại</div>
                <div className="value">098889912</div>
              </div>
              <div className="row">
                <div className="label">Quốc gia</div>
                <div className="value">Việt Nam</div>
              </div>
              <div className="row">
                <div className="label">Thành phố</div>
                <div className="value">Hồ Chí minh</div>
              </div>
              <div className="row">
                <div className="label">Quận/huyện</div>
                <div className="value">Quận 1</div>
              </div>
              <div className="row">
                <div className="label">Địa chỉ</div>
                <div className="value">duong 16 duong quan ham</div>
              </div>
            </div>
          </div>
          <div className="shipping-infor">
            <h4 className="title">Thông tin giao hàng</h4>
            <div className="content">
              <div className="row">
                <div className="label">Họ</div>
                <div className="value">NGUYEN</div>
              </div>
              <div className="row">
                <div className="label">Tên đệm và tên</div>
                <div className="value">VAN A</div>
              </div>
              <div className="row">
                <div className="label">Quốc gia</div>
                <div className="value">Việt Nam</div>
              </div>
              <div className="row">
                <div className="label">Thành phố</div>
                <div className="value">Hồ Chí minh</div>
              </div>
              <div className="row">
                <div className="label">Quận/huyện</div>
                <div className="value">Quận 1</div>
              </div>
              <div className="row">
                <div className="label">Địa chỉ</div>
                <div className="value">duong 16 duong quan ham</div>
              </div>
            </div>
          </div>
          <div className="shipping-infor"></div>
        </div>
        <div className="col-right">
          <div className="order_infor">
            <div className="row code">
              <p className="label">mã đơn hàng</p>
              <p className="value">11231</p>
            </div>
            <div className="row date">
              <p className="label">Ngày đặt hàng</p>
              <p className="value">9 Tháng Một, 2023</p>
            </div>
            <div className="row email">
              <p className="label">Email</p>
              <p className="value">vutruongduy2109@gmail.com</p>
            </div>
            <div className="row price">
              <p className="label">Tổng cộng</p>
              <p className="value">142.300.000₫</p>
            </div>
            <div className="row payment-method">
              <p className="label">Phương thức thanh toán</p>
              <p className="value">Chuyển khoản ngân hàng</p>
            </div>
            <div className="row status">
              <p className="label">Trạng thái</p>
              <p className="value">Đang chờ thanh toán</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withBookingLayout(ThankYouPage, {
  title: 'Thành công',
  step: 'thankyou',
  styles: styles
});
export async function getServerSideProps(ctx) {
  const response = await fetch('https://provinces.open-api.vn/api/?depth=2', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const cities = await response.json();
  return {
    props: {
      cities
    }
  };
}
