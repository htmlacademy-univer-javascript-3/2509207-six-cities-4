export type CardProps = {
    Mark: string | null;
    Price: number;
    Rating: number;
    Description: string;
    Type: string;
    Image: string;
    IsBookmarked: boolean;
}

const Premium: React.FC<CardProps> = ({ Mark }) => (
  Mark ? (
    <div className="place-card__mark">
      <span>{Mark}</span>
    </div>
  ) : null
);

function Card(props: CardProps): JSX.Element {
  return (
    <article className="cities__card place-card">
      <Premium {...props} />
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={props.Image} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{props.Price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{props.IsBookmarked ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: props.Rating }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{props.Description}</a>
        </h2>
        <p className="place-card__type">{props.Type}</p>
      </div>
    </article>
  );
}

export default Card;
