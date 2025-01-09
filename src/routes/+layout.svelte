<script lang="ts">
	import { page, navigating } from '$app/state';
	let { children } = $props();
	import '../static/app.css';
	import LogInComponent from '../components/LogInComponent.svelte';
</script>

<main>
	<nav>
		<a href="/" aria-current={page.url.pathname === '/'}> home </a>
		<a href="/event/create" aria-current={page.url.pathname === '/create'}> create </a>
		<a href="/event/about" aria-current={page.url.pathname === '/about'}> about </a>
		<a href="/event/events" aria-current={page.url.pathname === '/events'}> event </a>

		<LogInComponent></LogInComponent>
	</nav>
</main>

{@render children()}

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 1em;
		max-width: 100%;
		margin: 0 auto;
	}


	nav {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		font-size: 18px;
		text-align: center;
		margin-top: 2rem;
		padding: 1rem 0;
	}

	nav a {
		display: inline-block;
		padding: 0 1rem;
		border-left: 1px solid var(--color-border);
		text-align: center;
	}

	nav a:first-of-type {
		border: 0;
	}
</style>
