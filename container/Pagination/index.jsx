import { useEffect, useState } from 'react';
import { createArray } from '../../utils/helper';
import { usePagination } from '../../hooks/usePagination';
import * as Icon from 'react-feather';
import { DOT } from '../../constants/constants';

const Pagination = (props) => {
  const { type, totalPage, totalItem, current, onChangePage, isLoading } =
    props;
  const [currentPage, setCurrentPage] = useState(current);

  const paginations = usePagination({
    totalPage: Number(totalPage),
    currentPage: currentPage,
    pageRange: 3
  });

  const nextPage = () => {
    if (currentPage === Number(totalPage) || isLoading === true) return;
    setCurrentPage((prevState) => prevState + 1);
  };
  const prevPage = () => {
    if (currentPage <= 1 || isLoading === true) return;
    setCurrentPage((prevState) => prevState - 1);
  };
  const onSelectPage = (page) => {
    if (isLoading === true) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    onChangePage(currentPage, 'paginateClick');
  }, [currentPage]);
  return (
    <div className="ec__pagination">
      <ul className="ec__pagination--items">
        <li className="ec__pagination--item prev" onClick={prevPage}>
          <Icon.ArrowLeft size={14} />
        </li>
        {paginations.map((page, index) => {
          if (page === DOT) {
            return (
              <li
                key={index}
                className={
                  currentPage === page
                    ? 'ec__pagination--item active'
                    : 'ec__pagination--item'
                }
              >
                <span key={page}>{page}</span>
              </li>
            );
          } else {
            return (
              <li
                key={index}
                className={
                  currentPage === page
                    ? 'ec__pagination--item active'
                    : 'ec__pagination--item'
                }
                onClick={() => onSelectPage(page)}
              >
                <span key={page}>{page}</span>
              </li>
            );
          }
        })}
        <li className="ec__pagination--item next" onClick={nextPage}>
          <Icon.ArrowRight size={14} />
        </li>
      </ul>
    </div>
  );
};
export default Pagination;
