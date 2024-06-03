import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { City, Point } from '../../types/location';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import { OfferProps } from '../../types/offer';

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

type MapProps = {
    city: City;
    offers: OfferProps[];
    highlightedOffer?: OfferProps;
    pageType: 'cities' | 'offer';
}

function getPointFromOffer(offer?: OfferProps): Point | null {
  return offer ? {
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    title: offer.id
  } : null;
}

export default function Map({ city, offers, highlightedOffer, pageType }: MapProps): JSX.Element {
  const offerPoints = offers.map(getPointFromOffer).filter((point): point is Point => point !== null);
  const selectedPoint = getPointFromOffer(highlightedOffer);

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer.options.pane === 'markerPane') {
          map.removeLayer(layer);
        }
      });
      const markerLayer = layerGroup().addTo(map);
      offerPoints.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            point.title === selectedPoint?.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offerPoints, selectedPoint]);
  useEffect(() => {
    if (map) {
      map.flyTo([city.latitude, city.longitude], city.zoom);
    }
  }, [map, city]);

  return <section className={`${pageType}__map map`} ref={mapRef}></section>;
}
