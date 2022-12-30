import { useState, useRef, useEffect, useMemo } from 'react';
import * as Icon from 'react-feather';
import { Loader } from 'semantic-ui-react';
const Select = (props) => {
  const {
    options,
    selected = {},
    onSetSelected,
    label,
    defaultSelect,
    isLoading
  } = props;
  const selectRef = useRef();

  const onSelectionChange = (e, opt) => {
    e.stopPropagation();

    onSetSelected(opt);
    selectRef.current.closest('.ec__form--control').classList.remove('open');
  };

  useEffect(() => {
    const outSideClick = (e) => {
      if (selectRef.current.contains(e.target)) {
        selectRef.current
          .closest('.ec__form--control')
          .classList.toggle('open');
      } else {
        selectRef.current
          .closest('.ec__form--control')
          .classList.remove('open');
      }
    };

    window.addEventListener('click', outSideClick);

    return () => {
      window.removeEventListener('click', outSideClick);
    };
  }, [selectRef]);

  useEffect(() => {
    if (defaultSelect) onSetSelected(defaultSelect);
  }, []);
  const Option = ({ opt }) => {
    return (
      <div
        className={selected?.value === opt.value ? 'option selected' : 'option'}
        onClick={(e) => onSelectionChange(e, opt)}
      >
        <span className="text">{opt.text}</span>
      </div>
    );
  };
  return (
    <div className="ec__form--control select">
      {(label && <label className="select-label">{label}</label>) || <></>}
      <div className="select-wrapper" ref={selectRef}>
        <div className="select-item">
          <span className="text">{selected.text || label || 'Select'}</span>
          <span className="icon">
            {(isLoading && <Loader size="mini" active />) || (
              <Icon.ArrowDown size={12} />
            )}
          </span>
        </div>
        <div className="select-options">
          {options?.map((opt, index) => (
            <Option opt={opt} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
