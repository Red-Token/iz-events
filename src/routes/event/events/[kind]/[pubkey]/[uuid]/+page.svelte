<script lang="ts">
	import { page } from '$app/state'
	import EventComponent from '@src/components/EventComponent.svelte'
	import MapComponent from '@src/components/MapComponent.svelte'
	import type { Nip52CalendarEvent as EventTypes } from 'iz-nostrlib/dist/org/nostr/nip52/Nip52CalendarEventTemplate'
	import type { TypeOfEvents } from '$lib/types'
	let kind: number = $state(Number(page.params.kind))
	//@ts-ignore
	let eventState: EventTypes = $state({
		uuid: '',
		title: '',
		geoHashes: [''],
		participants: [['']],
		description: '',
		start: Date,
		locations: ['']
	})
</script>

<EventComponent bind:eventState {kind} pubkey={page.params.pubkey} uuid={page.params.uuid} />
<div class="content">
	{#if eventState.title !== '' && eventState.geoHashes}
		<h1>
			{eventState.title}
		</h1>
		<h3>
			{eventState.description}
		</h3>
		<h4>
			{eventState.start}
		</h4>
		<div class="map-container">
			<MapComponent isInteractive={false} hash={eventState.geoHashes[0]} title={eventState.title} />
		</div>
	{/if}
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
		width: 500px;
		height: 400px;
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
</style>
