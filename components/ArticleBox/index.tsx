import { Placeholder, Header } from 'semantic-ui-react';
type propsType = {
  thumbnail?: string;
  title?: string;
  path?: string;
  shortDes?: string;
};
const ArticleBox: React.FC<propsType> = ({
  thumbnail,
  title,
  path,
  shortDes
}) => {
  return (
    <>
      <div className="ec__article">
        <div className="article-inner">
          <div className="article-image"></div>
          <div className="article-bottom">
            <Header as="h3" className="article-title">
              {title}
            </Header>
            <div className="article-description">{shortDes}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleBox;
