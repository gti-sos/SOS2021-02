<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    var BASE_NUTS_PATH = "/api/v1/";
    let nutsstats = [];
    let newCountry = {
        country: "",
        year: "",
        "almond": "",
        "walnut": "",
        "pistachio": "",
    }
    let errorMsg = "";
    let okMsg = "";

    async function loadData(){
        console.log("Loading nutsstats...");
        const res = await fetch(BASE_NUTS_PATH+"nuts-production-stats/loadInitialData");

        if(res.ok){
            console.log("Ok.");
            getData();
            
        }else{
            console.log("Error!");
        }
    }   

    async function getData(){
        console.log("Fetching nutsstats...");
        const res = await fetch(BASE_NUTS_PATH+"nuts-production-stats");

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            nutsstats = json;
            console.log(`We have received ${nutsstats.length} countries.`);
        }else{
            console.log("Error!");
        }
    }   
    
    onMount(getData);

    async function insertCountry(){
        console.log("Inserting country "+ JSON.stringify(newCountry));
        newCountry.country = (newCountry.country);
        newCountry.year = parseInt(newCountry.year);
        newCountry["almond"] = parseInt(newCountry["almond"]);
        newCountry["walnut"] = parseInt(newCountry["walnut"]);
        newCountry["pistachio"] = parseInt(newCountry["pistachio"]);

        const res = await fetch(BASE_NUTS_PATH+"nuts-production-stats",
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

    async function deleteCountry(countryName, countryYear){
        console.log("Deleting country "+ countryName+ countryYear);

        const res = await fetch(BASE_NUTS_PATH+"nuts-production-stats/"+countryName + "/" + countryYear,
                            {
                                method: "DELETE",
                            }
                           ).then( (res) => {
                            getData();
                           })
    }

    async function deleteAllCountries(){
        console.log("Deleting all countries ");

        const res = await fetch(BASE_NUTS_PATH+"nuts-production-stats/",
            {
                    method: "DELETE",
            }
            ).then(function (res) {
                    if (res.ok) {
                        console.log("OK");
                        nutsstats = [];
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
        nutsAPI
    </h1>
    <Table bordered>
        <thead>
            <tr>
                <th>Pais</th>
                <th>Año</th>
                <th>Almendra</th>
                <th>Nuez</th>
                <th>Pistacho</th>
                <th>Acciones</th>
                
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value="{newCountry.country}"></td>
                <td><input bind:value="{newCountry.year}"></td>
                <td><input bind:value="{newCountry['almond']}"></td>
                <td><input bind:value="{newCountry['walnut']}"></td>
                <td><input bind:value="{newCountry['pistachio']}"></td>
                <td><Button on:click={insertCountry}>Insertar</Button></td>
            </tr>
            {#each nutsstats as data}
                <tr>
                    <td><a href="#/nuts-production-stats/{data.country}/{data.year}">{data.country}</a></td>
                    <td>{data.year}</td>
                    <td>{data["almond"]}</td>
                    <td>{data["walnut"]}</td>
                    <td>{data["pistachio"]}</td>
                    <td><Button on:click={deleteCountry(data.country, data.year)}>Delete</Button></td>
                </tr>
            {/each}
        </tbody>
    </Table>
    <Button outline color="secondary" on:click="{pop}">Retroceder</Button>
    <Button outline color="primary" on:click="{loadData}">Cargar datos iniciales</Button>
    <Button outline color="danger" on:click="{deleteAllCountries}">Borrar todos los datos</Button>
</main>