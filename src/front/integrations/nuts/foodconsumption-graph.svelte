<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let foodData = [];
    let caloryPer = [];
    let gramPer = [];
    let dailyGram = [];
    let dailyCal = [];
    let ejeX = [];
    var mapa = new Map();
    var URL = "https://sos2021-10.herokuapp.com/api/integration/foodconsumption-stats";

    function filtraElementos(value, key, map) {
        if(value){
            ejeX.push(key);
            caloryPer.push(value[0]);
            gramPer.push(value[1]);
            dailyGram.push(value[2]);
            dailyCal.push(value[3]);
        }
    }
    
    async function loadGraph(){  

        const food = await fetch(URL);
        if(food.ok){
            foodData = await food.json();
            console.log(`We have received ${foodData.length} data points: `);
            console.log(JSON.stringify(foodData,null,2));
            foodData.forEach(data => {
                if(mapa.has(data.country + "-" + data.year)){
                    let aux = mapa.get(data.country + "-" + data.year);
                    aux.push(data["caloryperperson"]);
                    aux.push(data["gramperperson"]);
                    aux.push(data["dailygram"]);
                    aux.push(data["dailycalory"]);
                    mapa.set(data.country + "-" + data.year, aux);
                }else{
                    console.log(data["caloryperperson"]);
                    let aux = [];
                    aux.push(data["caloryperperson"]);
                    aux.push(data["gramperperson"]);
                    aux.push(data["dailygram"]);
                    aux.push(data["dailycalory"]);
                    console.log(aux);
                    mapa.set(data.country + "-" + data.year, aux);
                }
            });
        }else{
            console.log("Error loading food");
        }
        
        console.log(mapa);

        mapa.forEach(filtraElementos);

        Highcharts.chart('container', {
            chart:{
                type: 'bar'
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
                name: 'caloryperperson',
                data: caloryPer
            },
            {
                name: 'gramperperson',
                data: gramPer
            },{
                name: 'dailygram',
                data: dailyGram
            },
            {
                name: 'dailycalory',
                data: dailyCal
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