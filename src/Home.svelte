<script>
    import OilTable from './OilTable.svelte'
    import App from './App.svelte';
    import WineTable from './WineTable.svelte';
    import NutsTable from './NutsTable.svelte'
    import Router from 'svelte-spa-router';
    const routes = {
		"/":App,
		"/oil-production-stats": OilTable,
    "/nuts-production-stats": NutsTable,
		"/wine-production-stats": WineTable};
        
	
</script>


<main>
	<Router {routes}> </Router>
</main>