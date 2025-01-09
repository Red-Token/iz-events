<script lang="ts">
	import { goto } from '$app/navigation';
	import { NostrClient, SynchronisedSession } from 'iz-nostrlib';
	import * as ngeohash from 'ngeohash';
	import { getEventStore } from '$lib/stores/events';
	import { Nip52CalendarEventTemplateBuilder } from 'iz-nostrlib/dist/org/nostr/nip52/Nip52CalendarEventTemplate';
	import { normalizeRelayUrl } from '@welshman/util';
	import MapComponent from '../../../components/MapComponent.svelte';

	let aliceSession: SynchronisedSession;

	const lat: number = 37.7749;
	const lon: number = -122.4194;
	let hash: string = ngeohash.encode(lat, lon);
	let event: { title: string; description: string; date: string | Date; place: string } = $state({
		title: '',
		description: '',
		date: new Date,
		place: hash
	});

	async function createz() {
		const tmpKind: number = 10777;
		// const tmpKind2 = 10778;

		const uuid: string = self.crypto.randomUUID();

		const et = new Nip52CalendarEventTemplateBuilder(
			uuid,
			event.title,
			event.description,
			event.date,
			undefined,
			undefined,
			[event.place]
		);

		let nip52EventTemplate = et.createNip52EventTemplate();
		// const eventThin = createEvent(tmpKind, et.createNip52EventTemplate())

		// const TEST_EVENT = 10666;

		const url = 'wss://relay.stream.labs.h3.se';
		const relays = [normalizeRelayUrl(url)];

		aliceSession = await NostrClient.getInstance().createSession(relays);

		const publisher = aliceSession.createPublisher();

		// const payload = template.createNip52EventTemplate();
		const publish = publisher.publish(tmpKind, nip52EventTemplate);

		// const publish = publisher.publish(TEST_EVENT, {
		//   content: JSON.stringify(msg), tags: [
		//     ['d', uuid],
		//     ['title', 'MyEvent'],
		//     ['start', '2024-10-20'],
		//     ['location', '2024-10-20'],
		//   ]
		// })

		const publishResult = await publish.result;
		let id = publish.event.id;
		console.log(publishResult);

		const eventData: { kind: number; pubkey: string; uuid: string | number | undefined } = {
			kind: tmpKind,
			pubkey: publish.event.pubkey,
			uuid: (publish.event.tags.find((tag) => tag[0] === 'd') ?? [0, undefined])[1]
		};

		// const eventStore = getEventStore(id);
		// eventStore.set({
		// 	title: event.title,
		// 	description: event.description,
		// 	geohash: event.place
		// });

		goto(`/event/events/${eventData.kind}/${eventData.pubkey}/${eventData.uuid}`, {});
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
		<input id="date" type="date" bind:value={event.date} />
	</div>
	<div>
		<label for="place">Place:</label>
		<input id="place" bind:value={event.place} />
	</div>
	<div>
		<MapComponent isInteractive={true} title={event.title} bind:hash={event.place} />
	</div>
	<button onclick={createz}>CREATE</button>
</div>

<style scoped>
	.container {
		font-family: Arial, sans-serif;
		padding: 1rem;
		max-width: 500px;
		margin: 0 auto;
		border: 1px solid #ccc;
		border-radius: 8px;
	}

	label {
		display: block;
		font-weight: bold;
		margin-top: 0.5rem;
	}

	input {
		display: block;
		width: 100%;
		margin-bottom: 1rem;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	button {
		margin-top: 0.5rem;
		padding: 0.5rem 1rem;
		background-color: #007bff;
		color: #fff;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #0056b3;
	}
</style>
