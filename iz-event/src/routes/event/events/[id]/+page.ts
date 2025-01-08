import { getEventStore } from '$lib/stores/events';
import { get } from 'svelte/store'; 
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    if (params.id) {
        const eventStore = getEventStore(params.id);

        const eventData:EventData = get(eventStore);

        return {
            event: eventData,
            title: eventData.title, 
            geoHash: eventData.geohash 
        };
    }
    error(404, 'Not found');
};