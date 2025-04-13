export type StationResponse = {
    id: string;
    name: string;
    tags: string;
};

export type Station = {
    id: string;
    name: string;
    tags: string[];
};

export type TagUpdateRequest = {
    stationId: string;
    tags: string[];
}