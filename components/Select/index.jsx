import { useState, useRef, useEffect, useMemo, useTransition } from 'react';
import * as Icon from 'react-feather';
import { Loader } from 'semantic-ui-react';
import { removeVietnameseTones } from '../../utils/helper';
const Select = (props) => {
  const {
    options = [],
    selected = {},
    onSetSelected,
    label,
    defaultSelect,
    isLoading,
    isShowSearch,
    isMultiple
  } = props;
  const selectRef = useRef();
  const [searchInput, setSearchInput] = useState('');
  const [filterText, setFilterText] = useState('');
  const [isPending, startTransition] = useTransition();

  const onSelectionChange = (e, opt) => {
    e.stopPropagation();
    onSetSelected(opt);
    setFilterText('');
    setSearchInput('');
    selectRef.current.closest('.ec__form--control').classList.remove('open');
  };

  const optionsFilter = useMemo(() => {
    return options.reduce((acc, opt) => {
      const isStrIncluded = removeVietnameseTones(opt.text)
        .toLowerCase()
        .includes(removeVietnameseTones(filterText).toLowerCase());

      if (isStrIncluded) {
        acc = [...acc, { ...opt }];
      }
      return acc;
    }, []);
  }, [filterText, options]);

  const onSearchOptions = (value) => {
    setSearchInput(value);
    startTransition(() => {
      setFilterText(value);
    });
  };
  const classes = useMemo(() => {
    let clss = `ec__form--control select`;
    if (isShowSearch) {
      clss = clss.concat(' ', 'has-search');
    }
    return clss;
  }, [isShowSearch]);

  useEffect(() => {
    const outSideClick = (e) => {
      if (selectRef.current.contains(e.target)) {
        selectRef.current.closest('.ec__form--control').classList.add('open');
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
  return (
    <div className={classes}>
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
          {(isShowSearch && (
            <SearchInput
              onSearchOptions={onSearchOptions}
              searchInput={searchInput}
            />
          )) || <></>}
          {(optionsFilter.length > 0 &&
            optionsFilter.map((opt, index) => (
              <Option
                opt={opt}
                key={index}
                selected={selected}
                onSelectionChange={onSelectionChange}
              />
            ))) || (
            <div className="empty">
              <span>Không có dữ liệu</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SearchInput = ({ onSearchOptions, searchInput }) => {
  return (
    <div className="search__control">
      <input
        className="input"
        value={searchInput}
        onChange={(e) => onSearchOptions(e.target.value)}
        placeholder="Tìm kiếm"
      />
    </div>
  );
};

const Option = ({ opt, selected, onSelectionChange }) => {
  return (
    <div
      className={selected?.value === opt?.value ? 'option selected' : 'option'}
      onClick={(e) => onSelectionChange(e, opt)}
    >
      <span className="text">{opt?.text}</span>
    </div>
  );
};
export default Select;
