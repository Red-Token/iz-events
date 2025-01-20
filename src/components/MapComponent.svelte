<script lang="ts">
	import L from 'leaflet'
	import 'leaflet/dist/leaflet.css'
	import * as ngeohash from 'ngeohash'
	import { onDestroy, onMount } from 'svelte'

	interface MapProps {
		hash?: string
		title?: string
		isInteractive: boolean
	}

	let { hash = $bindable(), title, isInteractive = false }: MapProps = $props()
	let map: L.Map
	let marker: L.Marker
	let coordinates: { latitude: number; longitude: number } = { latitude: 0, longitude: 0 }

	if (hash) {
		const decoded = ngeohash.decode(hash)
		coordinates = {
			latitude: decoded.latitude,
			longitude: decoded.longitude
		}
	}

	const getHash = (): string => ngeohash.encode(coordinates.latitude, coordinates.longitude)

	const getCoordinatesByIP = async (): Promise<void> => {
		try {
			const response = await fetch('http://ip-api.com/json/')
			const dataRes = await response.json()

			if (dataRes.status === 'success') {
				coordinates = {
					latitude: dataRes.lat,
					longitude: dataRes.lon
				}
				hash = getHash()
			} else {
				throw new Error(`Failed to get coordinates: ${dataRes.message || dataRes.status}`)
			}
		} catch (error) {
			console.error(error)
		}
	}

	const onMapClick = (e: L.LeafletMouseEvent) => {
		coordinates = {
			latitude: e.latlng.lat,
			longitude: e.latlng.lng
		}
		hash = getHash()
		if (marker) {
			marker.setLatLng(e.latlng)
		} else {
			marker = L.marker(e.latlng).addTo(map)
		}
	}
	const SetMarker = () => {
		if (title && marker) marker.bindPopup(title).openPopup()
		else if (marker) marker.getPopup()?.remove()
	}

	$effect(SetMarker)

	onMount(async () => {
		map = L.map('map2')
		if (isInteractive === true) {
			map.on('click', onMapClick)
			await getCoordinatesByIP()
		}
		marker = L.marker([coordinates.latitude, coordinates.longitude]).addTo(map)
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
		map.setView([coordinates.latitude, coordinates.longitude], hash ? 13 : 2)
		SetMarker()
	})

	onDestroy(() => {
		map.remove()
	})
</script>

<div id="map2"></div>

<style>
	#map2 {
		width: 100%;
		height: 400px;
		z-index: 1;
		border-radius: 2%;
		border: 1px solid #000;
	}
</style>
