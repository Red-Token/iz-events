<script lang="ts">
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import { getDefaultAppContext, getDefaultNetContext } from '@welshman/app';
	import MapComponent from '../../../components/MapComponent.svelte';
	import * as ngeohash from 'ngeohash';
	import { DELETE, normalizeRelayUrl, REACTION, type TrustedEvent } from '@welshman/util';
	import { now, setContext, sleep } from '@welshman/lib';
	import { onMount } from 'svelte';
	import { EventType, SignerType, SynchronisedSession } from 'iz-nostrlib';
	import {
		AbstractNip52CalendarEvent,
		Nip52CalendarEvent
	} from 'iz-nostrlib/dist/org/nostr/nip52/Nip52CalendarEventTemplate';

	const route = $state({ params: { id: 'default-id' } });
	const userId = $state(route.params.id);
	const zor = $state({ msg: undefined });

	//const calEvent = $state({ cal: new Nip52CalendarEventTemplate('', '', '', '1900-01-01') });
	const x = 55.7047;
	const y = 13.191;

	onMount(async () => {
		const aliceNSec = 'nsec18c4t7czha7g7p9cm05ve4gqx9cmp9w2x6c06y6l4m52jrry9xp7sl2su9x';
		const msg = 'Hello World';
		let triggered = false;

		setContext({
			net: getDefaultNetContext(),
			app: getDefaultAppContext()
		});

		// const url = 'wss://relay.lxc'
		const url = normalizeRelayUrl('wss://relay.stream.labs.h3.se');
		const relays = [url];

		//const aliceSession = await new SynchronisedSession({ type: SignerType.NIP01, nsec: aliceNSec }, relays).init();

		const TEST_EVENT = 10666;

		//aliceSession.eventStream.emitter.on(EventType.DISCOVERED, (event: TrustedEvent) => {
		//calEvent.cal = new Nip52CalendarEvent(event);

		//const resMsg = JSON.parse(event.content);
		// zor.msg = resMsg;
		// console.log(resMsg);
		// console.log(event);
	});

	// const sub = aliceSession.createSubscription([
	// 	// Here we subscribe to the membership kind
	// 	{ kinds: [TEST_EVENT], ids: [userId] }
	// ]);
	//});
	$effect(() => {
		const xxx = '9q8yyk8yt';
		const coordinates = ngeohash.decode(xxx);
		console.log(coordinates);
	});

	//TODO: It is necessary to use it for displaying the list of created and received events, to add the display of multiple
	//markers on the map, and to include shared links/invites for sending invitations.
	
	//$inspect(calEvent.cal.title, calEvent.cal.description);
</script>

<!-- <div class="container">
	<h1>{calEvent.cal.title}</h1>
	<p>{calEvent.cal.description}</p>
	<div>
		{#each calEvent.cal.geoHashes || [] as hash}
			<MapComponent hash={hash} title={calEvent.cal.title} />
		{/each}
	</div>
</div> -->
