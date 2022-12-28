import { useState, useRef, useEffect } from 'react';
import * as Icon from 'react-feather';
import { isEmpty } from '../../utils/helper';
const Select = (props) => {
  const {
    options,
    selected = {},
    onSetSelected,
    label,
    defaultSelect,
    placeholder
  } = props;
  const selectRef = useRef();

  const onSelectionChange = (e, opt) => {
    e.stopPropagation();

    onSetSelected(opt);
    selectRef.current.classList.remove('open');
  };

  useEffect(() => {
    const outSideClick = (e) => {
      if (selectRef.current.contains(e.target)) {
        selectRef.current.classList.toggle('open');
      } else {
        selectRef.current.classList.remove('open');
      }
    };

    window.addEventListener('click', outSideClick);

    return () => {
      window.removeEventListener('click', outSideClick);
    };
  }, [selectRef]);
  return (
    <div className="ec__form--control select" ref={selectRef}>
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
