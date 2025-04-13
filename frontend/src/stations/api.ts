import { Station, StationResponse } from '../types';

export async function getStations(): Promise<Station[]> {
    const response = await fetch('/api/station');
    const stations = await response.json();

    return stations.map((station: StationResponse) => ({
        ...station,
        id: station.id.toString(),
        tags: station.tags.split(','),
    }));
}

export async function updateTags(id: Station['id'], tags: Station['tags']) {
    await fetch('/api/updateTags', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            stationId: id,
            tags
        })
    });
}