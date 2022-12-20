import moment from 'moment';

export const formatDate = (date, fm = 'HH:mm - DD/MM/YYYY') => {
  return moment(date).format(fm);
};

// export const compareDate = (currentDate, EndDate, comp = 'lt') => {
//   const Today = moment()
//   console.log({ currentDate, EndDate, comp });
// };

export const isExpired = (date) => {
  const fm = `YYYY-MM-DD`;
  const today = moment(moment.now()).format(fm);
  const expiredDate = moment(date).format(fm);

  return moment(expiredDate).isBefore(today, 'day');
};
