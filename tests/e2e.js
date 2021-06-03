const puppeteer = require('puppeteer');
var n = 1;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
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
  

  //OIL

  //WINE


  //NUTS Tabla
  await page.click("body > main > main > div:nth-child(6) > a:nth-child(2)");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+n+'_NutsTable.png' });
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