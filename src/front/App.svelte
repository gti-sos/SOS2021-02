<script>
	import Router from 'svelte-spa-router';
	import Landing from './Landing.svelte';
	import OilTable from './oilAPI/OilTable.svelte';
	import OilEdit from './oilAPI/OilTableEdit.svelte';
	import NutsTable from './nutsAPI/NutsTable.svelte';
	import NutsEdit from './nutsAPI/NutsTableEdit.svelte';
	import WineTable from './wineAPI/WineTable.svelte';
	import WineEdit from './wineAPI/WineTableEdit.svelte';
	import NotFound from './NotFound.svelte';
	import Info from './Info.svelte';


	const routes = {
		"/": Landing,
		"/oil-production-stats": OilTable,
		"/oil-production-stats/:country/:year": OilEdit,
		"/nuts-production-stats": NutsTable,
		"/nuts-production-stats/:country/:year": NutsEdit,
		"/wine-production-stats": WineTable,
		"/wine-production-stats/:country/:year": WineEdit,
		"/info": Info,
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