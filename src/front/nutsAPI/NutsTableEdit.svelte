<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    export let params = {};
    let data = {};
    let updateCountry = "XXXX";
    let updateYear = 9999;
    let updateAlmond = 9999;
    let updateWalnut = 9999;
    let updatePistachio = 9999;
    let errorMsg = "";

    onMount(getData);

    async function getData(){
        console.log("Fetching nutsstats...");
        const res = await fetch(BASE_NUTS_API_PATH+"nuts-production-stats" + params.CountryName + "/" + params.CountryYear);

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            data = json;
            updateCountry = data.country;
            updateYear = data.year;
            updateAlmond= data["Almond"];
            updateWalnut= data["Walnut"];
            updatePistachio= data["Pistachio"];
            


            console.log(`We have received ${nutsstats.length} countries.`);
        }else{
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }   
    

    async function updateData() {

        console.log("Updating country..." + JSON.stringify(params.countryName)+JSON.stringify(params.countryYear));

        const res = await fetch("/api/v1/nuts-production-stats/" + params.countryName + "/" + params.countryYear, {
            method: "PUT",
            body: JSON.stringify({
                country: params.countryName,
                year: params.countryYear,
                "Almond": parseInt(updateAlmond),
                "Walnut": parseFloat(updateWalnut),
                "Pistachio": parseFloat(updatePistachio),
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getData();
        });



    }

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
                <td><input bind:value="{updateCountry}"></td>
                <td><input bind:value="{updateYear}"></td>
                <td><input bind:value="{updateAlmond}"></td>
                <td><input bind:value="{updateWalnut}"></td>
                <td><input bind:value="{updatePistachio}"></td>
                <td><Button on:click={updateData}>Actualizar</Button></td>
            </tr>
        </tbody>
    </Table>
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Retroceder</Button>
</main>

