<script lang="ts">
	import { EventType, NostrClient, type SynchronisedSession } from 'iz-nostrlib';
	import { normalizeRelayUrl, type TrustedEvent } from '@welshman/util';
	import { onMount } from 'svelte';
	import { Nip52CalendarEvent } from 'iz-nostrlib/dist/org/nostr/nip52/Nip52CalendarEventTemplate';
	import { setContext } from '@welshman/lib';
	import { getDefaultAppContext, getDefaultNetContext } from '@welshman/app';
	import { me } from '../stores/profile.svelte';
	import MapComponent from './MapComponent.svelte';
	import { AbstractNip52CalendarEvent } from 'iz-nostrlib/src/org/nostr/nip52/Nip52CalendarEventTemplate';

	let { kind, pubkey, uuid } = $props();

	let test = $state({ x: 100, y: 'pigs-fly', owner: '' });

	setContext({
		net: getDefaultNetContext(),
		app: getDefaultAppContext()
	});

	// class Xzool {
	// 	title: string = '';
	// 	description: string = '';
	// 	start: Date = new Date();
	// 	geohashs: string[] | undefined = [];
	// 	owner: string = '';
	// }

	let eventState = $state(new AbstractNip52CalendarEvent('', '', '', new Date()));

	// let eventState = $state({
	// 	title: '',
	// 	description: '',
	// 	start: new Date(),
	// 	geohashs: [],
	// 	owner: ''
	// });

	// let title: string = $state('');
	// let decription: string = $state('');
	// let geohashs: string[] | undefined = $state(['sfsfs']);

	const tmpKind2 = 10778;

	let session: SynchronisedSession;

	onMount(async () => {
		const url = 'wss://relay.stream.labs.h3.se';
		const relays = [normalizeRelayUrl(url)];

		session = await NostrClient.getInstance().createSession(relays);
		const coordinate = `${kind}:${pubkey}:${uuid}`;

		session.eventStream.emitter.on(EventType.DISCOVERED, (event: TrustedEvent) => {
			if (event.kind == kind) {
				const cal = new Nip52CalendarEvent(event);

				eventState = cal;
				test.owner = cal.event.pubkey;
				// eventState.title = cal.title;
				// eventState.description = cal.description;
				// eventState.start = cal.start;
				// eventState.owner = cal.event.pubkey;
				// eventState.geohashs = cal.locations;

				// title = cal.title;
				// decription = cal.description;
				// // eventState.date = cal.start;
				// geohashs = cal.locations;

				// entity.onNip52CalendarEventMessage(cal);
			} else if (event.kind == tmpKind2) {
				// const cool = new Nip52CalendarEventRSVPMessage(event);
				// entity.onNip52CalendarEventRSVPMessage(cool);
			}
		});

		// Bob get the event id out of band.
		const subscription = session.createSubscription([
			// Here we subscribe to the membership kind
			{ kinds: [Number(kind)], '#d': uuid, authors: [pubkey] },
			{ kinds: [tmpKind2], '#a': coordinate }
		]);
	});

	function hello() {
		alert('Hello World!');
	}

	function ert(variable: string[][] | undefined): string[][] {
		if (variable === undefined) return [];
		return variable;
	}

	function ert2(variable: string[] | undefined): string[] {
		if (variable === undefined) return [];
		return variable;
	}


</script>

<div>
	{test.x}
</div>
<div>
	And then there was: {test.y}

	{#if me.pubkey === ''}
		You need to log in to interact with us
	{:else }
		{#if me.pubkey === test.owner}
			welcome creator
		{:else }
			welcome visitor
		{/if}
	{/if}

	{eventState.description}

	<h1>
		{eventState.title}
	</h1>
	{eventState.description}
	{eventState.start}
	{eventState.participants}

	{#each ert(eventState.participants) as participant, i}
		{participant}  and {i}
	{/each}

	{#each ert2(eventState.geoHashes) as geoHash, i}
		{geoHash}  and {i}
	{/each}

	{#each ert2(eventState.locations) as location, i}
		{location}  and {i}
	{/each}


	<!--	<MapComponent hash={geohashs[0]} {title} />-->

	<button onclick="{hello}">BUTTON</button>
</div>


<!-- <button onclick={hello}>BUTTON</button> -->

<style></style>
