<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
      let dato = [];
      let countryDat = [];
      let health_exp = [];
      let doctor_habitant = [];
      let hospital_b = [];
      const BASE_API_PATH = "/api/v2";
      
      
      async function loadData() {
          console.log("Fetching data...");
          const res = await fetch("https://sanity-integration.herokuapp.com/sanity-stats");
          dato = await res.json();
          if (res.ok) {
              dato.forEach(dat => {
              countryDat.push(dat.country+"/"+dat.year);
              health_exp.push(dat["health_expenditure_in_percentage"]);
              doctor_habitant.push(dat["doctor_per_1000_habitant"]);
              hospital_b.push(dat["hospital_bed"]);   
            });
          }
          
          console.log("Sanity date: " + dato);
          
          Highcharts.chart("container", {
            chart: {
              type: 'column',
              options3d: {
                  enabled: true,
                  alpha: 15,
                  beta: 20,
                  depth: 50,
                  viewDistance: 60
              }
          },
            title: {
              text: "Nº camas en hospitales",
            },
            yAxis: {
              title: {
                text: "",
              },
            },
            xAxis: {
              title: {
                text: "",
              },
              categories: countryDat
            },
            legend: {
              layout: "vertical",
              align: "right",
              verticalAlign: "middle",
            },
            annotations: [
              {
                labels: [
                  {
                    point: "date",
                    text: "",
                  },
                  {
                    point: "min",
                    text: "Min",
                    backgroundColor: "gray",
                  },
                ],
              },
            ],
           plotOtions: {
              series: {
                  depth: 30,
                  colorByPoint: false
              }
          },
            series: [
              {
                name: "Nº de camas",
                data: hospital_b,
                colorByPoint: true
              },
              
            ],
            responsive: {
              rules: [
                {
                  condition: {
                    maxWidth: 3000,
                  },
                  chartOptions: {
                    legend: {
                      layout: "horizontal",
                      align: "center",
                      verticalAlign: "bottom",
                    },
                  },
                },
              ],
            },
          });
        }
      </script>
      <svelte:head>
        <script src="https://code.highcharts.com/highcharts.js" on:load={loadData}></script>
        <script src="https://code.highcharts.com/highcharts-3d.js"></script>
      <script src="https://code.highcharts.com/modules/cylinder.js"></script>
      <script src="https://code.highcharts.com/modules/exporting.js"></script>
      <script src="https://code.highcharts.com/modules/export-data.js"></script>
      <script src="https://code.highcharts.com/modules/accessibility.js"></script>
      </svelte:head>
      
      <main>
          <div>
              <h1 style="text-align: center;">Uso <strong>API GRUPO SOS(Sanity Stats) </strong></h1>
            </div>
          
          <div>
              <figure class="highcharts-figure">
                <div id="container" />
                
              </figure>
              <Button outline color="secondary" on:click="{pop}">Atrás</Button> 
            </div>
      </main>
      
      <style>
        .highcharts-figure {
            min-width: 320px; 
            max-width: 1400px;
            margin: 1em auto;
        }
      </style>