<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
      let dato = [];
      let countryDat = [];
      let health_exp = [];
      let doctor_habitant = [];
      let hospital_b = [];
      const BASE_API_PATH = "/api/v2";
      
      
      async function loadGraph() {
          console.log("Fetching data...");
          const res = await fetch("https://sanity-integration.herokuapp.com/sanity-stats");
          dato = await res.json();
          if (res.ok) {
              dato.forEach(dat => {
              var nombre = dat.country + "/" + dat.year;
              var datos = dat.hospital_bed;
              let lista = [];
              lista.push(nombre);
              lista.push(parseInt(datos));
              countryDat.push(lista);
              console.log(countryDat);
            });
          }
          
          console.log("Sanity date: " + dato);
          
          Highcharts.chart('container', {
    chart: {
        type: 'pyramid3d',
        options3d: {
            enabled: true,
            alpha: 10,
            depth: 50,
            viewDistance: 50
        }
    },
    title: {
        text: 'Grupo SOS Sanity-Stats'
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                allowOverlap: true,
                x: 10,
                y: -5
            },
            width: '60%',
            height: '80%',
            center: ['50%', '45%']
        }
    },
    series: [{
        name: 'Camas totales',
        data: countryDat
    }]
});
        }
      </script>
      <svelte:head>
        <script src="https://code.highcharts.com/highcharts.js" on:load="{loadGraph}"></script>
        <script src="https://code.highcharts.com/highcharts-3d.js"></script>
        <script src="https://code.highcharts.com/modules/cylinder.js"></script>
        <script src="https://code.highcharts.com/modules/funnel3d.js"></script>
        <script src="https://code.highcharts.com/modules/pyramid3d.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/modules/export-data.js"></script>
        <script src="https://code.highcharts.com/modules/accessibility.js"></script>
      </svelte:head>
      
      <main>
          <div>
            <figure class="highcharts-figure">
              <div id="container"></div>
            
          </figure>
              <Button outline color="secondary" on:click="{pop}">Atrás</Button> 
            </div>
      </main>
      
      <style>
        .highcharts-figure {
            min-width: 320px; 
            max-width: 1000px;
            margin: 1em auto;
        }
      </style>