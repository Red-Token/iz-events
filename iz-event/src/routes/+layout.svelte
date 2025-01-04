<script lang="ts">
	import { page, navigating } from '$app/state';
	let { children } = $props();
	import '../static/app.css';
</script>

<main>

	<nav>
		<a href="/home" aria-current={page.url.pathname === '/home'}> home </a>
		<a href="/create" aria-current={page.url.pathname === '/create'}> create </a>
		<a href="/about" aria-current={page.url.pathname === '/about'}> about </a>
		<a href="/event" aria-current={page.url.pathname === '/event'}> event </a>
		
		{#if navigating.to}
		navigating to {navigating.to.url.pathname}
		{/if}
	</nav>
	
</main>
{@render children()}

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 100%;
		margin: 0 auto;
	}
	nav {
		width: 100%;
		font-size: 18px;
		text-align: center;
		margin-top: 2rem;
		text-align: center;
		padding: 1rem 0;
		margin-left: 0 rem;
	}
	nav a {
		display: inline-block;
		padding: 0 1rem;
		border-left: 1px solid var(--color-border);
	}

	nav a:first-of-type {
		border: 0;
	}
</style>
