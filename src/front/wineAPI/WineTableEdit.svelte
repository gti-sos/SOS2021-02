<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import numData from "./WineTable.svelte";
    export let params = {};
    const BASE_WINE_API_PATH = "/api/v2/";
    let data = {};
    let updateCountry = "XXXX";
    let updateYear = 9999;
    let updateProduction = 9999;
    let updateImport = 9999;
    let updateExport = 9999;
    let errorMsg = "";
    let okMsg = "";

    onMount(getData);

    async function getData(){
        console.log("Fetching winestats...");
        const res = await fetch(BASE_WINE_API_PATH+"wine-production-stats/" + params.country + "/" + params.year);

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            data = json;
            updateCountry = data.country;
            updateYear = data.year;
            updateProduction= data["production"];
            updateImport= data["import"];
            updateExport= data["export"];
            


            console.log(`Data received`);
        }else{
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }   
    

    async function updateData() {

        console.log("Updating country..." + JSON.stringify(params.country)+JSON.stringify(params.year));

        const res = await fetch("/api/v2/wine-production-stats/" + params.country + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                "country": params.country,
                "year": parseInt(params.year),
                "production": parseFloat(updateProduction),
                "import": parseFloat(updateImport),
                "export": parseFloat(updateExport),
            }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(function (res) {
        if (res.ok) {
          console.log("OK");
          getData();
          errorMsg = "";
          okMsg = "Dato actualizado";
        } else {
          errorMsg = res.status + ": " + res.statusText;
          getData();
          console.log("ERROR!" + errorMsg);
        }
      });


        
    }
    onMount(getData);
</script>

<main>
    <h1>
        Editar <strong>{params.country}</strong>
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
                <th>Importacion</th>
                <th>Exportacion</th>
                <th>Accion</th>
                
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{updateCountry}</td>
                <td>{updateYear}</td>
                <td><input bind:value="{updateProduction}"></td>
                <td><input bind:value="{updateImport}"></td>
                <td><input bind:value="{updateExport}"></td>
                <td><Button on:click={updateData}>Actualizar</Button></td>
            </tr>
        </tbody>
    </Table>
    <Button outline color="secondary" on:click="{pop}">Volver</Button>
</main>

<style>
    p {
    display: inline;
  }

  .msgRed {
    padding: 4px;
    background-color: #f8d7da;
  }

  .msgGreen {
    padding: 4px;
    background-color: #d4edda;
  }

  div{
    margin-bottom: 15px;
  }
</style>



