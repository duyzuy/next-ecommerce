import { memo, useMemo } from 'react';
const TextArea = (props) => {
  const { rows, columns, onChange, value, label, noResize } = props;

  const classes = useMemo(() => {
    let clss = 'ec__form--control textarea';
    if (noResize) clss = clss.concat(' ', 'no-resize');

    return clss;
  }, [noResize]);
  return (
    <div className={classes}>
      {(label && <label>{label}</label>) || <></>}
      <textarea
        rows={rows}
        columns={columns}
        onChange={(e) => onChange(e.target.value)}
      >
        {value}
      </textarea>
    </div>
  );
};
export default memo(TextArea);
