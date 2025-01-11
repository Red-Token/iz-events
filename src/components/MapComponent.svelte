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
	let map: L.Map;
	let marker: L.Marker;
	let coordinates = { latitude: 0, longitude: 0 };

	if (hash) coordinates = ngeohash.decode(hash);

	const getHash = () => ngeohash.encode(coordinates.latitude, coordinates.longitude);
	const getCoordinatesByIP = async () => {
		try {
			const response = await fetch('http://ip-api.com/json/');
			const dataRes = await response.json();

			if (dataRes.status === 'success') {
				coordinates = {
					latitude: dataRes.lat,
					longitude: dataRes.lon
				};
				hash = getHash();
			} else {
				throw new Error(`Failed to get coordinates: ${dataRes.status}`);
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
		hash = getHash();
		if (marker) {
			marker.setLatLng(e.latlng);
		} else {
			marker = L.marker(e.latlng).addTo(map);
		}
	};

	const setMarker = () => {
		if (title && marker) marker.bindPopup(title).openPopup();
		else if (marker) marker.getPopup()?.remove();
	};

	$effect(() => setMarker())

	onMount(async () => {
		map = L.map('map2');
		if (isInteractive === true) {
			map.on('click', onMapClick);
			await getCoordinatesByIP();
		}
		marker = L.marker([coordinates.latitude, coordinates.longitude]).addTo(map);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
		map.setView([coordinates.latitude, coordinates.longitude], hash ? 13 : 2);
		setMarker()
	});
</script>

<div id="map2"></div>

<style>
	#map2 {
		width: 100%;
		height: 400px;
	}
</style>
