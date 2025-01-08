<script lang="ts">
	import { page } from '$app/state';
	import EventComponent from '../../../../../../components/EventComponent.svelte';
	let kind: number = $state(Number(page.params.kind));
</script>

<EventComponent {kind} pubkey={page.params.pubkey} uuid={page.params.uuid} />
