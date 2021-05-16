<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let nutsData = [];
    let oilData = [];
    let wineData = [];
    let nutsGeneral = [];
    let oilGeneral = [];
    let wineGeneral = [];
    let ejeX = [];
    
    async function loadGraph(){  

        const nuts = await fetch("/api/v2/nuts-production-stats");
        if(nuts.ok){
            nutsData = await nuts.json();
            console.log(`We have received ${nutsData.length} data points: `);
            console.log(JSON.stringify(nutsData,null,2));
            nutsData.forEach(data => {
                ejeX.push(data.country + "-" + data.year);
                nutsGeneral.push(data["almond"]);
                //walnut.push(data["walnut"]);
                //pistachio.push(data["pistachio"]);
            });
        }else{
            console.log("Error loading nuts");
        }
        
        const oil = await fetch("/api/v2/oil-production-stats");
        if(oil.ok){
            oilData = await oil.json();
            console.log(`We have received ${oilData.length} data points: `);
            console.log(JSON.stringify(oilData,null,2));
            oilData.forEach(data => {
                ejeX.push(data.country + "-" + data.year);
                oilGeneral.push(data["production"]);
                //walnut.push(data["walnut"]);
                //pistachio.push(data["pistachio"]);
            });
        }else{
            console.log("Error loading oil");
        }
        
        const wine = await fetch("/api/v2/wine-production-stats");
        if(wine.ok){
            wineData = await wine.json();
            console.log(`We have received ${wineData.length} data points: `);
            console.log(JSON.stringify(wineData,null,2));
            wineData.forEach(data => {
                ejeX.push(data.country + "-" + data.year);
                wineGeneral.push(data["production"]);
                //walnut.push(data["walnut"]);
                //pistachio.push(data["pistachio"]);
            });
        }else{
            console.log("Error loading wine");
        }

        Highcharts.chart('container', {
            title: {
                text: 'Gráfico General'
            },
            yAxis: {
                title: {
                    text: 'Quantity'
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
            /*plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },*/
            series: [{
                name: 'Almond',
                data: nutsGeneral
            },
            {
                name: ' OilProduction',
                data: oilGeneral
            },
            {
                name: 'WineProduction',
                data: wineGeneral
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