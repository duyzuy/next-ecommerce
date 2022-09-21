const SliderNav = ({ onClickPrev, onClickNext, iconPrev, iconNext }) => {
  return (
    <>
      <div className="ec__slide--nav">
        <span className="ec__slide--prev" onClick={onClickPrev}>
          {iconPrev()}
        </span>
        <span className="ec__slide--next" onClick={onClickNext}>
          {iconNext()}
        </span>
      </div>
    </>
  );
};
export default SliderNav;
