<script>
	import OilTable from './OilTable.svelte'
	import WineTable from './WineTable.svelte';
	import {
    Button,
    
  } from "sveltestrap";

  import Router from 'svelte-spa-router';

  const routes = {
		
		"/oil-production-stats": OilTable,
		"/wine-production-stats": WineTable};
	
</script>

<main>
	<h1>SOS2021-02</h1>
	<a href="old_index_static.html"> Ver la información de los componentes del grupo</a>

		<p>API de oilstats</p>
		<a href="/#/oil-production-stats"
            ><Button color="primary">Datos aceite</Button></a
          >
		  <a href="https://documenter.getpostman.com/view/10673756/TzJoDfUb"
            ><Button color="primary">Documentación de Postman</Button></a
          >

		<p>API de winestats</p>
		<a href="/#/wine-production-stats"
            ><Button color="primary">Datos vino</Button></a
          >
		  <a href="https://documenter.getpostman.com/view/14969253/TzJoDfre"
		  ><Button color="primary">Documentación de Postman</Button></a
		>

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