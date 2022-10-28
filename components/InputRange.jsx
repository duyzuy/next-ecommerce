import {
  useMemo,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect
} from 'react';
const InputRange = (props, ref) => {
  const { label, min, max, value, step, name, asRelative } = props;
  const inputReft = useRef();
  const [inputVal, setInputVal] = useState(value);
  const onChange = (e) => {
    if (asRelative !== undefined) {
      const liMitValue = asRelative.current.getValue();

      if (inputVal > liMitValue) return;
    } else {
      setInputVal(e.target.value);
    }
  };
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return inputVal;
    }
  }));

  useEffect(() => {}, [inputVal]);
  return (
    <div className="ec__control--range">
      {(label && <label>{label}</label>) || <></>}
      {inputVal}
      <div className="ec__input">
        <input
          ref={inputReft}
          type="range"
          id={name}
          min={min}
          max={max}
          value={inputVal}
          step={step}
          name={name}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default forwardRef(InputRange);
