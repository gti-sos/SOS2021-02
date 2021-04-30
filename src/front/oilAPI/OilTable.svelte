<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    var BASE_OIL_API_PATH = "/api/v1/";
    let oilstats = [];
    let newCountry = {
        country: "",
        year: "",
        "production": "",
        "exportation": "",
        "distribution": "",
    }
    async function loadData(){
        console.log("Loading oilstats...");
        const res = await fetch(BASE_OIL_API_PATH+"oil-production-stats/loadInitialData");

        if(res.ok){
            console.log("Ok.");
            getData();
            
        }else{
            console.log("Error!");
        }
    }   

    async function getData(){
        console.log("Fetching oilstats...");
        const res = await fetch(BASE_OIL_API_PATH+"oil-production-stats");

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
                            getData();
                           })
    }

    async function deleteCountry(countryName, countryYear){
        console.log("Deleting country "+ countryName+ countryYear);

        const res = await fetch(BASE_OIL_API_PATH+"oil-production-stats/"+countryName + "/" + countryYear,
                            {
                                method: "DELETE",
                            }
                           ).then( (res) => {
                            getData();
                           })
    }
    onMount(getData);
</script>

<main>
    <h1>
        oilAPI
    </h1>
    <Table bordered>
        <thead>
            <tr>
                <th>Pais</th>
                <th>Año</th>
                <th>Produccion</th>
                <th>Exportacion</th>
                <th>Distribucion</th>
                <th>Actions</th>
                
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value="{newCountry.country}"></td>
                <td><input bind:value="{newCountry.year}"></td>
                <td><input bind:value="{newCountry['production']}"></td>
                <td><input bind:value="{newCountry['exportation']}"></td>
                <td><input bind:value="{newCountry['distribution']}"></td>
                <td><Button on:click={insertCountry}>Insert</Button></td>
            </tr>
            {#each oilstats as data}
                <tr>
                    <td><a href="#/oil-production-stats/{data.country}/{data.year}">{data.country}</a></td>
                    <td>{data.year}</td>
                    <td>{data["production"]}</td>
                    <td>{data["exportation"]}</td>
                    <td>{data["distribution"]}</td>
                    <td><Button on:click={deleteCountry(data.country, data.year)}>Delete</Button></td>
                </tr>
            {/each}
        </tbody>
    </Table>
    <Button outline color="secondary" on:click="{pop}">Back</Button>
</main>

