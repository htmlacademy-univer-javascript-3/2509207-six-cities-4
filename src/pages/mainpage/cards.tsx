import Card from '../../components/card/card';
import { CardProps } from '../../components/card/card';



export type ListCards = {
    places: CardProps[];
}


function Cards({ count }: {count: number}): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        [...Array<number>(count)].map((e) => (
          <Card {...offerInfo} key={e}/>
        ))
      }
    </div>
  );
}
export default Cards;

const offerInfo = {
  id: '1',
  title: 'Beautiful & luxurious apartment at great location',
  type: 'Apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    }
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8
  },
  isFavorite: false,
  isPremium: true,
  rating: 4,
  previewImage: 'img/apartment-01.jpg'
}