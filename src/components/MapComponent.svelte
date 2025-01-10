<script lang="ts">
	import L, { bind } from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import * as ngeohash from 'ngeohash';
	import { onMount } from 'svelte';

	let {
		hash = $bindable(),
		title,
		isInteractive = false
	}: { hash: string; title: string; isInteractive: boolean } = $props();

	let coordinates = $state({ latitude: 0, longitude: 0 });
	let map: L.Map;
	let marker: L.Marker | undefined = $state();

	if (hash) coordinates = ngeohash.decode(hash);

	const getHash = (coordinates: { latitude: number; longitude: number }) =>
		ngeohash.encode(coordinates.latitude, coordinates.longitude);

	const getCoordinatesByIP = async () => {
		if (isInteractive === false) return;
		try {
			const response = await fetch('http://ip-api.com/json/');
			const data = await response.json();

			if (data.status === 'success') {
				return (coordinates = {
					latitude: data.lat,
					longitude: data.lon
				});
			} else {
				throw new Error('Failed to get coordinates');
			}
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const onMapClick = (e: L.LeafletMouseEvent) => {
		coordinates = {
			latitude: e.latlng.lat,
			longitude: e.latlng.lng
		};
		hash = getHash(coordinates);

		if (marker) {
			marker.setLatLng(e.latlng);
		} else {
			marker = L.marker(e.latlng).addTo(map);
		}
		if (title) {
			marker.bindPopup(title).openPopup();
		}
	};

	onMount(async () => {
		map = L.map('map2');
		if (isInteractive === true) {
			map.on('click', onMapClick);
			await getCoordinatesByIP().then(coordinates => {
				if (coordinates) {
					hash = getHash(coordinates);
				}
			});
		}
		setViewMap(map);
	});

	const setViewMap = $derived((map: L.Map) => {
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
		map.setView([coordinates.latitude || 0, coordinates.longitude || 0], hash ? 13 : 2);
		marker = L.marker([coordinates.latitude, coordinates.longitude]).addTo(map);
		if (title) marker.bindPopup(title).openPopup();
	});
</script>

<div id="map2"></div>

<style>
	#map2 {
		width: 100%;
		height: 400px;
	}
</style>
