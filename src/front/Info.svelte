<script>
    import {
    Button, Container, Jumbotron,
    
  } from "sveltestrap";
  </script>
  
  <main>
      
      <h1>SOS2021-02</h1>
      <a href="old_index_static.html"> Ver la información de los componentes del grupo</a>

      <Jumbotron>
        <p>Grafico General</p>
        <div>
          <a href="#/general-graph"
                ><Button color="primary">Grafica</Button></a
              >
        </div>
    <ul>
        <p1>Grafico general del grupo</p1>
    </ul>
    </Jumbotron>


    <Jumbotron>
        <p>API DATOS ACEITE</p>
        <a href="#/oil-production-stats"
                ><Button color="primary">Datos aceite (Frontend)</Button></a
              >
        <a href="https://sos2021-02.herokuapp.com/api/v2/oil-production-stats"
              ><Button color="primary">URL base (Backend)</Button></a
            >
        <a href="https://documenter.getpostman.com/view/10673756/TzJoDfUb"
                ><Button color="primary">Documentación de Postman</Button></a
              >
        <a href="https://documenter.getpostman.com/view/10673756/TzRLkqi1"
                ><Button color="primary">Documentación de Postman v2</Button></a
              >
        <a href="#/oil-graph"
                ><Button color="warning">Gráfica</Button></a
              >
        <ul>
        <p1>José Manuel González Domínguez. Fuente: <a href="https://sos2021-02.herokuapp.com/api/v2/oil-production-stats"> oil-production-stats</a></p1>
    </ul>
    </Jumbotron>
    <Jumbotron>
        <p>API DATOS VINO</p>
        <a href="#/wine-production-stats"
                ><Button color="primary">Datos vino</Button></a
              >
        <a href="https://sos2021-02.herokuapp.com/api/v2/wine-production-stats"
              ><Button color="primary">URL base (Backend)</Button></a
            >
        <a href="https://documenter.getpostman.com/view/14969253/TzJoDfre"
          ><Button color="primary">Documentación de Postman</Button></a
        >
        <a href="https://documenter.getpostman.com/view/14969253/TzRNEpmA"
          ><Button color="primary">Documentación de Postman v2</Button></a
        >
        <a href="#/wine-graph"
        ><Button color="warning">Gráfica</Button></a
      >
        
        <ul>
            <p1>Alejandro Fernández Baena. Fuente: <a href="https://sos2021-02.herokuapp.com/api/v2/wine-production-stats"> wine-production-stats</a></p1>
        </ul>
    </Jumbotron>
    <Jumbotron>
        <p>API DATOS FRUTOS SECOS</p>
        <a href="#/nuts-production-stats"
                ><Button color="primary">Datos frutos secos</Button></a
              >
        <a href="https://sos2021-02.herokuapp.com/api/v2/nuts-production-stats"
              ><Button color="primary">URL base (Backend)</Button></a
            >
        <a href="https://documenter.getpostman.com/view/10637366/TzJoDfrf"
                ><Button color="primary">Documentación de Postman v1</Button></a
              >
        <a href="https://documenter.getpostman.com/view/10637366/TzRNE9Zz"
              ><Button color="primary">Documentación de Postman v2</Button></a
              >
        <a href="#/nuts-graph"
              ><Button color="warning">Gráfica</Button></a
              >
        <ul>
            <p1>Antonio José Marín Rodríguez. Fuente: <a href="https://sos2021-02.herokuapp.com/api/v2/nuts-production-stats"> nuts-production-stats</a></p1>
        </ul>
    </Jumbotron>

            <a href="https://github.com/gti-sos/SOS2021-02"> Repositorio del grupo</a>
      
   </main>

   <style>
       p {
            color: rgb(0, 0, 0);
            width: 300px;
            border: 1px solid black;
            
            margin-bottom: 25px;
            margin-left: 43%;
            text-align: center;
          }
      ul {
          margin-top: 25px;
      }
      div{
        text-align: center;
      }
   </style>