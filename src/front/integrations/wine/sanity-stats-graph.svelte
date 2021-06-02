<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let sanityData = [];
    let health_expenditure_in_percentage = [];
    let doctor_per_1000_habitant= [];
    let hospital_bed= [];
    let ejeX = [];
    var mapa = new Map();
    var URL = "https://sanity-integration.herokuapp.com/sanity-stats";

    function filtraElementos(value, key, map) {
        if(value){
            ejeX.push(key);
            health_expenditure_in_percentage.push(value[0]);
            doctor_per_1000_habitant.push(value[1]);
            hospital_bed.push(value[2]);
        }
    }
    
    async function loadGraph(){  

        const sanity = await fetch(URL);
        if(sanity.ok){
            sanityData = await sanity.json();
            console.log(`We have received ${sanityData.length} data points: `);
            console.log(JSON.stringify(sanityData,null,2));
            sanityData.forEach(data => {
                if(mapa.has(data.country + "-" + data.year)){
                    let aux = mapa.get(data.country + "-" + data.year);
                    aux.push(data["health_expenditure_in_percentage"]);
                    aux.push(data["doctor_per_1000_habitant"]);
                    aux.push(data["hospital_bed"]);
                    mapa.set(data.country + "-" + data.year, aux);
                }else{
                    console.log(data["health_expenditure_in_percentage"]);
                    let aux = [];
                    aux.push(data["health_expenditure_in_percentage"]);
                    aux.push(data["doctor_per_1000_habitant"]);
                    aux.push(data["hospital_bed"]);
                    console.log(aux);
                    mapa.set(data.country + "-" + data.year, aux);
                }
            });
        }else{
            console.log("Error loading sanity");
        }
        
        console.log(mapa);

        mapa.forEach(filtraElementos);

        Highcharts.chart('container', {
            chart:{
                type: 'column'
            },
            title: {
                text: 'Gráfico General'
            },
            yAxis: {
                title: {
                    text: 'Cantidad'
                }
            },
            xAxis: {
                title: {
                    text: 'Año'
                },
                categories: ejeX
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            series: [{
                name: 'health_expenditure_in_percentage',
                data: health_expenditure_in_percentage
            },
            {
                name: 'doctor_per_1000_habitant',
                data: doctor_per_1000_habitant
            },{
                name: 'hospital_bed',
                data: hospital_bed
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
  }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        
    </figure> 
    <Button outline color="secondary" on:click="{pop}">Atrás</Button> 
</main>