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

        const coins = await fetch("/proxyCoin");
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
                type: 'lollipop'
            },
            legend: {
        enabled: false
        },
        title: {
            text: 'API externa1 coins'
        },
        tooltip: {
             shared: true
        },
        xAxis: {
            type: 'nombre',
            categories: coinsData
        },
        yAxis: {
            title: {
             text: 'Precios'
             }
        },
          series: [
            {
              name: "Precios",
              data: price,
              colorByPoint: true
            },
          ],
        });
      }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"on:load={loadGraph}></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/dumbbell.js"></script>
    <script src="https://code.highcharts.com/modules/lollipop.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
        </svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        
    </figure> 
    <Button outline color="secondary" on:click="{pop}">Atrás</Button> 
</main>