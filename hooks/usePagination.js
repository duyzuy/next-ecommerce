import { makeArrayFromNumber } from '../utils/helper';

import { DOT } from '../constants/constants';
const usePagination = ({ totalPage, currentPage, pageRange }) => {
  let paginations = [];

  const minimumPageNum = pageRange + 4; //next + prev + 2 dots;
  if (totalPage <= minimumPageNum) {
    return makeArrayFromNumber(1, totalPage);
  }

  const startOfPage = 1;
  const lastOfPage = totalPage;

  let startPaginate = currentPage;
  let endPaginate = currentPage + pageRange - 1;

  if (currentPage === 1) {
    startPaginate = currentPage;
    endPaginate = currentPage + pageRange + 1;
  } else {
    startPaginate = currentPage - 1;
    endPaginate = currentPage + pageRange;
  }

  if (currentPage > totalPage - pageRange) {
    endPaginate = totalPage;
    startPaginate = totalPage - pageRange - 1;
  }

  const pageinate = makeArrayFromNumber(startPaginate, endPaginate);

  if (currentPage <= minimumPageNum) {
    paginations = [...pageinate, DOT, lastOfPage];
  }

  if (currentPage >= totalPage - minimumPageNum) {
    paginations = [1, DOT, ...pageinate];
  }

  if (
    currentPage > minimumPageNum &&
    currentPage < totalPage - minimumPageNum
  ) {
    const middlePaginate = makeArrayFromNumber(startPaginate, endPaginate - 2);
    paginations = [startOfPage, DOT, ...middlePaginate, DOT, lastOfPage];
  }
  return paginations;
};

export { usePagination };
