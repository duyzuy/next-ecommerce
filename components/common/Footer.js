import Image from 'next/image';
import { Container, Grid, Header, Icon } from 'semantic-ui-react';
import styles from '../../styles/footer.module.scss';
import * as Icons from 'react-feather';
import Link from 'next/link';
const Footer = () => {
  return (
    <div className={styles.ec_footer}>
      <Container>
        <div className="ec__footers">
          <div className="ec__footer-col col-left">
            <Header size="huge" style={{ marginBottom: 30 }}>
              Nhà Bếp Sài Gòn
            </Header>
            <Grid columns={2}>
              <Grid.Column>
                <div className="ft__section">
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
                  {/* <p>
                    <Link href="/">
                      <a>Chi tiết</a>
                    </Link>
                  </p> */}
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="ft__section">
                  <Header>
                    <span className="icon">
                      <Icons.RefreshCw size={32} />
                    </span>
                    Hỗ trợ đổi trả 1-1
                  </Header>
                  <p>
                    Tất cả các sản phẩm do SaigonhomeKitchen bán ra đều được
                    tuân thủ điều kiện bảo hành của nhà cung cấp, hãng sản xuất.
                    Nếu có vấn đề về chất lượng sản phẩm, SaigonhomeKitchen xin
                    cam kết sẽ hỗ trợ Quý khách tới cùng.
                  </p>
                  {/* <p>
                    <Link href="/">
                      <a>Chi tiết</a>
                    </Link>
                  </p> */}
                </div>
              </Grid.Column>
            </Grid>
            <div className="line"></div>
            <div className="ft__section">
              <Header>
                <span className="icon">
                  <Icons.Info size={32} />
                </span>
                Thông tin hữu ích
              </Header>
              <div className="boxes columns-2 infor">
                <div className="box">
                  <div className="box-inner">
                    <span className="box-icon">
                      <Icons.Phone size={20} />
                    </span>
                    <p>
                      Hotline: <br />
                      0949.305.666 / 0901.392.555
                    </p>
                  </div>
                </div>
                <div className="box">
                  <div className="box-inner">
                    <span className="box-icon">
                      <Icons.Facebook size={20} />
                    </span>
                    <p>Group trao đổi và hỗ trợ</p>
                  </div>
                </div>
                <div className="box">
                  <div className="box-inner">
                    <span className="box-icon">
                      <Icons.Map size={20} />
                    </span>
                    <p>Bản đồ</p>
                  </div>
                </div>
                <div className="box">
                  <div className="box-inner">
                    <span className="box-icon">
                      <Icons.Truck size={20} />
                    </span>
                    <p>Vận chuyển, thanh toán</p>
                  </div>
                </div>
                <div className="box">
                  <div className="box-inner">
                    <span className="box-icon">
                      <Icons.List size={20} />
                    </span>
                    <p>Tra cứu bảo hành</p>
                  </div>
                </div>
                <div className="box">
                  <div className="box-inner">
                    <span className="box-icon">
                      <Icons.FileText size={20} />
                    </span>
                    <p>Bảng giá dịch vụ</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="line"></div>
            <div className="ft__section">
              <Header>
                <span className="icon">
                  <Icons.Share2 size={32} />
                </span>
                Social networks
              </Header>

              <div className="boxes columns-4 outline">
                <div className="box">
                  <div className="box-inner">
                    <span className="box-icon">
                      <Image
                        src={'/assets/images/sgh-fb.svg'}
                        layout="fill"
                        alt="facebook"
                      />
                    </span>
                    <p>Facebook</p>
                  </div>
                </div>
                <div className="box">
                  <div className="box-inner">
                    <span className="box-icon">
                      <Image
                        src={'/assets/images/sgh-yt.svg'}
                        layout="fill"
                        alt="youtube"
                      />
                    </span>
                    <p>Youtube</p>
                  </div>
                </div>
                <div className="box">
                  <div className="box-inner">
                    <span className="box-icon">
                      <Image
                        src={'/assets/images/sgh-zalo.png'}
                        layout="fill"
                        alt="zalo"
                      />
                    </span>
                    <p>Zalo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ec__footer-col col-right">
            <div className="image">
              <Image
                src={`/assets/images/saigon-director.jpeg`}
                layout="fill"
                priority
                alt="director SGH"
              />
            </div>
          </div>
        </div>
        <div className="ec__absolute__footer">
          <Grid columns={2}>
            <Grid.Column>
              <div className="col-left">
                <div
                  className="ft__logo"
                  style={{ maxWidth: 180, marginBottom: 20 }}
                >
                  <Image
                    src={`/assets/images/logo-saigonhome-red.svg`}
                    width={100}
                    height={30}
                    layout="responsive"
                    alt="saigonhome"
                  />
                </div>
                <div className="ft__content">
                  <ul>
                    <li>
                      <Link href="/">
                        <a>Giới thiệu</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <a>Kiến thức nhà bếp</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <a>Tin tức sự kiện</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <a>Khuyến mại</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <a>Liên hệ</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/about">
                        <a>about</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <a style={{ maxWidth: 100, display: 'block' }}>
                          <Image
                            src={'/assets/images/bct.png'}
                            width={120}
                            height={45}
                            alt="bct"
                            layout="responsive"
                          />
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="image">
                <Image
                  src={'/assets/images/showroom.jpeg'}
                  layout="fill"
                  alt="showroom"
                />
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
