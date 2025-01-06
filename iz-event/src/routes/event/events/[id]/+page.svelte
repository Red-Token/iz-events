<script lang="ts">
	import { page } from '$app/state';
	import MapComponent from '../../../../components/MapComponent.svelte';
	let hash = page.params.id
</script>

<div>
	{#if hash}
		<h1>Map for ID: {hash}</h1>
		<div id="map2">
			<MapComponent {hash} title={`Location for ID: ${hash}`} />
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
