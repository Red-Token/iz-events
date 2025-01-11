<script lang="ts">
	import Popup from './Popup.svelte';
	import { NostrClient, type SignerData } from 'iz-nostrlib';
	import { setContext } from '@welshman/lib';
	import { getDefaultAppContext, getDefaultNetContext } from '@welshman/app';
	import { me } from '@src/stores/profile.svelte';

	let isPopupOpen = $state(false); // Track the popup visibility

	const client = NostrClient.getInstance();

	setContext({
		net: getDefaultNetContext(),
		app: getDefaultAppContext()
	});

	function openPopup() {
		isPopupOpen = true;
	}

	function closePopup() {
		isPopupOpen = false;
	}

	function logIn(data: SignerData) {
		client.logIn(data).then(() => {
			me.pubkey = client.publicKey !== undefined ? client.publicKey : '';
		});
	}

	function logOut() {
		NostrClient.getInstance().logOut();
		me.pubkey = client.publicKey !== undefined ? client.publicKey : '';
	}
</script>

{#if me.pubkey !== ''}
	<h1>Welcome to Svelte Popup Example, {me.profile?.name}!</h1>
	<button class="auth-button" onclick={logOut}>LogOut</button>
{:else}
	<button class="auth-button" onclick={openPopup}>
		<svg width="20" height="16" viewBox="0 0 24 24">
			<path
				d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.2c-3 0-9 1.5-9 4.5V21h18v-2.3c0-3-6-4.5-9-4.5z"
			/>
		</svg>LogIn</button
	>
{/if}

<!-- Pass props to control visibility and close action -->
<Popup isOpen={isPopupOpen} {closePopup} {logIn} />

<style>
	.auth-button {
		padding: 8px 12px;
		padding-right: 16px;
		font-size: 16px;
		display: flex;
		transition: background-color 0.3s;
		cursor: pointer;
		margin-right: 10px;
	}
	
	.auth-button svg {
      margin-right: 2px;
      fill: var(--button-text-color);
      transition: transform 0.3s, fill 0.3s;
    }
	.auth-button:hover svg {
      transform: scale(1.2);
      fill: var(--shadow-color--link);
    }
	.auth-button:hover {
		box-shadow: 0 0 10px var(--glow-color);
	}
</style>
