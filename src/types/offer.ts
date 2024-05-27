type OfferLocation = {
    latitude: number;
    longitude: number;
    zoom: number;
}

export type OfferProps = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: {
        name: string;
        location: OfferLocation;
    };
    location: OfferLocation;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
}

export type DetailedOfferProps = OfferProps & {
    description: string;
    bedrooms: number;
    goods: string[];
    host: {
        name: string;
        avatarUrl: string;
        isPro: boolean;
    };
    images: string[];
    maxAdults: number;
};
