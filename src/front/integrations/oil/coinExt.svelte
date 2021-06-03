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
    let supply = [];
    let maxSupply = [];
    let market = [];
    var URL = "https://api.coincap.io/v2/assets";

    async function loadGraph(){  

        const coins = await fetch(URL);
        if(coins.ok){
            coinsData = await coins.json();
            console.log(`We have received ${coinsData.length} data points: `);
            console.log(JSON.stringify(coinsData,null,2));
            coinsData.data.forEach(data => {
                
                ejeX.push(data.id + "-"+ parseInt(data.rank));
                supply.push(parseFloat(data.supply));
                maxSupply.push(parseFloat(data.maxSupply));
                market.push(parseFloat(data.marketCapUsd));

            });
        }else{
            console.log("Error loading coins");
        }
        
        
        Highcharts.chart('container', {
            chart:{
                type: 'spline',
                
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
                className: 'highcharts-color-0',
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
            plotOptions: {
            column: {
            borderRadius: 5
                }
            },
            series: [{
                name: 'supply',
                data: supply
            },
            {
                name: ' maxSupply',
                data: maxSupply
            },
            {
                name: 'market',
                data: market
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
