import * as Icon from 'react-feather';
const EcModal = ({ title, isShow, render }) => {
  if (!isShow) return null;

  if (render && typeof render !== 'function')
    throw new Error('render must function');

  return (
    <div className="ec__modal">
      <div className="ec__modal--overlay"></div>
      <div className="ec__modal--container">
        <div className="ec__modal--inner">
          {(title && (
            <div className="ec__modal--header">
              <h4>{title}</h4>
              <div className="ec__modal--close">
                <Icon.X size={16} />
              </div>
            </div>
          )) || <></>}
          <div className="ec__modal--body">{render()}</div>
          <div className="ec__modal--footer"></div>
        </div>
      </div>
    </div>
  );
};

export default EcModal;
