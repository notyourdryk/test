import { createEffect, createEvent, createStore, restore } from 'effector';
import * as api from './api';
import { TagUpdateRequest } from '../types';

export const fetchStationsFx = createEffect(api.getStations);
export const $stations = restore(fetchStationsFx.doneData, []);

export const updateTags = createEffect(
    ({ stationId, tags }: TagUpdateRequest) => api.updateTags(stationId, tags)
);