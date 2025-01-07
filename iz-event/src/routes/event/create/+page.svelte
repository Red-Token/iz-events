<script lang="ts">
	import { goto } from '$app/navigation';
	import { NostrClient, SynchronisedSession } from 'iz-nostrlib';
	import * as ngeohash from 'ngeohash';
	import { Nip52CalendarEventTemplateBuilder } from 'iz-nostrlib/dist/org/nostr/nip52/Nip52CalendarEventTemplate';
	import { normalizeRelayUrl } from '@welshman/util';

	// let event = $state({
	// 	tile: '',
	// 	description: '',
	// 	date: '',
	// 	place: ngeohash.encode(lat, lon)
	// });

	let aliceSession: SynchronisedSession;

	$effect.pre(() => {
		// async () => {
		// };
	});

	const lat = 37.7749;
	const lon = -122.4194;

	const hash = ngeohash.encode(lat, lon);
	const event = { tile: '', description: '', date: '', place: hash };

	async function createz() {

		const tmpKind = 10777;
		// const tmpKind2 = 10778;

		const uuid = self.crypto.randomUUID()

		const et = new Nip52CalendarEventTemplateBuilder(
			uuid, event.tile, event.description, event.date, undefined, undefined, [event.place]);

		let nip52EventTemplate = et.createNip52EventTemplate();
		// const eventThin = createEvent(tmpKind, et.createNip52EventTemplate())


		// const TEST_EVENT = 10666;
		// const msg = 'Hello World';

		const url = 'wss://relay.stream.labs.h3.se'
		const relays = [normalizeRelayUrl(url)]

		aliceSession = await NostrClient.getInstance().createSession(relays);

		const publisher = aliceSession.createPublisher();
		// const uuid = randomUUID()
		// const uuid = 'sdfdsfsdfsd';
		//
		// const template = new Nip52CalendarEventTemplate(
		// 	uuid,
		// 	event.tile,
		// 	event.description,
		// 	event.date,
		// 	undefined,
		// 	undefined,
		// 	[event.place]
		// );

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
		console.log(publishResult);

		const eventData = {
			kind: tmpKind,
			pubkey: publish.event.pubkey,
			uuid: (publish.event.tags.find(tag => tag[0] === 'd') ?? [0, undefined])[1],
		}

		goto(`/event/events/${eventData.kind}/${eventData.pubkey}/${eventData.uuid}`, {});
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
