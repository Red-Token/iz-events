import { writable, get } from 'svelte/store'
import type { TypeOfEvents } from '../types'
const eventStores = new Map()

export function getEventStore(id: string) {
	if (!eventStores.has(id)) {
		eventStores.set(
			id,
			writable<TypeOfEvents>({
				uuid: '',
				title: '',
				geoHashes: [''],
				participants: [['']],
				description: '',
				start: '',
				locations: ['']
			})
		)
	}
	return eventStores.get(id)
}

export function getEventValue(id: string) {
	const store = getEventStore(id)
	return get(store)
}
