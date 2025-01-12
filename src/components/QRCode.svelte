<script lang="ts">
	import QRCode from 'qrcode'
	import { onMount } from 'svelte'

	let { code } = $props()

	let canvas: HTMLCanvasElement
	let wrapper: HTMLElement
	let scale = $state(1)
	let height: number | undefined = $state()

	onMount(() => {
		QRCode.toCanvas(canvas, code, { width: 200 }, error => {
			if (error) console.error(error)
			const wrapperRect = wrapper.getBoundingClientRect()
			const canvasRect = canvas.getBoundingClientRect()
			scale = Math.min(wrapperRect.width / canvasRect.width, wrapperRect.height / canvasRect.height)
			height = canvasRect.height * scale
		})
	})
</script>

<div
	class="qr-conteiner"
	bind:this={wrapper}
	style={`height: ${height}px; display: flex; justify-content: center; align-items: center;`}
>
	<canvas bind:this={canvas} style={`transform: scale(${scale}); transform-origin: center;`}> WORMROOM! </canvas>
</div>

<style>
</style>
