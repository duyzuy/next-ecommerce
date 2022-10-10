const Input = (props) => {
  const { type, asRadio, asCheckbox, icon, name, content, onChange, ...rest } =
    props;

  const handleChange = () => {
    if (onChange !== undefined && typeof onChange === 'function') {
      onChange();
    }
  };

  if (asRadio || asRadio !== undefined) {
    return (
      <div className="ec__form--control radio">
        <input name={name} type="radio" {...rest} onChange={handleChange} />

        <label htmlFor={props.id}>
          {icon !== undefined && typeof icon === 'function' ? (
            <span className="ec__form--icon">{icon()}</span>
          ) : null}
          {content}
        </label>
      </div>
    );
  }
  if (asCheckbox || asCheckbox !== undefined) {
    return (
      <div className="ec__form--control checkbox">
        <input type="checkbox" {...rest} onChange={handleChange} />
        <label htmlFor={props.id}>
          {icon !== undefined && typeof icon === 'function' ? (
            <span className="ec__form--icon">{icon()}</span>
          ) : null}
          {content}
        </label>
      </div>
    );
  }
  return (
    <div className={`ec__input ${type}`}>
      <input {...rest} type={type} />
    </div>
  );
};

export default Input;
