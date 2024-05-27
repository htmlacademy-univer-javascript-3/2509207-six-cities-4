import { City } from '../src/types/location';
import { OfferProps, DetailedOfferProps } from '../src/types/offer';


export const DefaultLocations: City[] = [
  { title: 'Paris', zoom: 7, latitude: 52.3909553943508, longitude: 4.85309666406198 },
  { title: 'Cologne', zoom: 7, latitude: 52.3909553943508, longitude: 4.85309666406198 },
  { title: 'Brussels', zoom: 7, latitude: 52.3909553943508, longitude: 4.85309666406198 },
  { title: 'Amsterdam', zoom: 7, latitude: 52.3909553943508, longitude: 4.85309666406198 },
  { title: 'Hamburg', zoom: 7, latitude: 52.3909553943508, longitude: 4.85309666406198 },
  { title: 'Dusseldorf', zoom: 7, latitude: 52.3909553943508, longitude: 4.85309666406198 }
];


export const DefaultOffers: OfferProps[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    isFavorite: false,
    isPremium: true,
    rating: 4,
    previewImage: 'img/apartment-01.jpg'
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 4,
    previewImage: 'img/room.jpg'
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'img/apartment-02.jpg'
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
    price: 180,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
    },
    isFavorite: false,
    isPremium: true,
    rating: 5,
    previewImage: 'img/apartment-03.jpg'

  }
];

export const OfferWithDetailsMock: DetailedOfferProps = {
  id: '1',
  title: 'Beautiful & luxurious apartment at great location',
  type: 'Apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    }
  },
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 8
  },
  isFavorite: false,
  isPremium: true,
  rating: 4,
  previewImage: 'img/apartment-01.jpg',
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  bedrooms: 3,
  goods: [
    'Heating',
    'Wi-Fi',
    'Washing machine',
    'Towels',
    'Coffee machine'
  ],
  host: {
    name: 'Oliver Conner',
    avatarUrl: 'img/avatar-angelina.jpg',
    isPro: false
  },
  images: [
    'https://url-to-image/image.png'
  ],
  maxAdults: 4
};
