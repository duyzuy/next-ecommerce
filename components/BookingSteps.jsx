import { memo } from 'react';
const BookingSteps = ({ active, current, steps }) => {
  return (
    <div className="booking steps">
      <div className="inner">
        {steps.map((step) => {
          let clss = 'step';
          if (active.includes(step.key)) {
            clss = clss.concat(' ', 'active');
          }
          if (step.key === current) {
            clss = clss.concat(' ', 'current');
          }

          return (
            <BookingStep
              className={clss}
              icon={step.icon}
              key={step.key}
              title={step.name}
            />
          );
        })}
      </div>
    </div>
  );
};
const BookingStep = ({ isActive, className, title, icon }) => {
  const IconComp = () => {
    if (typeof icon === 'function') {
      return <>{icon()}</>;
    }
    return <></>;
  };

  return (
    <div className={className}>
      <div className="number">
        <IconComp />
      </div>
      <div className="text">{title}</div>
    </div>
  );
};
export default memo(BookingSteps);
