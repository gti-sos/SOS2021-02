<script>
    import {
        onMount
    } from "svelte";
    
    let nutsData = [];
    let oilData = [];
    let wineData = [];
    let nutsGeneral = [];
    let oilGeneral = [];
    let wineGeneral = [];
    
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
        
        const oil = await fetch("/api/v2/oil-production-stats");
        if(oil.ok){
            oilData = await oil.json();
            console.log(`We have received ${oilData.length} data points: `);
            console.log(JSON.stringify(oilData,null,2));
        }else{
            console.log("Error loading oil");
        }
        
        const wine = await fetch("/api/v2/wine-production-stats");
        if(wine.ok){
            wineData = await wine.json();
            console.log(`We have received ${wineData.length} data points: `);
            console.log(JSON.stringify(wineData,null,2));
        }else{
            console.log("Error loading wine");
        }

        Highcharts.chart('container', {
            title: {
                text: 'My data'
            },
            yAxis: {
                title: {
                    text: 'Quantity'
                }
            },
            xAxis: {
                accessibility: {
                    rangeDescription: 'Year'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
            series: [{
                name: 'Installation',
                data: data
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
        <p class="highcharts-description">
            Basic line chart showing trends in a dataset. This chart includes the
            <code>series-label</code> module, which adds a label to each line for
            enhanced readability.
        </p>
    </figure>  
</main>