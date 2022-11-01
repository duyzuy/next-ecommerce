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
    asRelative,
    onChange
  } = props;
  const inputRef = useRef();
  // const [inputVal, setInputVal] = useState(() => ({ min, max, value }));

  // console.log(asRelative?.current?.getValue());
  // const limitValue = useMemo(() => {
  //   const lmValue = asRelative?.current?.getValue();

  //   return asRelative?.current?.getValue();
  // }, [asRelative, inputVal]);

  // const onChange = (e) => {
  //   setInputVal((prevState) => ({
  //     ...prevState,
  //     value: Number(e.target.value)
  //   }));
  // };
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return value;
    }
  }));

  // useEffect(() => {
  //   setInputVal(() => ({ min, max, value }));
  // }, [min, max, value]);
  return (
    <div className="ec__control--range">
      {(label && <label>{label}</label>) || <></>}
      {value}
      <div className="ec__input">
        <input
          ref={inputRef}
          type="range"
          id={name}
          min={min}
          max={max}
          value={value}
          step={step}
          name={name}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default forwardRef(InputRange);
