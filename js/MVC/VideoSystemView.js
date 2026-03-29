"use strict";

class VideoSystemView {


  constructor() {
    this.nav = document.getElementById("navID");
    this.main = document.getElementById("mainID");
    this.footer = document.getElementById("footerID");
  }
  // metodos

  /**
   * Carga al inicio 
   * @param {*} categories 
   * @param {*} directors 
   * @param {*} actors 
   * @param {*} productions 
   */
  init(categories, directors, actors, productions) {
    this.showMenu(categories, directors, actors, directors);
    this.showCategories(categories, directors, actors, productions);
    this.showRandomProductions(productions);

  };

  /**
   * muestra el Menu principal
   * @param {*} categories 
   * @param {*} directors 
   * @param {*} actors 
   * @param {*} productions 
   */
  showMenu(categories, directors, actors, productions) {
    // mostrar menú
    let html = "";
    //  borra el contenido del nav
    this.nav.replaceChildren();

    html = `
      <div class="container-fluid">

      <a id="inicio" class="navbar-brand" href="#">
        <img class="navbar-brand"  src="./img/logo.png" alt="Logo" height="40" class="d-inline-block align-text-top">
        Inicio
      </a>

      <!-- Botón hamburguesa (para pantallas pequeñas) -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
        <span class="navbar-toggler-icon"></span>
      </button>

      
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">`;

    // Insertar Categorias, Actores, Directores, etc en un dropdown
    html += `
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Categorías
            </a>
            <ul class="dropdown-menu">`;
    for (const cat of categories) { // clase categoria
      html += `<li class="categoria"><a class="dropdown-item category-link" title="${cat.description}" href="#">${cat.name}</a></li>`;
    }


    html += `
    </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
              Directores
            </a>
            <ul class="dropdown-menu">`;


    //  insertar directores en el menú
    for (const director of directors) {
      html += `<li class="directores"><a class="dropdown-item" href="#">${director.name + " " + director.lastname1}</a></li>`;
    }

    html += `</ul>
          </li>

          
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
              Actores
            </a>
            <ul class="dropdown-menu">`;

    // Insertar Actores en el menú
    for (const actor of actors) {
      html += `<li class="actores"><a class="dropdown-item " href="#">${actor.name + " " + actor.lastname1}</a></li>`;

    }

    html += `</ul>
          </li>

        </ul>
      </div>

    </div>
    `;

    // insertar en el html antes del final
    this.nav.insertAdjacentHTML("beforeend", html);

  }

  /**
   * Muestra las Categorias y las producciones
   * @param {*} categories 
   * @param {*} directors 
   * @param {*} actors 
   * @param {*} productions 
   */
  showCategories(categories, directors, actors, productions) {
    // ver zona central Categorias

    // Borrar lo que habia antes 
    this.main.replaceChildren();

    // Mostrar categorias en el centro
    let html = "";
    html = `
    <div class="container">
    <h3 class="mb-2">Categorías:</h3>
    <div class="row justify-content-center">
    `;

    console.log("Mostrar Categorias en Vista:");
    for (const categoria of categories) { // clase categoria
      html += `
      <div class="col-6 mb-4 categoria"> 
      <a href="#" class="btn btn-primary btn-lg w-100 py-2" title="${categoria.description}" >${categoria.name}</a>
      </div>
      `;
      console.log(categoria.name);
    }
    html += `
    </div>
    </div>
    `;

    this.main.insertAdjacentHTML('beforeend', html);


  }

  /**
   * Muestra 3 producciones de forma aleatoria
   * @param {*} productions 
   */
  showRandomProductions(productions) {
    // generar Producciones aleatorias y las añade a la vista
    let html = "";
    html = `
    <div class="container">
      <h3 class="mb-2">3 Producciones Aleatorias:</h3>
      <div class="row justify-content-center">
    `;

    console.log("Mostrar 3 producciones aleatorias");

    // guarda las producciones aleatorias
    const randomProductions = Array.from(this.getRandomProductions(productions, 3));
    for (const produccion of randomProductions) {
      html += `
      <div class="col-6 mb-4">
      <a href="#" class="btn btn-primary btn-lg w-100 py-2" title="${produccion.synopsis}" >${produccion.title}</a>
      </div>
      `;
      console.log(produccion.title);
    }

    html += `
    </div>
      </div>
    `;

    this.main.insertAdjacentHTML('beforeend', html);
  }

  /**
   * recibe un array de producciones y los muestra en la vista principal
   * @param {*} category 
   */
  listProductions(productions, nombreCategoria) {
    // ver zona central Categorias

    // Borrar lo que habia antes 
    this.main.replaceChildren();

    // Mostrar producciones en el centro
    let html = "";
    html = `
    <div class="container">
    <h3 class="mb-2">Producciones de ${nombreCategoria}:</h3>
    <div class="row justify-content-center">
    `;

    console.log("Mostrar Producciones de la Categoria:");
    for (const pro of productions) {
      html += `
      <div class="col-6 mb-4 produccion">
      <a href="#" class="btn btn-primary btn-lg w-100 py-2" title="${pro.synopsis}" >${pro.title}</a>
      </div>
      `;
      console.log(pro.title);
    }
    html += `
    </div>
    </div>
    `;

    this.main.insertAdjacentHTML('beforeend', html);

  }


