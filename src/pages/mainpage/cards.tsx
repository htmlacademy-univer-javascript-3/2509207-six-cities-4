import Card from '../../components/card/card';
import { CardProps } from '../../components/card/card';


export type ListCards = {
    places: CardProps[];
}

function ListPlaces({ places }: ListCards): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        places.map((place) => (
          <Card {...place} />
        ))
      }
    </div>
  );
}

export default ListPlaces;
