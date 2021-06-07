<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let childrenData = [];
    
    let ejeX = [];
    var mapa = new Map();
    var URL = "http://sos2021-24.herokuapp.com/api/v2/children-out-school";
    let cont = 0;
   
    
    async function loadGraph(){  

        const children = await fetch(URL);
        childrenData = await children.json();
        let children2 = [];
        childrenData.forEach((i)=>{
            ejeX.push(i.children_out_school_total);

        });    
        
        


        /*
 * Play with this code and it'll update in the panel opposite.
 *
 * Why not try some of the options above?
 */
    Highcharts.chart('container', {
    chart: {
        type: 'cylinder',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance: 25
        }
    },
    title: {
        text: 'Grupo SOS Children-school-graph'
    },
    plotOptions: {
        series: {
            depth: 25,
            colorByPoint: true
        }
    },
    series: [{
        data: ejeX,
        name: 'Alumno Totales',
        showInLegend: false
    }]
});
  }
</script>

<svelte:head>
    
    <script src="https://code.highcharts.com/highcharts.js"on:load="{loadGraph}"></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
    <script src="https://code.highcharts.com/modules/cylinder.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>

    </svelte:head>
    
<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        
    </figure>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button> 
</main>