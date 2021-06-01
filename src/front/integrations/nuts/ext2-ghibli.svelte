<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let egData = [];
    var URL = "https://ghibliapi.herokuapp.com/films/";

    async function loadGraph(){  

        const eg = await fetch(URL);
        if(eg.ok){
            egData = await eg.json();
            console.log(`We have received ${egData.length} data points: `);
            console.log(JSON.stringify(egData,null,2));
            egData.forEach(dat => {
                if(dat.title && dat.rt_score){
                    var nombre = dat.title;
                    var puntuacion = parseInt(dat.rt_score);
                    let auxi = [nombre,puntuacion];
                    egData.push(auxi);
                }
            });
        }else{
            console.log("Error loading cv");
        }
        console.log("cvData array: " + egData);


        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Puntuaciones de películas de Estudio Ghibli'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Puntuaciones (sobre 100)'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Puntuación: <b>{point.y:.1f} puntos</b>'
            },
            series: [{
                name: 'Puntuación',
                data: egData,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
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