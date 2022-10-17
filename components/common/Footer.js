import Image from 'next/image';
import { Container, Grid, Header, Icon } from 'semantic-ui-react';
import styles from '../../styles/footer.module.scss';
import * as Icons from 'react-feather';
const Footer = () => {
  return (
    <div className={styles.ec_footer}>
      <Container>
        <div className="ec__footers">
          <div className="ec__footer-col col-left">
            <Header size="huge">SaigonhomeKitchen tự tin mua sắm</Header>
            <Grid columns={2}>
              <Grid.Column>
                <div>
                  <Header>
                    <span className="icon">
                      <Icons.Shield size={32} />
                    </span>
                    Chế độ bảo hành tận tâm
                  </Header>
                  <p>
                    Tất cả các sản phẩm do SaigonhomeKitchen bán ra đều được
                    tuân thủ điều kiện bảo hành của nhà cung cấp, hãng sản xuất.
                    Nếu có vấn đề về chất lượng sản phẩm, SaigonhomeKitchen xin
                    cam kết sẽ hỗ trợ Quý khách tới cùng.
                  </p>
                  <p>Chi tiết</p>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div>
                  <Header>
                    <span className="icon">
                      <Icons.RefreshCw size={32} />
                    </span>
                    Hỗ trợ đổi trả 1-1 hoặc hoàn tiền 100%
                  </Header>
                  <p>
                    Tất cả các sản phẩm do SaigonhomeKitchen bán ra đều được
                    tuân thủ điều kiện bảo hành của nhà cung cấp, hãng sản xuất.
                    Nếu có vấn đề về chất lượng sản phẩm, SaigonhomeKitchen xin
                    cam kết sẽ hỗ trợ Quý khách tới cùng.
                  </p>
                  <p>Chi tiết</p>
                </div>
              </Grid.Column>
            </Grid>
            <div className="line"></div>
            <div>
              <Header>
                <span className="icon">
                  <Icons.Info size={32} />
                </span>
                Thông tin hữu ích
              </Header>
              <div className="boxes columns-2">
                <div className="box">
                  <div className="box-inner">
                    <span className="box-icon">
                      <Icons.Phone size={16} />
                    </span>
                    <p>Hotline: 123123123</p>
                  </div>
                </div>
                <div className="box">
                  <div className="box-inner">
                    <span className="box-icon">
                      <Icons.Facebook size={16} />
                    </span>
                    <p>Group trao đổi và hỗ trợ</p>
                  </div>
                </div>
                <div className="box">
                  <div className="box-inner">
                    <span className="box-icon">
                      <Icons.Map size={16} />
                    </span>
                    <p>Map</p>
                  </div>
                </div>
                <div className="box">
                  <div className="box-inner">
                    <span className="box-icon">
                      <Icons.Truck size={16} />
                    </span>
                    <p>Vận chuyển, thanh toán</p>
                  </div>
                </div>
                <div className="box">
                  <div className="box-inner">
                    <span className="box-icon">
                      <Icons.List size={16} />
                    </span>
                    <p>Tra cứu bảo hành</p>
                  </div>
                </div>
                <div className="box">
                  <div className="box-inner">
                    <span className="box-icon">
                      <Icons.FileText size={16} />
                    </span>
                    <p>Bảng giá dịch vụ</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="line"></div>
            <div>
              <Header>
                <span className="icon">
                  <Icons.Share2 size={32} />
                </span>
                SaigonHome trên social networks
              </Header>
            </div>
            <div className="boxes columns-4">
              <div className="box">
                <div className="box-inner">
                  <span className="box-icon">
                    <Icons.Facebook size={16} />
                  </span>
                  <p>Facebook</p>
                </div>
              </div>
              <div className="box">
                <div className="box-inner">
                  <span className="box-icon">
                    <Icons.Youtube size={16} />
                  </span>
                  <p>Youtube</p>
                </div>
              </div>
              <div className="box">
                <div className="box-inner">
                  <span className="box-icon">
                    <Icons.Twitter size={16} />
                  </span>
                  <p>Twitter</p>
                </div>
              </div>
              <div className="box">
                <div className="box-inner">
                  <span className="box-icon">
                    <Icons.Instagram size={16} />
                  </span>
                  <p>Instagram</p>
                </div>
              </div>
            </div>
          </div>
          <div className="ec__footer-col col-right">
            <div className="image">
              <Image
                src={`/assets/images/showroom.jpeg`}
                layout="fill"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
