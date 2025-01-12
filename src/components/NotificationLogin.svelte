<script lang="ts">
	import { me } from '@src/stores/profile.svelte'
	import { onDestroy, onMount } from 'svelte'
	let { isVisible = false }: { isVisible: boolean } = $props()

	onMount(() => {
		if (isVisible)
			setTimeout(() => {
				isVisible = false
			}, 3500)
	})
	
</script>

<div
	class="popup-notification-login"
	onclick={() => (isVisible = false)}
	style="display: {isVisible ? 'block' : 'none'}; cursor: pointer;"
>
	<h3>Welcome to Iz-Event, {me.profile?.name}!</h3>
</div>

<style>
	.popup-notification-login {
		position: absolute;
		top: 60px;
		right: 20px;
		background-color: var(--bg-2);
		border: 1px solid var(--border-color);
		border-radius: 5px;
		padding: 15px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
	}
	.close-notification-login {
		cursor: pointer;
		float: right;
		font-size: 1.2em;
	}
</style>
