<script>
	import OilTable from './OilTable.svelte'
	const routes = {
		
		"/oil-production-stats": OilTable};
	import {
    Button,
    
  } from "sveltestrap";
import WineTable from './WineTable.svelte';


	
	
</script>

<main>
	<h1>Hello!</h1>
	<a href="old_index_static.html"> View the components info</a>
	<p>API de oilstats</p>
	<a href="/oil-production-stats">Ver datos de oiltable</a>
	<WineTable/>
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