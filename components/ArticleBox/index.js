import { Placeholder, Header } from 'semantic-ui-react';

const ArticleBox = (props) => {
  const { thumbnail, title, path, shortDes } = props;
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
