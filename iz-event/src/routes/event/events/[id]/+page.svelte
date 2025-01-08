<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import { page } from '$app/state';
	import MapComponent from '../../../../components/MapComponent.svelte';
	import type { PageData } from '../[id]/$types';

	let eventhash = page.params.id
	let { data }: { data: PageData } = $props();
	let title = data.title;
	let hash = data.geoHash;

	console.log(title);
	console.log(hash);
</script>

<div>
	{#if data.event}
		<h1>Map for ID: {eventhash}</h1>
		<div id="map2">
			<MapComponent {hash} title={`Location for : ${title}`} />
		</div>
	{:else}
		<h1>hash undefined</h1>
	{/if}
</div>

<style>
	#map2 {
		width: 100%;
		height: 400px;
	}
</style>
