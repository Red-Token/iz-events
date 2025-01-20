<script>
	import { goto } from '$app/navigation'

	const gotothe = () => {
		goto('/event/home')
	}
</script>

<div class="about">
	<button onclick={gotothe}> goto </button>
	<h1>This is an about page</h1>
</div>
