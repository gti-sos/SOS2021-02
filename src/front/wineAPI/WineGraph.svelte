<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
 
    
    let wineData = [];
    let ejeX = [];
    let production = [];
    let importe = [];
    let exporte = [];
    
    async function loadGraph(){  
        const wine = await fetch("/api/v2/wine-production-stats");
        if(wine.ok){
            wineData = await wine.json();
            console.log(`We have received ${wineData.length} data points: `);
            console.log(JSON.stringify(wineData,null,2));
            wineData.forEach(data => {
                ejeX.push(data.country + "-" + data.year);
                production.push(data["production"]);
                importe.push(data["import"]);
                exporte.push(data["export"]);
            });
        }else{
            console.log("Error loading wine");
        }

        Highcharts.chart('container', {
            chart: {
            type: 'area'
            },
            title: {
                text: 'Gráfico de datos de Vino'
            },
            yAxis: {
                labels: {
            format: '{value}%'
            },
            title: {
            enabled: true
              }
            },
            xAxis: {
                title: {
                    text: 'País-Año'
                },
                categories: ejeX
            },
            tickmarkPlacement: 'on',
            title: {
               enabled: false
            },
            tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
            split: true
            },
            plotOptions: {
            area: {
            stacking: 'percent',
            lineColor: '#ffffff',
            lineWidth: 1,
            marker: {
            lineWidth: 1,
            lineColor: '#ffffff'
         },
      accessibility: {
        pointDescriptionFormatter: function (point) {
          function round(x) {
            return Math.round(x * 100) / 100;
          }
          return (point.index + 1) + ', ' + point.category + ', ' +
            point.y + ' millions, ' + round(point.percentage) + '%, ' +
            point.series.name;
        }
      }
    }
  },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            series: [{
                name: 'Production',
                data: production
            },
            {
                name: 'Importe',
                data: importe
            },
            {
                name: 'Exporte',
                data: exporte
            }],
           
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