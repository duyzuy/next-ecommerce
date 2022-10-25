import { useEffect, useState, useMemo, memo } from 'react';
import { usePagination } from '../../hooks/usePagination';
import * as Icon from 'react-feather';
import { DOT, paginateAction } from '../../constants/constants';

const Pagination = (props) => {
  const {
    type,
    totalPage,
    totalItem,
    currentPage,
    onSetcurrentPage,
    isLoading,
    position,
    showStatus = false
  } = props;

  const paginations = usePagination({
    totalPage: Number(totalPage),
    currentPage: currentPage,
    pageRange: 3
  });
  console.log('paginate', currentPage);
  const handleSelectPage = (action, page) => {
    switch (action) {
      case paginateAction.NEXT:
        {
          if (currentPage === Number(totalPage) || isLoading === true) return;
          onSetcurrentPage((prevState) => prevState + 1);
        }
        break;
      case paginateAction.PREV:
        {
          if (currentPage <= 1 || isLoading === true) return;
          onSetcurrentPage((prevState) => prevState - 1);
        }
        break;
      default: {
        if (isLoading === true) return;
        onSetcurrentPage(page);
      }
    }
  };
  const classes = useMemo(() => {
    let cls = 'ec__pagination';
    if (position && position === 'left') {
      cls = cls.concat(' ', 'left');
    }

    if (position && position === 'right') {
      cls = cls.concat(' ', 'right');
    }
    if (isLoading) {
      cls = cls.concat(' ', 'is-loading');
    }
    if (showStatus) {
      cls = cls.concat(' ', 'is-between');
    }
    return cls;
  }, [position, isLoading]);

  if (paginations.length <= 1) {
    return <></>;
  }
  return (
    <div className={classes}>
      {(showStatus && (
        <div className="ec__pagination--note">
          <div>
            <span>
              Trang {currentPage} / {totalPage} - {totalItem} sản phẩm
            </span>
          </div>
        </div>
      )) || <></>}
      <div className="ec__pagination--inner">
        <div
          className="ec__pagination--item prev"
          onClick={() => handleSelectPage(paginateAction.PREV)}
        >
          <Icon.ArrowLeft size={14} />
        </div>
        <ul className="ec__pagination--items">
          {paginations.map((page, index) => {
            if (page === DOT) {
              return (
                <li key={index} className="ec__pagination--item dot">
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
                  onClick={() => handleSelectPage(paginateAction.SELECT, page)}
                >
                  <span key={page}>{page}</span>
                </li>
              );
            }
          })}
        </ul>
        <div
          className="ec__pagination--item next"
          onClick={() => handleSelectPage(paginateAction.NEXT)}
        >
          <Icon.ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
};
export default memo(Pagination);
