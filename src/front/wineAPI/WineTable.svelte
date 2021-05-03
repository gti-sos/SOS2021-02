<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    var BASE_WINE_API_PATH = "/api/v1/";
    let winestats = [];
    let newCountry = {
        country: "",
        year: "",
        "production": "",
        "import": "",
        "export": "",
    }
    let errorMsg = "";
    let okMsg = "";
    async function loadData(){
        console.log("Loading winestats...");
        const res = await fetch(BASE_WINE_API_PATH+"wine-production-stats/loadInitialData");

        if(res.ok){
            console.log("Ok.");
            getData();
            
        }else{
            console.log("Error!");
        }
    }   

    async function getData(){
        console.log("Fetching winestats...");
        const res = await fetch(BASE_WINE_API_PATH+"wine-production-stats");

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            winestats = json;
            console.log(`We have received ${winestats.length} countries.`);
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
        newCountry["import"] = parseFloat(newCountry["import"]);
        newCountry["export"] = parseFloat(newCountry["export"]);

        const res = await fetch(BASE_WINE_API_PATH+"wine-production-stats",
                            {
                                method: "POST",
                                body: JSON.stringify(newCountry),
                                headers:{
                                    "Content-Type": "application/json"
                                }
                            }
                           ).then( (res) => {
                            getData();
                           })
    }

    async function deleteCountry(country, year){
        console.log("Deleting country "+ country+ "/"+ year);

        const res = await fetch(BASE_WINE_API_PATH+"wine-production-stats/"+country + "/" + year,
                            {
                                method: "DELETE",
                            }
                           ).then( (res) => {
                            getData();
                           })
    }
    async function deleteAllCountries(){
        console.log("Deleting all countries ");

        const res = await fetch(BASE_WINE_API_PATH+"wine-production-stats/",
                            {
                                method: "DELETE",
                            }
                           ).then(function (res) {
                                if (res.ok) {
                                    console.log("OK");
                                    winestats = [];
                                    errorMsg = "";
                                    okMsg = "Operación realizada correctamente";
                                } else {
                                    if(res.status===404){
                                    errorMsg = "No existen datos que borrar";
                                    }else if(res.status ===500){
                                    errorMsg = "No se han podido acceder a la base de datos";
                                    }        
                                    okMsg = "";
                                    console.log("ERROR!" + errorMsg);
                                }
                                });
  }
    onMount(getData);
</script>

<main>
    <h1>
        wineAPI
    </h1>
    <Table bordered>
        <thead>
            <tr>
                <th>Pais</th>
                <th>Año</th>
                <th>Produccion</th>
                <th>Importacion</th>
                <th>Exportacion</th>
                <th>Accion</th>
                
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value="{newCountry.country}"></td>
                <td><input bind:value="{newCountry.year}"></td>
                <td><input bind:value="{newCountry['production']}"></td>
                <td><input bind:value="{newCountry['import']}"></td>
                <td><input bind:value="{newCountry['export']}"></td>
                <td><Button on:click={insertCountry}>Insert</Button></td>
            </tr>
            {#each winestats as data}
                <tr>
                    <td><a href="#/wine-production-stats/{data.country}/{data.year}">{data.country}</a></td>
                    <td>{data.year}</td>
                    <td>{data["production"]}</td>
                    <td>{data["import"]}</td>
                    <td>{data["export"]}</td>
                    <td><Button on:click={deleteCountry(data.country, data.year)}>Borrar</Button></td>
                </tr>
            {/each}
        </tbody>
    </Table>
    <Button outline color="secondary" on:click="{pop}">Back</Button>
    <Button outline color="primary" on:click="{loadData}">Cargar datos iniciales</Button>
    <Button outline color="danger" on:click="{deleteAllCountries}">Borrar todos los datos</Button>
</main>

