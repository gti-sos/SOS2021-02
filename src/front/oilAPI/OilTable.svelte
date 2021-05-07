<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    var BASE_OIL_API_PATH = "/api/v2/";
    let oilstats = [];
    let newCountry = {
        country: "",
        year: "",
        "production": "",
        "exportation": "",
        "distribution": "",
    }

    let errorMsg = "";
    let okMsg = "";

    let limit = 10;
	let offset = 0;
    let actual = 1;
    let numData = 5;

    async function loadData(){
        console.log("Loading oilstats...");
        const res = await fetch(BASE_OIL_API_PATH+"oil-production-stats/loadInitialData");

        if(res.ok){
            console.log("Ok.");
            getData();
            numData = 5;
            okMsg = "Datos cargados correctamente."
        }else{
            console.log("Error!");
        }
    }   

    async function getData(){
        console.log("Fetching oilstats...");
        var url = BASE_OIL_API_PATH+"oil-production-stats?limit="+limit+"&offset="+offset;//*limit);
        const res = await fetch(url);

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            oilstats = json;
            console.log(`We have received ${oilstats.length} countries.`);
        }else{
            console.log("Error!");
        }
    }   
    
    onMount(getData);

    async function insertCountry(){
        console.log("Inserting country "+ JSON.stringify(newCountry));
        newCountry.country = (newCountry.country);
        newCountry.year = parseInt(newCountry.year);
        newCountry["production"] = parseFloat(newCountry["production"]);
        newCountry["exportation"] = parseFloat(newCountry["exportation"]);
        newCountry["distribution"] = parseFloat(newCountry["distribution"]);

        const res = await fetch(BASE_OIL_API_PATH+"oil-production-stats",
                            {
                                method: "POST",
                                body: JSON.stringify(newCountry),
                                headers:{
                                    "Content-Type": "application/json"
                                }
                            }
                           ).then( (res) => {
                               if(res.ok) {
                                numData++;
                                console.log("NUMDATA IS:" + numData);
                            getData();
                            okMsg = `${newCountry.country} ${newCountry.year} ha sido insertado correctamente.`
                            errorMsg = "";
                               }else{
                                   if(res.status === 409){
                                       okMsg = "";
                                       errorMsg = `${newCountry.country} ${newCountry.year} ya se encuentra cargado.`
                                   }
                                   console.log("ERROR!" + errorMsg);
                               }
                            
                           })
    }

    async function deleteCountry(country, year){
        console.log("Deleting country "+ country+"/"+ year);

        const res = await fetch(BASE_OIL_API_PATH+"oil-production-stats/"+country + "/" + year,
                            {
                                method: "DELETE",
                            }
                           ).then( (res) => {
                               if(res.ok) {
                                numData--;
                                console.log("NUMDATA IS:" + numData);
                            getData();
                            okMsg = `${country} ${year} ha sido eliminado correctamente.`
                            errorMsg = "";
                               }else{
                                   if(res.status === 404){
                                       okMsg = "";
                                       errorMsg = `${country} ${year} no se encuentra en la base de datos.`
                                   }
                                   console.log("ERROR!" + errorMsg);
                               }
                            
                           })
    }

    async function deleteAllCountries(){
        console.log("Deleting all countries ");

        const res = await fetch(BASE_OIL_API_PATH+"oil-production-stats/",
                            {
                                method: "DELETE",
                            }
                           ).then(function (res) {
                                if (res.ok) {
                                    console.log("OK");
                                    oilstats = [];
                                    numData = 0;
                                    errorMsg = "";
                                    okMsg = "Datos borrados correctamente";
                                } else {
                                    if(res.status===404){
                                    okMsg = "";
                                    errorMsg = "No existen datos que borrar";
                                    }else if(res.status ===500){
                                    okMsg = "";
                                    errorMsg = "No se han podido acceder a la base de datos";
                                    }        
                                    okMsg = "";
                                    console.log("ERROR!" + errorMsg);
                                }
                                });
  }
    

    async function nextPage() {
        if (offset+10 > numData) {
            if(numdata!=0){
                offset += numData;
            actual = 2;
            }
        } else {
            offset +=10
            actual = 2;
        }
        console.log("Offset: "+ offset);
        const res = await fetch(BASE_OIL_API_PATH+"oil-production-stats?limit="+limit+"&offset="+offset);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            oilstats = json;
            console.log("Received " + oilstats.length + " data.");
        } else {
            console.log("ERROR!");
        }
    }

    async function previousPage() {
 
        if (offset-10>=1) {
            offset -= 10; 
            actual -= 1;
        } else {
            offset = 0
            actual = 1;
        }
        console.log("Offset: " +offset);
        const res = await fetch(BASE_OIL_API_PATH+"oil-production-stats?limit="+limit+"&offset="+offset);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            oilstats = json;
            console.log("Received " + oilstats.length + " data.");
        } else {
            console.log("ERROR!");
        }
    }

    onMount(getData);
</script>

<main>
    <h1>
        oilAPI
    </h1>
    <div>
        {#if errorMsg}
        <p class="msgRed" style="color: #9d1c24">ERROR: {errorMsg}</p>
    {/if}
        {#if okMsg}
      <p class="msgGreen" style="color: #155724">{okMsg}</p>
    {/if}
    </div>
    <Table bordered>
        <thead>
            <tr>
                <th>Pais</th>
                <th>Año</th>
                <th>Produccion</th>
                <th>Exportacion</th>
                <th>Distribucion</th>
                <th>Acciones</th>
                
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value="{newCountry.country}"></td>
                <td><input bind:value="{newCountry.year}"></td>
                <td><input bind:value="{newCountry['production']}"></td>
                <td><input bind:value="{newCountry['exportation']}"></td>
                <td><input bind:value="{newCountry['distribution']}"></td>
                <td><Button on:click={insertCountry}>Insertar</Button></td>
            </tr>
            {#each oilstats as data}
                <tr>
                    <td><a href="#/oil-production-stats/{data.country}/{data.year}">{data.country}</a></td>
                    <td>{data.year}</td>
                    <td>{data["production"]}</td>
                    <td>{data["exportation"]}</td>
                    <td>{data["distribution"]}</td>
                    <td><Button on:click={deleteCountry(data.country, data.year)}>Borrar</Button></td>
                </tr>
            {/each}
        </tbody>
    </Table>
    <Button outline color="info" on:click="{previousPage}">Página anterior</Button>
    <Button>{actual}</Button>
    <Button outline color="info" on:click="{nextPage}">Siguiente Página</Button>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
    <Button outline color="primary" on:click="{loadData}">Cargar datos iniciales</Button>
    <Button outline color="danger" on:click="{deleteAllCountries}">Borrar todos los datos</Button>
</main>

<style>
    p {
    display: inline;
  }

  .msgRed {
    padding: 8px;
    background-color: #f8d7da;
  }

  .msgGreen {
    padding: 8px;
    background-color: #d4edda;
  }

  div{
    margin-bottom: 15px;
  }
</style>

