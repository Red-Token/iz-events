<script lang="ts">
	import { page, navigating } from '$app/state'
	let { children } = $props()
	import '@src/static/app.css'
	import LogInComponent from '@src/components/LogInComponent.svelte'
</script>

<main>
	<nav>
		<a href="/" aria-current={page.url.pathname === '/'}> Home </a>
		<a href="/event/create" aria-current={page.url.pathname === '/create'}> Create </a>
		<a href="/event/events" aria-current={page.url.pathname === '/events'}> Event </a>
		<a href="/event/about" aria-current={page.url.pathname === '/about'}> About </a>

		<LogInComponent />
	</nav>
</main>

{@render children()}

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 0;
		max-width: 100%;
		margin: 0;
	}

	nav a:first-of-type {
		border: 0;
	}
</style>
