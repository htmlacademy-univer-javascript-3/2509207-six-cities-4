
export type City = Point & {
    zoom: number;
};

export type Point = {
    title: string;
    latitude: number;
    longitude: number;
};
