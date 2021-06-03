<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let coinsData = [];
    let ejeX= [];
    let price = [];
    var mapa = new Map();
    var URL = "https://api.coinstats.app/public/v1/coins?";

    
    async function loadGraph(){  

        const coins = await fetch(URL);
        if(coins.ok){
            coinsData = await coins.json();
            
            console.log(`We have received ${coinsData.length} data points: `);
            console.log(JSON.stringify(coinsData,null,2));
            coinsData.coins.forEach( dat => {
                    ejeX.push(dat.name);
                    price.push(parseFloat(dat.price));
                    
                               
                
            });
        }else{
            console.log("Error loading coins");
        }
        
         Highcharts.chart('container', {
            chart:{
                type: 'bar'
            },
            title: {
                text: 'Gráfico General'
            },
            yAxis: {
                title: {
                    text: 'Precio'
                }
            },
            xAxis: {
                title: {
                    text: 'Nombre'
                },
                categories: ejeX
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            series: [{
                name: 'price',
                data: price
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