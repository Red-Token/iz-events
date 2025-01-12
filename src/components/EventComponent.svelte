<script lang="ts">
	import { EventType, NostrClient, type SynchronisedSession } from 'iz-nostrlib'
	import type { Nip52CalendarEvent as EventTypes } from 'iz-nostrlib/dist/org/nostr/nip52/Nip52CalendarEventTemplate'
	import { normalizeRelayUrl, type TrustedEvent } from '@welshman/util'
	import { onMount } from 'svelte'
	import { Nip52CalendarEvent } from 'iz-nostrlib/dist/org/nostr/nip52/Nip52CalendarEventTemplate'
	import { setContext } from '@welshman/lib'
	import { getDefaultAppContext, getDefaultNetContext } from '@welshman/app'
	import { me } from '@src/stores/profile.svelte'

	let {
		kind,
		pubkey,
		uuid,
		eventState = $bindable()
	}: { kind: number; pubkey: string; uuid: string; eventState: EventTypes } = $props()

	let test: { x: number; y: string; owner: string } = $state({ x: 100, y: 'pigs-fly', owner: '' })

	setContext({
		net: getDefaultNetContext(),
		app: getDefaultAppContext()
	})

	// class Xzool {
	// 	title: string = '';
	// 	description: string = '';
	// 	start: Date = new Date();
	// 	geohashs: string[] | undefined = [];
	// 	owner: string = '';
	// }

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

	const tmpKind2: number = 10778

	let session: SynchronisedSession

	onMount(async () => {
		const url = 'wss://relay.stream.labs.h3.se'
		const relays = [normalizeRelayUrl(url)]

		session = await NostrClient.getInstance().createSession(relays)
		const coordinate = `${kind}:${pubkey}:${uuid}`

		session.eventStream.emitter.on(EventType.DISCOVERED, (event: TrustedEvent) => {
			if (event.kind == kind) {
				const cal = new Nip52CalendarEvent(event)
				//@ts-ignore
				eventState = {
					uuid: cal.uuid,
					title: cal.title,
					geoHashes: cal.geoHashes,
					participants: cal.participants,
					description: cal.description,
					start: cal.start,
					locations: cal.locations
				}
				test.owner = cal.event.pubkey
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
				`)

				// entity.onNip52CalendarEventMessage(cal);
			} else if (event.kind == tmpKind2) {
				// const cool = new Nip52CalendarEventRSVPMessage(event);
				// entity.onNip52CalendarEventRSVPMessage(cool);
			}
		})

		// Bob get the event id out of band.
		const subscription = session.createSubscription([
			// Here we subscribe to the membership kind
			{ kinds: [kind], '#d': uuid, authors: [pubkey] },
			{ kinds: [tmpKind2], '#a': coordinate }
		])
	})

	function ert(variable: string[][] | undefined): string[][] {
		if (variable === undefined) return []
		return variable
	}

	function ert2(variable: string[] | undefined): string[] {
		if (variable === undefined) return []
		return variable
	}
</script>

<div>
	{test.x}
</div>

<div>
	And then there was: {test.y}
	{#if me.pubkey === ''}
		<h4>You need to log in to interact with us</h4>
	{:else if me.pubkey === test.owner}
		<h4>Welcome creator</h4>
	{:else}
		<h4>Welcome visitor</h4>
	{/if}

	{#each ert(eventState.participants) as participant, i}
		{participant} and {i}
	{/each}

	{#each ert2(eventState.geoHashes) as geoHash, i}
		{geoHash} and {i}
	{/each}

	{#each ert2(eventState.locations) as location, i}
		{location} and {i}
	{/each}
</div>
