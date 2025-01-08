import { writable, get } from 'svelte/store';

const eventStores = new Map();

export function getEventStore(id: string) {
    if (!eventStores.has(id)) {
        eventStores.set(id, writable<EventData>({
            uuid: '',
            title: '',
            description: '',
            geohash: '',
			date: '',
			geoHashs: '',
			place: '',
        }));
    }
    return eventStores.get(id);
}

export function getEventValue(id: string) {
    const store = getEventStore(id);
    return get(store);
}