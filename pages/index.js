import { Container } from 'semantic-ui-react';
import SEO from '../components/common/Seo';
import { Grid, Image } from 'semantic-ui-react';
import { TOP_PROMOTIONS } from '../constants/menu';
import Slider from '../components/Slider';
const Home = () => {
  return (
    <>
      <SEO title="Bep tu nhap khau" description="bep tu nhap khau chinh hang" />
      <div className="home__wrap">
        <Container>
          <Grid>
            <Grid.Column width={10}>
              <Slider main autoPlay itemView={1} itemSpacing={15}>
                {TOP_PROMOTIONS.map((item, index) => (
                  <Slider.Item
                    key={index}
                    name={item.name}
                    path={item.path}
                    thumbnail={item.thumbnail}
                  />
                ))}
              </Slider>
            </Grid.Column>
            <Grid.Column width={6}>
              <div className="ec__box">
                <div className="ec__box--item">
                  <div className="ec__box--content">
                    <h4>Miễn phí vận chuyển</h4>
                    <p>
                      100% đơn hàng đều được miễn phí vận chuyển khi thanh toán
                      trước.
                    </p>
                  </div>
                </div>
                <div className="ec__box--item">
                  <div className="ec__box--content">
                    <h4>Bảo hành tận tâm</h4>
                    <p>
                      Bất kể giấy tờ thế nào, SGHOME luôn cam kết sẽ hỗ trợ
                      khách hàng tới cùng.
                    </p>
                  </div>
                </div>
                <div className="ec__box--item">
                  <div className="ec__box--content">
                    <h4>Đổi trả 1-1 hoặc hoàn tiền</h4>
                    <p>
                      Nếu phát sinh lỗi hoặc bạn cảm thấy sản phẩm chưa đáp ứng
                      được nhu cầu.
                    </p>
                  </div>
                </div>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Home;
