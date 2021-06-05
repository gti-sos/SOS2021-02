<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let childrenData = [];
    let children_out_school_male = [];
    let children_out_school_female= [];
    let children_out_school_total= [];
    let ejeX = [];
    var mapa = new Map();
    var URL = "http://sos2021-24.herokuapp.com/api/v2/children-out-school";

    function filtraElementos(value, key, map) {
        if(value){
            ejeX.push(key);
            children_out_school_male.push(value[0]);
            children_out_school_female.push(value[1]);
            children_out_school_total.push(value[2]);
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
                    aux.push(data["children_out_school_male"]);
                    aux.push(data["children_out_school_female"]);
                    aux.push(data["children_out_school_total"]);
                    mapa.set(data.country + "-" + data.year, aux);
                }else{
                    console.log(data["percent_children_out_school_m"]);
                    let aux = [];
                    aux.push(data["children_out_school_male"]);
                    aux.push(data["children_out_school_female"]);
                    aux.push(data["children_out_school_total"]);
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
                type: 'column'
            },
            title: {
                text: 'Gráfico GRUPO 24 - Children-out-school'
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
                name: 'children_out_school_male',
                data: children_out_school_male
            },
            {
                name: 'children_out_school_female',
                data: children_out_school_female
            },{
                name: 'children_out_school_total',
                data: children_out_school_total
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