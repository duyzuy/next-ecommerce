import moment from 'moment';

export const formatDate = (date, fm = 'HH:mm - DD/MM/YYYY') => {
  return moment(date).format(fm);
};
