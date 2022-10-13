import { useMemo } from 'react';
import * as Icon from 'react-feather';
import { makeArrayFromNumber } from '../../utils/helper';
const RateStars = (props) => {
  const { maxRating = 5, asRevert, rate, size, spacing, ...rest } = props;
  const arrStar = makeArrayFromNumber(1, maxRating);

  const styles = useMemo(() => {
    let stylesObj = {};

    if (spacing !== undefined) {
      stylesObj = {
        ...stylesObj,
        marginLeft: spacing
      };
    }
    return stylesObj;
  }, [spacing]);
  return (
    <span
      className="starts"
      style={{
        display: 'inline-flex',
        flexDirection: (asRevert && 'row-reverse') || 'row'
      }}
    >
      {arrStar.map((key) => {
        return (
          <Icon.Star
            key={key}
            size={size}
            style={{
              fill: key <= rate ? '#ffdd34' : '#f1f1f1',
              color: key <= rate ? '#ff9943' : '#d2d2d2',
              ...styles
            }}
            {...rest}
          />
        );
      })}
    </span>
  );
};
export default RateStars;
