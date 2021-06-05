<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let giveData = [];
    let ejeX= [];
    let users = [];
    var mapa = new Map();
    var URL = "https://www.gamerpower.com/api/giveaways";

    
    async function loadGraph(){  

        const give = await fetch("/proxyGive");
        if(give.ok){
            giveData = await give.json();
            
            console.log(`We have received ${giveData.length} data points: `);
            console.log(JSON.stringify(giveData,null,2));
            giveData.forEach( dat => {
                    ejeX.push(dat.title);
                    users.push(parseFloat(dat.users));
                    
                               
                
            });
        }else{
            console.log("Error loading give");
        }
        
         Highcharts.chart('container', {
            chart:{
                type: 'bar'
            },
            title: {
                text: 'Gráfico API Externa2'
            },
            yAxis: {
                title: {
                    text: 'Usuarios'
                }
            },
            xAxis: {
                title: {
                    text: 'Nombres'
                },
                categories: ejeX
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            series: [{
                name: 'users',
                data: users
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