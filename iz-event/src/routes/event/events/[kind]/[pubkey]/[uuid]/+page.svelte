<script lang="ts">
	import { page } from '$app/state';
	import EventComponent from '../../../../../../components/EventComponent.svelte';
	import MapComponent from '../../../../../../components/MapComponent.svelte';
	import type { TypeEvents } from '$lib/types';
	import { div } from '@welshman/lib';
	let kind: number = $state(Number(page.params.kind));
	let test1: TypeEvents = $state({
		owner: '',
		uuid: '',
		title: '',
		geoHashes: [''],
		description: '',
		date: '',
		places: ['']
	});
</script>

<EventComponent bind:test1 {kind} pubkey={page.params.pubkey} uuid={page.params.uuid} />
<div class="content" >
	{#if test1.title !== ''}
		<h1>
			{test1.title}
		</h1>
		<h3>
			{test1.description}
		</h3>
		<h4>
			{test1.date}
		</h4>
		<div class="map-container" style="border: 1px solid #000;">
			<MapComponent hash={test1.geoHashes[0]} title={test1.title} />
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
		width: 600px;
		height: 400px;
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
</style>
