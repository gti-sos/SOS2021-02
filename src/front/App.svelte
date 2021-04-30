<script>
	import Router from 'svelte-spa-router';
	import Landing from './Landing.svelte';
	import OilTable from './oilAPI/OilTable.svelte';
	import NutsTable from './nutsAPI/NutsTable.svelte';
	import NutsEdit from './nutsAPI/NutsTableEdit.svelte';
	import WineTable from './wineAPI/WineTable.svelte';
	import NotFound from './NotFound.svelte';


	const routes = {
		"/": Landing,
		"/oil-production-stats": OilTable,
		"/nuts-production-stats": NutsTable,
		"/nuts-production-stats/:country/:year": NutsEdit,
		"/wine-production-stats": WineTable,
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>