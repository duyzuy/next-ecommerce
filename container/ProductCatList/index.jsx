import { memo, useMemo, useState } from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';
import Link from 'next/link';
import Card from '../../components/Card';
import { contentType } from '../../constants/constants';
import Pagination from '../Pagination';
import { client } from '../../api/client';
// import useSWR from 'swr';
const ProductCatList = (props) => {
  const { id, name, slug, image, products } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [prds, setPrds] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadProducts = async (page) => {
    setIsLoading(true);

    const response = await client.get(`category/${id}`, {
      page: page
    });
    setPrds((prevState) => ({
      ...prevState,
      data: response.lists.data,
      page: response.lists.page
    }));
    setCurrentPage(page);
    setIsLoading(false);
  };

  // const { data, error } = useSWR(
  //   `api/category/${id}?page=1&perPage=24`,
  //   async (url) => {
  //     console.log('swr', url);

  //     const response = await fetch(url).then((res) => res.json());
  //     console.log(response);
  //     return response;
  //   }
  // );

  // console.log(data);

  return (
    <div className={`section-product ${id}`}>
      <Container>
        <div className="section-header">
          <Header>{name}</Header>
          <span>
            <Link href={`product-cat/${slug}`}>
              <a>Xem thêm</a>
            </Link>
          </span>
        </div>
        <div className="section-products">
          <Grid columns={5}>
            {prds.data.map((prd) => {
              return (
                <Grid.Column key={prd.id}>
                  <Card
                    type={contentType.PRODUCT}
                    data={prd}
                    isLoading={isLoading}
                  />
                </Grid.Column>
              );
            })}
          </Grid>
        </div>
        <div className="section-footer">
          <Pagination
            totalPage={prds.totalPages}
            pageRange={3}
            isLoading={isLoading}
            currentPage={currentPage}
            onSetcurrentPage={handleLoadProducts}
          />
        </div>
      </Container>
    </div>
  );
};

export default memo(ProductCatList);
