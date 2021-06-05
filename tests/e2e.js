const puppeteer = require('puppeteer');
var n = 1;

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('http://localhost:10000/');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+n+'_Principal.png' });
  n++;
    //Info
  await page.click("body > main > main > a");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+n+'_Info.png' });
  n++;
    //Componentes del grupo
  await page.click("body > main > main > a:nth-child(2)");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+n+'_Componentes.png' });
  await page.goto('http://localhost:10000/#/info');
  n++;

  //Grafica general
  await page.click("body > main > main > div:nth-child(3) > div:nth-child(2) > a");
  await page.waitForTimeout(4000);
  await page.screenshot({ path: './tests/'+n+'_GraficaGeneral.png' });
  await page.click("body > main > main > button");
  n++;

  //Integraciones
  await page.click("body > main > main > div:nth-child(3) > div:nth-child(5) > a");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+n+'_Integrations.png' });
  n++;

  //Integraciones Oil
  await page.click("body > main > main > div:nth-child(2) > a:nth-child(2)");
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './tests/'+n+'_ObesityGraph.png' });
  await page.click("body > main > main > button");
  n++;

  await page.click("body > main > main > div:nth-child(2) > a:nth-child(3)");
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './tests/'+n+'_PovertyGraph.png' });
  await page.click("body > main > main > button");
  n++;

  await page.click("body > main > main > div:nth-child(2) > a:nth-child(6)");
  await page.waitForTimeout(4000);
  await page.screenshot({ path: './tests/'+n+'_OilExterna1.png' });
  await page.click("body > main > main > button");
  n++;

  await page.click("body > main > main > div:nth-child(2) > a:nth-child(5)");
  await page.waitForTimeout(5000);
  await page.screenshot({ path: './tests/'+n+'_OilExterna2.png' });
  await page.click("body > main > main > button");
  n++;
  //Integraciones Wine




  //Integraciones Nuts
  await page.click("body > main > main > div:nth-child(4) > a:nth-child(2)");
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './tests/'+n+'_NutsAPISOS1food.png' });
  await page.click("body > main > main > button");
  n++;
  await page.click("body > main > main > div:nth-child(4) > a:nth-child(3)");
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './tests/'+n+'_NutsAPISOS2children.png' });
  await page.click("body > main > main > button");
  n++;
  await page.click("body > main > main > div:nth-child(4) > a:nth-child(4)");
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './tests/'+n+'_EXT1ball.png' });
  await page.click("body > main > main > button");
  n++;
  await page.click("body > main > main > div:nth-child(4) > a:nth-child(5)");
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './tests/'+n+'_EXT2ghibli.png' });
  await page.click("body > main > main > button");
  n++;
  await page.goto('http://localhost:10000/#/info');
  

  //OIL Tabla
  await page.click("body > main > main > div:nth-child(4) > a:nth-child(2)");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+n+'_OilTable.png' });
  n++;
  //Cargamos los datos iniciales
  await page.click("body > main > main > button.btn.btn-outline-primary");
  await page.waitForTimeout(1000);


  //Insertamos un nuevo dato
  await page.focus("body > main > main > table.table.table-bordered > tbody > tr:nth-child(1) > td:nth-child(1) > input");
  await page.keyboard.type("PruebaInsert");

  await page.focus("body > main > main > table.table.table-bordered > tbody > tr:nth-child(1) > td:nth-child(2) > input");
  await page.keyboard.type("1");

  await page.focus("body > main > main > table.table.table-bordered > tbody > tr:nth-child(1) > td:nth-child(3) > input");
  await page.keyboard.type("1");

  await page.focus("body > main > main > table.table.table-bordered > tbody > tr:nth-child(1) > td:nth-child(4) > input");
  await page.keyboard.type("1");

  await page.focus("body > main > main > table.table.table-bordered > tbody > tr:nth-child(1) > td:nth-child(5) > input");
  await page.keyboard.type("1");

  await page.click("body > main > main > table.table.table-bordered > tbody > tr:nth-child(1) > td:nth-child(6) > button");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+n+'_InsertOilData.png' });
  n++;

  //Buscamos el dato insertado anteriormente
  await page.focus("body > main > main > table:nth-child(3) > tbody > tr > td:nth-child(1) > input");
  await page.keyboard.type("PruebaInsert");

  await page.click("body > main > main > table:nth-child(3) > tbody > tr > td:nth-child(6) > button");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+n+'_SearchOilData.png' });
  n++;

  //Eliminamos el dato buscado el dato insertado anteriormente
  await page.click("body > main > main > table.table.table-bordered > tbody > tr:nth-child(2) > td:nth-child(6) > button");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+n+'_DeleteOilData.png' });
  n++;

  await page.click("body > main > main > button.btn.btn-outline-secondary");
  n++;

  //OIL Grafica Highcharts con todo
  await page.click("body > main > main > div:nth-child(4) > a:nth-child(6)");
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './tests/'+n+'_AllOilDataChart.png' });
  await page.click("body > main > main > button");
  n++;

   //OIL Grafica Canvas
   await page.click("body > main > main > div:nth-child(4) > a:nth-child(7)");
   await page.waitForTimeout(3000);
   await page.screenshot({ path: './tests/'+n+'_CanvasOilChart.png' });
   await page.click("body > main > main > button");
   n++;
  //WINE


  //NUTS Tabla
  await page.click("body > main > main > div:nth-child(6) > a:nth-child(2)");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+n+'_NutsTable.png' });
  n++;

   //Cargamos los datos iniciales
   await page.click("body > main > main > button.btn.btn-outline-primary");
   await page.waitForTimeout(1000);
 
 
   //Insertamos un nuevo dato
   await page.focus("body > main > main > table.table.table-bordered > tbody > tr:nth-child(1) > td:nth-child(1) > input");
   await page.keyboard.type("XXXXXXXX");
 
   await page.focus("body > main > main > table.table.table-bordered > tbody > tr:nth-child(1) > td:nth-child(2) > input");
   await page.keyboard.type("1");
 
   await page.focus("body > main > main > table.table.table-bordered > tbody > tr:nth-child(1) > td:nth-child(3) > input");
   await page.keyboard.type("1");
 
   await page.focus("body > main > main > table.table.table-bordered > tbody > tr:nth-child(1) > td:nth-child(4) > input");
   await page.keyboard.type("1");
 
   await page.focus("body > main > main > table.table.table-bordered > tbody > tr:nth-child(1) > td:nth-child(5) > input");
   await page.keyboard.type("1");
 
   await page.click("body > main > main > table.table.table-bordered > tbody > tr:nth-child(1) > td:nth-child(6) > button");
   await page.waitForTimeout(1000);
   await page.screenshot({ path: './tests/'+n+'_InsertNutData.png' });
   n++;
 
   //Buscamos el dato insertado anteriormente
   await page.focus("body > main > main > table:nth-child(3) > tbody > tr > td:nth-child(1) > input");
   await page.keyboard.type("XXXXXXXX");
 
   await page.click("body > main > main > table:nth-child(3) > tbody > tr > td:nth-child(6) > button");
   await page.waitForTimeout(1000);
   await page.screenshot({ path: './tests/'+n+'_SearchNutData.png' });
   n++;
 
   //Eliminamos el dato buscado el dato insertado anteriormente
   await page.click("body > main > main > table.table.table-bordered > tbody > tr:nth-child(2) > td:nth-child(6) > button");
   await page.waitForTimeout(1000);
   await page.screenshot({ path: './tests/'+n+'_DeleteNutData.png' });
   n++;
 
   await page.click("body > main > main > button.btn.btn-outline-secondary");
   n++;

  //NUTS Grafica Highcharts con todo
  await page.click("body > main > main > div:nth-child(6) > a:nth-child(6)");
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './tests/'+n+'_AllNutsDataChart.png' });
  await page.click("body > main > main > button");
  n++;
  
  //NUTS Grafica Plotly
  await page.click("body > main > main > div:nth-child(6) > a:nth-child(7)");
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './tests/'+n+'_PlotlyNutsChart.png' });
  await page.click("body > main > main > button");
  n++;

  
  await browser.close();
})();