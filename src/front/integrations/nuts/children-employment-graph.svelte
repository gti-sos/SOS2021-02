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
    var URL = "/proxyChi";

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

        var trace1 = {
        x: ejeX,
        y: percent_children_employment_m,
        name: 'Niños',
        type: 'bar'
        };

        var trace2 = {
        x: ejeX,
        y: percent_children_employment_f,
        name: 'Niñas',
        type: 'bar'
        };

        var trace3 = {
        x: ejeX,
        y: percent_children_employment_t,
        name: 'Total',
        type: 'bar'
        };

        var data = [trace1, trace2, trace3];

        var layout = {barmode: 'group'};

        Plotly.newPlot('graph', data, layout);
  }
</script>

<svelte:head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <p>Porcentaje de menores de edad trabajando en distintos países</p>
    <div id="graph"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button> 
</main>