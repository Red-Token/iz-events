<script lang="ts">
	import { page } from '$app/state';
	import EventComponent from '../../../../../../components/EventComponent.svelte';
</script>

<EventComponent kind={page.params.kind} pubkey={page.params.pubkey} uuid={page.params.uuid} />
