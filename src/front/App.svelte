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
	import NutsGraph from './nutsAPI/NutsGraph.svelte';
	//import NutsGraphc3 from './nutsAPI/NutsGraphC3.svelte';
	import OilGraph from './oilAPI/OilGraph.svelte';
	import WineGraph from './wineAPI/WineGraph.svelte';
	import GeneralGraph from './GeneralGraph.svelte';
	import Integrations from './integrations.svelte';
	import ChildrenEmploymentGraph from './integrations/nuts/children-employment-graph.svelte';
	import ObesityGraph from './integrations/oil/obesity-graph.svelte';
	import ChildrenSchoolGraph from './integrations/wine/children-school-graph.svelte';
	import OilChart from './integrations/oil/oilChart.svelte';


	const routes = {
		"/": Landing,
		"/oil-production-stats": OilTable,
		"/oil-production-stats/:country/:year": OilEdit,
		"/nuts-production-stats": NutsTable,
		"/nuts-production-stats/:country/:year": NutsEdit,
		"/wine-production-stats": WineTable,
		"/wine-production-stats/:country/:year": WineEdit,
		"/info": Info,
		"/nuts-graph": NutsGraph,
		//"/nuts-graphc3": NutsGraphc3,
		"/oil-graph": OilGraph,
		"/wine-graph": WineGraph,
		"/general-graph": GeneralGraph,
		"/integrations": Integrations,
		"/children-employment-graph": ChildrenEmploymentGraph,
		"/obesity-graph": ObesityGraph,
		"/oil-chart": OilChart,
		"/children-school-graph": ChildrenSchoolGraph,
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