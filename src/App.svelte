<script>
	import OilTable from './OilTable.svelte'
	
	import {
    Button,
    
  } from "sveltestrap";
import WineTable from './WineTable.svelte';

import Router from 'svelte-spa-router';
const routes = {
		
		"/oil-production-stats": OilTable,
		"/wine-production-stats": WineTable};
	
</script>

<main>
	<h1>Hello!</h1>
	<a href="old_index_static.html"> View the components info</a>
	<p>API de oilstats</p>
	<a href="/#/oil-production-stats">Ver datos de oiltable</a>


	
	
	
	<p>API de winestats</p>
	<a href="/wine-production-stats.html">Ver datos de winetable</a>
	<Router {routes}> </Router>
</main>


<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	p {
		color: #0c0c0c;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 500;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>