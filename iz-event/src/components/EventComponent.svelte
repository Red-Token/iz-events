<script lang="ts">

	import { EventType, NostrClient } from 'iz-nostrlib';
	import { normalizeRelayUrl, type TrustedEvent } from '@welshman/util';
	import { onMount } from 'svelte';
	import {
		Nip52CalendarEvent,
	} from 'iz-nostrlib/dist/org/nostr/nip52/Nip52CalendarEventTemplate';
	import { setContext } from '@welshman/lib';
	import { getDefaultAppContext, getDefaultNetContext } from '@welshman/app';

	let { kind, pubkey, uuid } = $props();

	let test = $state({ x: 100, y: 'pigs-fly' });

	setContext({
		net: getDefaultNetContext(),
		app: getDefaultAppContext()
	});

	let decription = $state("")

	const tmpKind2 = 10778;

	onMount(async () => {
		const url = 'wss://relay.stream.labs.h3.se';
		const relays = [normalizeRelayUrl(url)];

		const session = await NostrClient.getInstance().createSession(relays);
		const coordinate = `${kind}:${pubkey}:${uuid}`;


		session.eventStream.emitter.on(EventType.DISCOVERED, (event: TrustedEvent) => {

			if (event.kind == kind) {
				const cal = new Nip52CalendarEvent(event);

				decription = cal.description
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

</script>

<style>
</style>

<div>
	{test.x}
</div>
<div>
	And then there was: {test.y}

</div>

{#if NostrClient.getInstance().isLoggedIn()}
	I am soo logged in
{/if}

{decription}

<button onclick="{hello}">BUTTON</button>


