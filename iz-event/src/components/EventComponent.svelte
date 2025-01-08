<script lang="ts">
	import { EventType, NostrClient, type SynchronisedSession } from 'iz-nostrlib';
	//import type {Nip52CalendarEvent as EventTypes} from 'iz-nostrlib/dist/org/nostr/nip52/Nip52CalendarEventTemplate'
	import { normalizeRelayUrl, type TrustedEvent } from '@welshman/util';
	import { onMount } from 'svelte';
	import { Nip52CalendarEvent } from 'iz-nostrlib/dist/org/nostr/nip52/Nip52CalendarEventTemplate';
	import { setContext } from '@welshman/lib';
	import { getDefaultAppContext, getDefaultNetContext } from '@welshman/app';
	import { me } from '../stores/profile.svelte';
	import MapComponent from './MapComponent.svelte';
	import type { TypeEvents } from '$lib/types';

	let { kind, pubkey, uuid }: { kind: number; pubkey: string; uuid: string } = $props();

	let test: { x: number; y: string } = $state({ x: 100, y: 'pigs-fly' });

	setContext({
		net: getDefaultNetContext(),
		app: getDefaultAppContext()
	});

	let eventState: TypeEvents = $state({
		owner: '',
		uuid: '',
		title: '',
		geoHashes: [''],
		description: '',
		date: '',
		places: ['']
	});

	const tmpKind2: number = 10778;

	let session: SynchronisedSession;

	onMount(async () => {
		const url = 'wss://relay.stream.labs.h3.se';
		const relays = [normalizeRelayUrl(url)];

		session = await NostrClient.getInstance().createSession(relays);
		const coordinate = `${kind}:${pubkey}:${uuid}`;

		session.eventStream.emitter.on(EventType.DISCOVERED, (event: TrustedEvent) => {
			//TODO: should be done with explicit type casting in advance.
			if (event.kind == kind) {
				const cal = new Nip52CalendarEvent(event);

				eventState.title = cal.title;
				eventState.description = cal.description;
				eventState.owner = cal.event.pubkey;
				eventState.places = cal.locations;
				eventState.geoHashes = cal.geoHashes;
				eventState.date = cal.start;
				console.log(`
					title = ${cal.title},
					description = ${cal.description},
					event = ${cal.event},
					locations = ${cal.locations},
					geoHashes = ${cal.geoHashes},
					getCoordinate = ${cal.getCoordinate()},
					participants = ${cal.participants},
					start = ${cal.start},
					tags = ${cal.tags},
					uuid = ${cal.uuid}
				`);

				// entity.onNip52CalendarEventMessage(cal);
			} else if (event.kind == tmpKind2) {
				// const cool = new Nip52CalendarEventRSVPMessage(event);
				// entity.onNip52CalendarEventRSVPMessage(cool);
			}
		});

		// Bob get the event id out of band.
		const subscription = session.createSubscription([
			// Here we subscribe to the membership kind
			{ kinds: [kind], '#d': uuid, authors: [pubkey] },
			{ kinds: [tmpKind2], '#a': coordinate }
		]);
	});

	function hello() {
		alert('Hello World!');
	}
</script>

<div class="content">
	<div>
		{test.x}
	</div>

	<div>
		And then there was: {test.y}
		{#if me.pubkey === ''}
			<h4>You need to log in to interact with us</h4>
		{:else if me.pubkey === eventState.owner}
			<h4>Welcome creator</h4>
		{:else}
			<h4>Welcome visitor</h4>
		{/if}
	</div>

	<div>
		{#if eventState.title !== ''}
			<h1>
				{eventState.title}
			</h1>
			<h3>
				{eventState.description}
			</h3>
			<h3>
				{eventState.date}
			</h3>
			<div class="map-container" style="border: 1px solid #000;">
				<MapComponent hash={eventState.geoHashes[0]} title={eventState.title} />
			</div>
		{/if}
	</div>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin-bottom: 20px;
	}

	.content > div {
		margin-bottom: 10px;
	}

	.map-container {
		width: 600px;
		height: 400px;
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
</style>
