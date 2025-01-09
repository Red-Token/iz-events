<script lang="ts">
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';

	export let code;

	let canvas: Element;
	let wrapper: Element;
	let scale = 0.1;
	let height: number;

	onMount(() => {
		QRCode.toCanvas(canvas, code);

		const wrapperRect = wrapper.getBoundingClientRect();
		const canvasRect = canvas.getBoundingClientRect();

		scale = wrapperRect.width / (canvasRect.width * 10);
		height = canvasRect.width * 10 * scale;
	});
</script>

<div bind:this={wrapper} style={`height: ${height}px`}>
	<canvas
		class="rounded-box"
		bind:this={canvas}
		style={`transform-origin: top left; transform: scale(${scale}, ${scale})`}>
		WORMROOM!
	</canvas>
</div>
