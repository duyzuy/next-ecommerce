import React, { memo, useMemo } from 'react';
import Image from 'next/image';
import { Container, Grid, Header, Icon } from 'semantic-ui-react';
import * as Icons from 'react-feather';
import Link from 'next/link';
import styles from './footer.module.scss';
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
                  <p style={{ textAlign: 'justify' }}>
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
                  <p style={{ textAlign: 'justify' }}>
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
                        placeholder="blur"
                        blurDataURL={'/assets/images/sgh-fb.svg'}
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
                        placeholder="blur"
                        blurDataURL={'/assets/images/sgh-yt.svg'}
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
                        placeholder="blur"
                        blurDataURL={'/assets/images/sgh-zalo.png'}
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
                placeholder="blur"
                blurDataURL={`/assets/images/saigon-director.jpeg`}
              />
            </div>
          </div>
        </div>
        <div className="ec__absolute__footer">
          <Grid columns={1} textAlign="center">
            <Grid.Column computer={10} mobile={16}>
              <div className="col-left">
                <div className="ft__content">
                  <p>
                    237 (số mới 324) Lý Thường Kiệt, Phường 6, Quận Tân Bình,
                    Tp. Hồ Chí Minh. Đối diện CMC Plaza (Nguyễn Kim Tân Bình)
                  </p>
                  <p>Hotline: 0949 305 666 / 0901 392 555</p>
                  <p>Email: saigonhomekitchen@gmail.com</p>
                  <ul className="footer-menu">
                    <li>
                      <Link href="/about">
                        <a>Về chúng tôi</a>
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
                  </ul>
                  <div className="footer-bct">
                    <Link href="/">
                      <a
                        style={{
                          maxWidth: 100,
                          display: 'block',
                          marginLeft: 'auto',
                          marginRight: 'auto'
                        }}
                      >
                        <Image
                          src={'/assets/images/bocongthuong.png'}
                          width={120}
                          height={45}
                          alt="bct"
                          layout="responsive"
                          placeholder="blur"
                          blurDataURL={'/assets/images/bocongthuong.png'}
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default memo(Footer);