  /**
   * enlazador para ver las producciones al clickar en una categoria
   * @param {*} handlet 
   */
  bindGetProductionsInCategory(handlet) {
    // como no existe la categoria en html, se delega al padre main
    this.main.addEventListener("click", (event) => {
      // buscar la clase categoria
      const cat = event.target.closest(".categoria");
      if (!cat) {// si no existe continuar la ejecución
        return;
      }
      // obtener el nombre de la categoria desde el enlace "a"
      const nombreCat = cat.querySelector("a").textContent;
      console.log("evento añadido a categoria: " + nombreCat);

      // ejecutar listProductions, handlet();
      this.listProductions(handlet(nombreCat), nombreCat);
    });
    //  lo mismo pero en la navegación
    this.nav.addEventListener("click", (event) => {
      // buscar la clase categoria
      const cat = event.target.closest(".categoria");
      if (!cat) {// si no existe continuar la ejecución

        return;
      }
      // obtener el nombre de la categoria desde el enlace "a"
      const nombreCat = cat.querySelector("a").textContent;
      console.log("evento añadido a categoria: " + nombreCat);

      // ejecutar listProductions, handlet();
      this.listProductions(handlet(nombreCat), nombreCat);
    });
  }

  showFichaProduction(production, actors, directors) {
    // ver ficha produccion
    // ver todos los campos de la produccion y los actores y directores que intervienen en la producción
    // #title;
    // #nationality;
    // #publication;
    // #synopsis;
    // #image;

    // Borrar lo que habia antes 
    this.main.replaceChildren();

    // Mostrar producciones en el centro
    let html = "";
    html = `
     <div class="card shadow-lg">
      <div class="row g-0">

        <div class="col-md-4">
          <img src="https://placehold.co/400x600/grey/white?text=Foto+de+la+Pelicula"
            class="img-fluid rounded-start h-100 object-fit-cover" alt="Imagen producción">
        </div>

        <div class="col-md-8">
          <div class="card-body">

            <h2 class="card-title">${production.title}</h2>

            <p class="card-text">
              <strong>Nacionalidad: </strong>${production.nationality}
            </p>

            <p class="card-text">
              <strong>Fecha de publicación: </strong>${production.publication.toLocaleDateString()}
            </p>

            <p class="card-text">
              <strong>Sinopsis: </strong>${production.synopsis}
            </p>

            <hr>

            <!-- Actores -->
            <h4>Actores</h4>
            <div class="row">`;

    // mostrar actores
    for (const actor of actors) {
      html += `<div class="col-md-4 text-center mb-3">
                <p class="mb-0">${actor.name + " " + actor.lastname1}</p>
              </div>`;
    }

    html += `</div>

            <hr>

            <!-- Directores -->
            <h4>Directores</h4>
            <div class="row">`;

    // mostrar directores
    for (const dir of directors) {
      html += `<div class="col-md-4 text-center mb-3">
                <p class="mb-0">${dir.name + " " + dir.lastname1}</p>
              </div>`;
    }

    html += `</div>

          </div>
        </div>

      </div>
    </div>
    `;


    this.main.insertAdjacentHTML('beforeend', html);
  }

  // enlace para el evento que muestra la ficha de la pelicula
  bindShowFichaProduction(handler) {
    //  se delega el evento al padre
    this.main.addEventListener("click", (event) => {
      const produccion = event.target.closest(".produccion");
      if (!produccion) return;

      // buscar el enlace de la produccion y guardar titulo
      const nombreProduccion = produccion.querySelector("a").textContent;
      console.log("Evento añadido a produccion: " + nombreProduccion);
      // añadir handler
      // como necesito el objeto produccion y los actors y directores , lo añado en un objeto
      const datos = handler(nombreProduccion);
      this.showFichaProduction(datos.produccion, datos.actores, datos.directores);
    });
  }

  showFichaActor() {

  }

  showFichaDirector() {

  }


  // evento de carga de la página ejecutar el init, para ver datos
  bindLoad(handler) {
    window.addEventListener("DOMContentLoaded", handler, { once: true });// ejecutar solo una vez
  }



  // ver inicio, delegar evento, aun no esta creado el id Inicio, pero el nav si
  bindInit(handler) {
    // delegar eventos
    this.nav.addEventListener("click", (event) => {
      // busca en el nav el id inicio
      const inicio = event.target.closest("#inicio");
      if (!inicio) {
        return;
      } // si no existe continuar ejecución
      handler(); // ejecutar handler
    });
  }

  /**
   * devuelve un set con el número de producciones pasadas por parametro
   * @param {*} productions 
   * @param {*} numero 
   * @returns 
   */
  *getRandomProductions(productions, numero) {
    const array = Array.from(productions);
    const max = array.length;
    const set = new Set();
    //  si se ha introducido un número mal
    if (max === 0 || numero <= 0) return;

    // mientras el tamaño del set sea menos al tamaño buscado
    while (set.size < numero) {
      const aleatorio = Math.floor(Math.random() * max);
      const p = array[aleatorio];
      // si es nuevo añadirlo
      if (!set.has(p)) {
        set.add(p);
        yield p;
      }
    }
  }



}

// exportar clase
export default VideoSystemView;