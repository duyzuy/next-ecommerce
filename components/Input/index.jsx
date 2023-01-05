import { useMemo } from 'react';
const Input = (props) => {
  const {
    type,
    asRadio,
    asCheckbox,
    icon,
    name,
    label,
    onChange,
    iconPosition,
    error,
    ...rest
  } = props;

  const clss = useMemo(() => {
    let classes = 'ec__form--control';
    if (icon) {
      classes = classes.concat(' ', 'has-icon');
    }
    if (type !== undefined) {
      classes = classes.concat(' ', `${type}`);
    }
    if (error) {
      classes = classes.concat(' ', `invalid`);
    }
    return classes;
  }, [type, icon, error]);
  const handleChange = (e) => {
    if (onChange !== undefined && typeof onChange === 'function') {
      onChange(e);
    }
  };

  if (asRadio || asRadio !== undefined) {
    return (
      <div className="ec__form--control radio">
        <input name={name} type="radio" {...rest} onChange={handleChange} />
        <label htmlFor={props.id}>{label}</label>
      </div>
    );
  }
  if (asCheckbox || asCheckbox !== undefined) {
    return (
      <div className="ec__form--control checkbox">
        <input type="checkbox" {...rest} onChange={handleChange} />
        <label htmlFor={props.id}>{label}</label>
      </div>
    );
  }
  return (
    <div className={clss}>
      <label htmlFor={props.id}>{label}</label>
      <div className="ec__form--input">
        {icon !== undefined && typeof icon === 'function' ? (
          <span className="ec__form--icon">{icon()}</span>
        ) : null}
        <input {...rest} type={type} onChange={handleChange} />
        {(error && <p className="error-message">{error}</p>) || <></>}
      </div>
    </div>
  );
};

export default Input;
