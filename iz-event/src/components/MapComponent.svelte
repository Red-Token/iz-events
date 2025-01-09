<script lang="ts">
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import * as ngeohash from 'ngeohash';

	let { hash, title }: { hash: string; title: string } = $props();

	import { onMount } from 'svelte';

	onMount(() => {
		const coordinates = ngeohash.decode(hash);
		const map = L.map('map2').setView([coordinates.latitude, coordinates.longitude], 13);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

		L.marker([coordinates.latitude, coordinates.longitude]).addTo(map).bindPopup(title).openPopup();
	});
</script>

<div id="map2"></div>

<style>
	#map2 {
		width: 100%;
		height: 100%;
	}
</style>
