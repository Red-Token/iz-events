<script lang="ts">
	import { goto } from '$app/navigation'
	import { NostrClient, SynchronisedSession } from 'iz-nostrlib'
	import * as ngeohash from 'ngeohash'
	import { getEventStore } from '$lib/stores/events'
	import {
		Nip52CalendarEventTemplateBuilder,
		type Nip52CalendarEvent
	} from 'iz-nostrlib/dist/org/nostr/nip52/Nip52CalendarEventTemplate'
	import { normalizeRelayUrl } from '@welshman/util'
	import MapComponent from '@src/components/MapComponent.svelte'
	import type { TypeOfEvents } from '$lib/types'

	let aliceSession: SynchronisedSession

	let hash: string | undefined = $state()

	//@ts-ignore
	let event: Nip52CalendarEvent = $state({
		uuid: '',
		title: '',
		description: '',
		participants: [['']],
		start: '',
		geoHashes: [''],
		locations: ['']
	})

	async function createz() {
		const tmpKind: number = 10777
		// const tmpKind2 = 10778;

		const uuid: string = self.crypto.randomUUID()

		const et = new Nip52CalendarEventTemplateBuilder(
			uuid,
			event.title,
			event.description,
			event.start,
			undefined,
			undefined,
			event.geoHashes
		)

		let nip52EventTemplate = et.createNip52EventTemplate()
		// const eventThin = createEvent(tmpKind, et.createNip52EventTemplate())

		// const TEST_EVENT = 10666;

		const url = 'wss://relay.stream.labs.h3.se'
		const relays = [normalizeRelayUrl(url)]

		aliceSession = await NostrClient.getInstance().createSession(relays)

		const publisher = aliceSession.createPublisher()

		// const payload = template.createNip52EventTemplate();
		const publish = publisher.publish(tmpKind, nip52EventTemplate)

		// const publish = publisher.publish(TEST_EVENT, {
		//   content: JSON.stringify(msg), tags: [
		//     ['d', uuid],
		//     ['title', 'MyEvent'],
		//     ['start', '2024-10-20'],
		//     ['location', '2024-10-20'],
		//   ]
		// })

		const publishResult = await publish.result
		let id = publish.event.id
		console.log(publishResult)

		const eventData: { kind: number; pubkey: string; uuid: string | number | undefined } = {
			kind: tmpKind,
			pubkey: publish.event.pubkey,
			uuid: (publish.event.tags.find(tag => tag[0] === 'd') ?? [0, undefined])[1]
		}

		// const eventStore = getEventStore(id);
		// eventStore.set({
		// 	title: event.title,
		// 	description: event.description,
		// 	geohash: event.place
		// });

		goto(`/event/events/${eventData.kind}/${eventData.pubkey}/${eventData.uuid}`, {})
	}
</script>

<div class="container">
	<p>Let's create a nice EVENT, the best ever</p>
	<div>
		<label for="title">TITLE:</label>
		<input id="title" bind:value={event.title} />
	</div>
	<div>
		<label for="description">DES:</label>
		<input id="description" bind:value={event.description} />
	</div>
	<div>
		<label for="date">Date:</label>
		<input id="date" type="date" bind:value={event.start} />
	</div>
	<div>
		<label for="place">Place:</label>
		<input id="place" bind:value={event.geoHashes[0]} />
	</div>

	<div>
		<MapComponent isInteractive={true} title={event.title} bind:hash={event.geoHashes[0]} />
	</div>
	<button onclick={createz}>CREATE</button>
</div>

<style scoped>
	.container {
		background-color: var(--bg-2);
		padding: 1rem;
		max-width: 500px;
		margin: 0 auto;
		border: 1px solid var(--border-color);
		border-radius: 20px;
		box-shadow: 0 4px 20px var(--shadow-color);
	}
	label {
		display: flex;
		font-weight: normal;
		margin-top: 0.5rem;
	}

	input {
		display: flex;
		width: 100%;
		margin-bottom: 1rem;
		padding: 0.5rem;
		border: 1px solid var(--input-field);
		border-radius: 4px;
	}

	button {
		margin-top: 0.5rem;
		padding: 0.5rem 1rem;
	}

	button:hover {
		box-shadow: 0 0 10px var(--glow-color);
	}
</style>
