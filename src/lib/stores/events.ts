import { writable, get } from 'svelte/store';
import type { TypeEvents } from '../types';
const eventStores = new Map();

export function getEventStore(id: string) {
    if (!eventStores.has(id)) {
        eventStores.set(id, writable<TypeEvents>({
            owner: '',
            uuid: '',
            title: '',
            geoHashes: [''],
            description: '',
			start: '',
			places: [''],
        }));
    }
    return eventStores.get(id);
}

export function getEventValue(id: string) {
    const store = getEventStore(id);
    return get(store);
}