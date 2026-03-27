"use strict";

class VideoSystemView {


  constructor() {
    this.nav = document.getElementById("navID");
    this.main = document.getElementById("mainID");
    this.footer = document.getElementById("footerID");
  }
  // metodos

  /**
   * carga de página al inicio
   * @param {*} categories 
   * @param {*} directors 
   */
  init(categories, directors, actors) {
    // mostrar menú
    this.showMenu(categories, directors, actors);
    // ver zona central Categorias
    this.showCategories(categories);

  };



  // metodos de la vista , bind conectar eventos con handle
  bindInit(handler) {
    const inicio = document.getElementById("inicio");
    // si no encuantra el elemento no crea el evento
    if (!inicio) {
      console.warn("bindInit: elemento #inicio no encontrado")
      return;
    }

    inicio.addEventListener("click", (event) => {
      if (event.target.closest("#inicio")) {
        event.preventDefault();
        handler();
      }
    });
  }

  showMenu(categories, directors, actors) {
    let html = "";
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
   * dibujar las categorias
   * @param {*} categories 
   */
  showCategories(categories) {
    // dibujar el menu
    let html = "";

    // Borrar lo que habia antes 
    this.main.replaceChildren();

    // Mostrar categorias en el centro
    html = "";
    html = `
    <div class="container">
    <h3 class="mb-2">Categorías:</h3>
    <div class="row justify-content-center">
    `;
    // limpiar mensajes anteriores
    console.clear();
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
  }

}

// exportar clase
export default VideoSystemView;