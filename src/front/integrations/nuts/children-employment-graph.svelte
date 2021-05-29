<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let childrenData = [];
    let percent_children_employment_m = [];
    let percent_children_employment_f = [];
    let percent_children_employment_t = [];
    let ejeX = [];
    var mapa = new Map();
    var URL = "https://sos2021-24.herokuapp.com/api/v2/children-employment";

    function filtraElementos(value, key, map) {
        if(value){
            ejeX.push(key);
            percent_children_employment_m.push(value[0]);
            percent_children_employment_f.push(value[1]);
            percent_children_employment_t.push(value[2]);
        }
    }
    
    async function loadGraph(){  

        const children = await fetch(URL);
        if(children.ok){
            childrenData = await children.json();
            console.log(`We have received ${childrenData.length} data points: `);
            console.log(JSON.stringify(childrenData,null,2));
            childrenData.forEach(data => {
                if(mapa.has(data.country + "-" + data.year)){
                    let aux = mapa.get(data.country + "-" + data.year);
                    aux.push(data["percent_children_employment_m"]);
                    aux.push(data["percent_children_employment_f"]);
                    aux.push(data["percent_children_employment_t"]);
                    mapa.set(data.country + "-" + data.year, aux);
                }else{
                    console.log(data["percent_children_employment_m"]);
                    let aux = [];
                    aux.push(data["percent_children_employment_m"]);
                    aux.push(data["percent_children_employment_f"]);
                    aux.push(data["percent_children_employment_t"]);
                    console.log(aux);
                    mapa.set(data.country + "-" + data.year, aux);
                }
            });
        }else{
            console.log("Error loading children");
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
                name: 'percent_children_employment_m',
                data: percent_children_employment_m
            },
            {
                name: 'percent_children_employment_f',
                data: percent_children_employment_f
            },{
                name: 'percent_children_employment_t',
                data: percent_children_employment_t
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