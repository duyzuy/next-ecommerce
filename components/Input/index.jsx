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
    ...rest
  } = props;

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
    <div className={`ec__form--control ${type}`}>
      <label htmlFor={props.id}>{label}</label>
      <div className="ec__form--input">
        {icon !== undefined && typeof icon === 'function' ? (
          <span className="ec__form--icon">{icon()}</span>
        ) : null}
        <input {...rest} type={type} onChange={handleChange} />
      </div>
    </div>
  );
};

export default Input;
