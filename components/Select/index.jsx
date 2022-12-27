import { useState, useRef, useEffect } from 'react';
import * as Icon from 'react-feather';
import { isEmpty } from '../../utils/helper';
const Select = (props) => {
  const {
    options,
    onSelection,
    selected = {},
    onSetSelected,
    label,
    defaultSelect,
    placeholder
  } = props;
  const selectRef = useRef();
  const [isOpen, setIsOpen] = useState({});
  const onSelectionChange = (e, opt) => {
    e.stopPropagation();
    // if (onSelection !== undefined && typeof onSelection === 'function') {
    //   onSelection(opt);
    // }

    onSetSelected(opt);
    selectRef.current.classList.remove('open');
    setIsOpen(false);
  };

  const outSideClick = (e) => {
    if (e.target.closest('.ec__form--control.select .select-item')) {
      console.log(e);
      // selectRef.current.classList.toggle('open');
      setIsOpen(true);
    } else {
      // selectRef.current.classList.remove('open');
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', outSideClick);

    return () => {
      window.removeEventListener('click', outSideClick);
    };
  }, []);
  return (
    <div
      className={
        (isOpen && 'ec__form--control select open') ||
        'ec__form--control select'
      }
      ref={selectRef}
    >
      {(label && <label className="select-label">{label}</label>) || <></>}
      <div className="select-wrapper">
        <div className="select-item">
          <span className="text">
            {isEmpty(selected) ? label : selected.text}
          </span>
          <span className="icon">
            <Icon.ArrowDown size={12} />
          </span>
        </div>
        <div className="select-options">
          {placeholder && (
            <div className="option" onClick={(e) => onSelectionChange(e, {})}>
              <span className="text">{placeholder}</span>
            </div>
          )}
          {options?.map((opt, index) => (
            <div
              className={
                selected?.value === opt.value ? 'option selected' : 'option'
              }
              onClick={(e) => onSelectionChange(e, opt)}
              key={index}
            >
              <span className="text">{opt.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
