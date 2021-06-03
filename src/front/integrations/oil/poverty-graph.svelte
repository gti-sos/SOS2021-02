<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let povertyData = [];
    let peopleRisk = [];
    let peopleLine = [];
    let homePoverty = [];
    let percentagePoverty = [];
    let ejeX = [];
    var mapa = new Map();
    var URL = " https://endpoint-poverty-risks.herokuapp.com/api/v1/" // Si no carga la página esque hay que hacer un loadInitialData en el enlace de la API.


    function filtraElementos(value, key, map) {
        if(value){
            ejeX.push(key);
            peopleRisk.push(value[0]);
            peopleLine.push(value[1]);
            homePoverty.push(value[2]);
            percentagePoverty.push(value[3]);
        }
    }
    
    async function loadGraph(){  

        const poverty = await fetch(URL);
        if(poverty.ok){
            povertyData = await poverty.json();
            console.log(`We have received ${povertyData.length} data points: `);
            console.log(JSON.stringify(povertyData,null,2));
            povertyData.forEach(data => {
                if(mapa.has(data.country + "-" + data.year)){
                    let aux = mapa.get(data.country + "-" + data.year);
                    aux.push(data["people_in_risk_of_poverty"]);
                    aux.push(data["people_poverty_line"]);
                    aux.push(data["home_poverty_line"]);
                    aux.push(data["percentage_risk_of_poverty"]);
                    mapa.set(data.country + "-" + data.year, aux);
                }else{
                    
                    console.log(data["people_in_risk_of_poverty"]);
                    let aux = [];
                    aux.push(data["people_in_risk_of_poverty"]);
                    aux.push(data["people_poverty_line"]);
                    aux.push(data["home_poverty_line"]);
                    aux.push(data["percentage_risk_of_poverty"]);
                    console.log(aux);
                    mapa.set(data.country + "-" + data.year, aux);
                }
            });
        }else{
            console.log("Error loading poverty");
        }
        
        

        console.log(mapa);

        mapa.forEach(filtraElementos);

        Highcharts.chart('container', {
            chart:{
                type: 'area'
            },
            title: {
                text: 'Gráfico General'
            },
            yAxis: {
                labels: {
                    format: '{value}%'
            },
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
                name: 'people_in_risk_of_poverty',
                data: peopleRisk
            },
            {
                name: ' people_poverty_line',
                data: peopleLine
            },
            {
                name: 'home_poverty_line',
                data: homePoverty
            },
            {
                name: 'percentage_risk_of_poverty',
                data: percentagePoverty
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