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

          const IconComp = () => {
            if (typeof step.icon === 'function') {
              return step.icon();
            }
            return step.icon;
          };

          return (
            <div key={step.key} className={clss}>
              <div className="number">
                <IconComp />
              </div>
              <div className="text">{step.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default memo(BookingSteps);
