<script lang="ts">
	import { goto } from '$app/navigation';
	import { now, setContext, sleep } from '@welshman/lib';
	import { getDefaultAppContext, getDefaultNetContext } from '@welshman/app';
	import { DELETE, normalizeRelayUrl, REACTION, type TrustedEvent } from '@welshman/util';
	import { EventType, SignerType, SynchronisedSession } from 'iz-nostrlib';
	import { Nip52CalendarEventTemplate } from 'iz-nostrlib/dist/org/nostr/nip52/Nip52CalendarEventTemplate';
	import * as ngeohash from 'ngeohash';

	const x = 55.7047;
	const y = 13.191;

	// let event = $state({
	// 	tile: '',
	// 	description: '',
	// 	date: '',
	// 	place: ngeohash.encode(lat, lon)
	// });

	let aliceSession: SynchronisedSession;

	$effect.pre(() => {
		async () => {
			const aliceNSec = 'nsec18c4t7czha7g7p9cm05ve4gqx9cmp9w2x6c06y6l4m52jrry9xp7sl2su9x';

			setContext({
				net: getDefaultNetContext(),
				app: getDefaultAppContext()
			});

			// const url = 'wss://relay.lxc'
			const url = 'wss://relay.stream.labs.h3.se';
			const relays = [normalizeRelayUrl(url)];

			aliceSession = await new SynchronisedSession({ type: SignerType.NIP01, nsec: aliceNSec }, relays).init();
		};
	});

	const lat = 37.7749;
	const lon = -122.4194;

	const hash = ngeohash.encode(lat, lon);
	const event = { tile: '', description: '', date: '', place: hash };

	
	async function createz() {
		const TEST_EVENT = 10666;
		const msg = 'Hello World';
		const publisher = aliceSession.createPublisher();
		// const uuid = randomUUID()
		const uuid = 'sdfdsfsdfsd';

		const template = new Nip52CalendarEventTemplate(
			uuid,
			event.tile,
			event.description,
			event.date,
			undefined,
			undefined,
			[event.place]
		);

		const payload = template.createNip52EventTemplate();
		const publish = publisher.publish(TEST_EVENT, payload);

		// const publish = publisher.publish(TEST_EVENT, {
		//   content: JSON.stringify(msg), tags: [
		//     ['d', uuid],
		//     ['title', 'MyEvent'],
		//     ['start', '2024-10-20'],
		//     ['location', '2024-10-20'],
		//   ]
		// })

		const publishResult = await publish.result;
		console.log(publishResult);

		const id = publish.event.id;
		await goto(`/event/${id}`);
	}
</script>

<div class="container">
	<p>Let's create a nice EVENT, the best ever</p>
	<div>
		<label for="title">TITLE:</label>
		<input id="title" bind:value={event.tile} />
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
