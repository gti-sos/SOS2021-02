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
	import OilGraph from './oilAPI/OilGraph.svelte';
	import WineGraph from './wineAPI/WineGraph.svelte';
	import Analytics from './GeneralGraph.svelte';
	import Integrations from './integrations.svelte';
	import ChildrenEmploymentGraph from './integrations/nuts/children-employment-graph.svelte';
	import ObesityGraph from './integrations/oil/obesity-graph.svelte';
	import ChildrenSchoolGraph from './integrations/wine/children-school-graph.svelte';
	import OilChart from './integrations/oil/oilChart.svelte';
	import FoodconsumptionGraph from './integrations/nuts/foodconsumption-graph.svelte';
	import PovertyGraph from './integrations/oil/poverty-graph.svelte';
	import CoinGraph from './integrations/oil/coinExt.svelte';
	import CoinloreGraph from './integrations/oil/coinloreExt.svelte';
	import Ext1Balldontlie from './integrations/nuts/ext1-balldontlie.svelte';
	import Ext2Ghibli from './integrations/nuts/ext2-ghibli.svelte';
	import SanityStatsGraph from './integrations/wine/sanity-stats-graph.svelte';
	import NutsGraphPlotly from './nutsAPI/NutsGraphPlotly.svelte';
	import CoinstatsEXT1Graph from './integrations/wine/coinstatsEXT1.svelte';
	import WineEdite from './integrations/wine/wineMorris.svelte';
	import GivestatsEXT2Graph from './integrations/wine/giveEXT2.svelte';
	import About from './About.svelte';
	


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
		"/nuts-graph-plotly": NutsGraphPlotly,
		"/food-consumption-graph": FoodconsumptionGraph,
		"/childre-employment-graph": ChildrenEmploymentGraph,
		"/ext1-balldontlie": Ext1Balldontlie,
		"/ext2-aoe": Ext2Ghibli,
		"/oil-graph": OilGraph,
		"/wine-graph": WineGraph,
		"/analytics": Analytics,
		"/About": About,
		"/integrations": Integrations,
		"/children-employment-graph": ChildrenEmploymentGraph,
		"/obesity-graph": ObesityGraph,
		"/poverty-graph" : PovertyGraph,
		"/oil-chart": OilChart,
		"/coinExt": CoinGraph,
		"/coinloreExt": CoinloreGraph,
		"/children-school-graph": ChildrenSchoolGraph,
		"/sanity-stats-graph": SanityStatsGraph,
		"/coinstatsEXT1" : CoinstatsEXT1Graph,
		"/wineMorris" : WineEdite,
		"/giveEXT2" : GivestatsEXT2Graph,
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