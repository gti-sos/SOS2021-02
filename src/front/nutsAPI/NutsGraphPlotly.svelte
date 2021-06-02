<script>
    import {
        pop
    } from "svelte-spa-router";
    import {
        onMount
    } from "svelte";
    import Button from "sveltestrap/src/Button.svelte";
 
    //let generalData = [];   
    let nutsData = [];
    let ejeX = [];
    let almond = [];
    let walnut = [];
    let pistachio = [];
    
    async function loadGraph(){  
        const nuts = await fetch("/api/v2/nuts-production-stats");
        if(nuts.ok){
            nutsData = await nuts.json();
            console.log(`We have received ${nutsData.length} data points: `);
            console.log(JSON.stringify(nutsData,null,2));
            nutsData.forEach(data => {
                ejeX.push(data.country + "-" + data.year);
                almond.push(data["almond"]);
                walnut.push(data["walnut"]);
                pistachio.push(data["pistachio"]);
            });
        }else{
            console.log("Error loading nuts");
        }

        var data = [
        {
            values: almond,
            labels: ejeX,
            type: 'pie'
        }
        ];

        Plotly.newPlot('graph', data);
    }
</script>

<svelte:head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <div id="graph"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>  
    <p>En esta gráfica se compara la producción de almendra en los países que más rendimiento sacan de ello</p>
</main>