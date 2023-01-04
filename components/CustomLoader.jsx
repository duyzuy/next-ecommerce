import { Loader } from 'semantic-ui-react';
const CustomLoader = (props) => {
  return (
    <div
      className="custom__loader"
      style={{ padding: '10px 0', width: '100%' }}
    >
      <Loader active {...props}>
        Loading
      </Loader>
    </div>
  );
};
export default CustomLoader;
