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
    host: User;
    images: string[];
    maxAdults: number;
};


export type User = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
}

export type OfferReview = {
    id: string;
    date: string;
    user: User;
    comment: string;
    rating: number;
}

