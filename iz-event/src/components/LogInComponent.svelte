<script lang="ts">
	import Popup from './Popup.svelte';
	import { NostrClient, type SignerData } from 'iz-nostrlib';
	import { setContext } from '@welshman/lib';
	import { getDefaultAppContext, getDefaultNetContext } from '@welshman/app';

	let isPopupOpen = $state(false); // Track the popup visibility
	let isLoggedIn = $state(NostrClient.getInstance().isLoggedIn())

	setContext({
		net: getDefaultNetContext(),
		app: getDefaultAppContext()
	})

	function openPopup() {
		isPopupOpen = true;
	}

	function closePopup() {
		isPopupOpen = false;
	}

	function logIn(data: SignerData) {
		NostrClient.getInstance().logIn(data)
		isLoggedIn = NostrClient.getInstance().isLoggedIn()
	}

	function logOut() {
		NostrClient.getInstance().logOut();
		isLoggedIn = NostrClient.getInstance().isLoggedIn()
	}

</script>

{#if isLoggedIn}
	<h1>Welcome to Svelte Popup Example!</h1>
	<button onclick={logOut}>LogOut</button>
{:else }
	<button onclick={openPopup}>LogIn</button>
{/if}


<!-- Pass props to control visibility and close action -->
<Popup isOpen={isPopupOpen} closePopup={closePopup} logIn={logIn} />
