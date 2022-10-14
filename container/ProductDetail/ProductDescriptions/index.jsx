import { useState, memo } from 'react';
import { Header } from 'semantic-ui-react';
import * as Icon from 'react-feather';

const ProductDescriptions = (props) => {
  const [isExpand, setIsExpand] = useState(false);
  const { description } = props;

  return (
    <>
      <Header as="h4" className="ec__product--body--title">
        <Icon.FileText
          size={22}
          style={{
            marginRight: 10,
            position: 'relative',
            marginRight: 10,
            top: 4
          }}
        />
        {props.title}
      </Header>
      <div
        className={
          (isExpand && 'ec__product--description expanded') ||
          'ec__product--description'
        }
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <div className="ec__product--expand">
        <span
          className="button button--link has-icon"
          onClick={() => setIsExpand((prevState) => !prevState)}
        >
          {(isExpand && (
            <>
              Thu gọn <Icon.ChevronUp size={16} />
            </>
          )) || (
            <>
              Xem thêm <Icon.ChevronDown size={16} />
            </>
          )}
        </span>
      </div>
    </>
  );
};

export default memo(ProductDescriptions);
