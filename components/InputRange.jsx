import {
  useMemo,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect
} from 'react';
const InputRange = (props, ref) => {
  const {
    label,
    min = 0,
    max = 100,
    value = 0,
    step,
    name,
    asRelative
  } = props;
  const inputRef = useRef();
  const [inputVal, setInputVal] = useState({ min, max, value });

  const limitValue = useMemo(() => {
    // const lmValue = asRelative?.current?.getValue();

    return asRelative?.current?.getValue();
  }, [asRelative, inputVal]);
  console.log(limitValue);
  const onChange = (e) => {
    setInputVal((prevState) => ({
      ...prevState,
      value: e.target.value
    }));
  };
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return inputVal;
    }
  }));

  useEffect(() => {
    setInputVal({ min, max, value });
  }, [min, max, value]);
  return (
    <div className="ec__control--range">
      {(label && <label>{label}</label>) || <></>}
      {inputVal.value}
      <div className="ec__input">
        <input
          ref={inputRef}
          type="range"
          id={name}
          min={inputVal.min}
          max={inputVal.max}
          value={inputVal.value}
          step={step}
          name={name}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default forwardRef(InputRange);
