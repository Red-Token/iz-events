<script lang="ts">
	import { type SignerData, SignerType } from 'iz-nostrlib'
	import { getNip07 } from '@welshman/signer'
	import QRCode from '@src/components/QRCode.svelte'

	let { isOpen = false, closePopup, logIn = (data: SignerData) => {} }: {isOpen:boolean, closePopup: Function, logIn:Function} = $props()

	async function zil() {
		console.log('zil')

		// const aliceNSec = 'nsec18c4t7czha7g7p9cm05ve4gqx9cmp9w2x6c06y6l4m52jrry9xp7sl2su9x'
		// const aliceSignerData = { type: SignerType.NIP01, nsec: aliceNSec }

		const pubkey = await getNip07()?.getPublicKey()
		console.log('pubkey', pubkey)

		const aliceSignerData = { type: SignerType.NIP07, pubkey: pubkey }

		// {method: "nip07", pubkey}

		console.log(aliceSignerData)
		logIn(aliceSignerData)
		closePopup()
	}
</script>

{#if isOpen}
	<div class="popup-overlay" onclick={() => closePopup()}>
		<div class="popup" onclick={event => event.stopPropagation()}>
			<h2>This is a Popup!</h2>
			<p>Click outside to close or press the button.</p>

			<div class="qr-container">
				<QRCode code="HELLO WAR!"></QRCode>
			</div>
			<button onclick={() => zil()}>AS</button>
			<button onclick={() => closePopup()}>Close</button>
		</div>
	</div>
{/if}

<style>
	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--overlay-background);
		border: 1px solid var(--border-color);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.popup {
		background: var(--bg-2);
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 4px 20px var(--shadow-color);
		align-items: center;
		gap: 8px;
	}

	.qr-container {
		margin-top: 16px;
		margin-bottom: 16px;
	}
</style>
