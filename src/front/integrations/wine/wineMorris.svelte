

<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    async function loadGraph(){
     
        let datos = [];
        let cos_total = [];
        var dic = {};
        const resData = await fetch("/api/v2/wine-production-stats");
        const json = await resData.json();
        json.forEach( (v) => {
             if(v.year in dic){
              dic[v.year] += Math.round(v.production)
            }
            else{
              dic[v.year]= v.production;
            }  
        });
        console.log(dic);
        for(var v in dic){
             datos.push({
                label: v,
                value: dic[v]
            })
        }
        console.log(datos);
        new Morris.Donut({
            element: 'AwesomeChart',
            data: datos,
            colors: ["#3c8dbc", "red", "#A9DFBF", "yellow", "purple", "black", "#138D75", "silver"] 
        });
    }
    </script>
    
    <svelte:head>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js" on:load="{loadGraph}"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    </svelte:head>
    <main>
    <h2 style="text-align: center">Produccion de vino por año (2009 - 2011)</h2>
    
    <div id="AwesomeChart" style="height: 250px;"></div>
    <p></p>
    <p></p>

    </main>