<script lang="ts">
	import L, { bind } from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import * as ngeohash from 'ngeohash';
	import { onMount } from 'svelte';

	let { hash = $bindable(), title, isInteractive = false }: { hash: string; title: string; isInteractive: boolean } = $props();

	let coordinates = $state({ latitude: 0, longitude: 0 });
	let map: L.Map | undefined = $state();
	let marker: L.Marker | null = $state(null);

	if (hash) coordinates = ngeohash.decode(hash);

	function onMapClick(e: L.LeafletMouseEvent) {
		if (!isInteractive) return;

		coordinates = {
			latitude: e.latlng.lat,
			longitude: e.latlng.lng
		};
		hash = ngeohash.encode(coordinates.latitude, coordinates.longitude);
		console.log(hash);
		if (marker) {
			marker.setLatLng(e.latlng);
			marker.getPopup()?.setContent(title);
		} else {
			marker = L.marker(e.latlng).addTo(map).bindPopup(title).openPopup();
		}
	}

	onMount(() => {
		map = L.map('map2').setView([coordinates.latitude || 0, coordinates.longitude || 0], hash ? 13 : 2);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

		if (hash) {
			marker = L.marker([coordinates.latitude, coordinates.longitude]).addTo(map).bindPopup(title).openPopup();
		}

		if (isInteractive) {
			map.on('click', onMapClick);
		}
	});
</script>

<div id="map2"></div>

<style>
	#map2 {
		width: 100%;
		height: 400px;
	}
</style>
