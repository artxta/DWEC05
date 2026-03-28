"use strict";

class VideoSystemView {


  constructor() {
    this.nav = document.getElementById("navID");
    this.main = document.getElementById("mainID");
    this.footer = document.getElementById("footerID");
  }
  // metodos

  /**
   * Carga de inicio
   * @param {*} categories 
   * @param {*} directors 
   * @param {*} actors 
   */
  init(categories, directors, actors, productions) {
    this.showMenu(categories, directors, actors, directors);
    this.showCategories(categories, directors, actors, productions);

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
    for (const cat of categories) {
      html += `<li><a class="dropdown-item category-link" title="${cat.description}" href="#">${cat.name}</a></li>`;
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
      html += `<li><a class="dropdown-item" href="#">${director.name + " " + director.lastname1}</a></li>`;
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
      html += `<li><a class="dropdown-item" href="#">${actor.name + " " + actor.lastname1}</a></li>`;

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
    for (const categoria of categories) {
      html += `
      <div class="col-6 mb-4">
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

    // generar Producciones aleatorias
    html = "";
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


  // evento de carga de la página ejecutar el init, para ver datos
  bindLoad(handler) {
    window.addEventListener("DOMContentLoaded", handler, { once: true });// ejecutar solo una vez
  }



  // delegar evento, aun no esta creado el id Inicio, pero el nav si
  bindInit(handler) {
    // delegar eventos
    this.nav.addEventListener("click", (event => {
      // busca en el nav el id inicio
      const inicio = event.target.closest("#inicio");
      if (!inicio) return; // si no existe continuar ejecución
      handler(); // ejecutar handler
    }));
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