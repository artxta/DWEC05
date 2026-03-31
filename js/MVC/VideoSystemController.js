"use strict";

class VideoSystemController {
  // propiedades privadas
  #MODEL;
  #VIEW;

  constructor(model, view) {
    this.#MODEL = model;
    this.#VIEW = view;
    // pintar las categorias al iniciar
    this.#VIEW.bindLoad(this.handleInit); // despues de cargar datos
    this.#VIEW.bindInit(this.handleInit);  // al pulsar el inicio o Logo

    this.#VIEW.bindShowFichaDirector(this.handleShowFichaDirector); // showFichaDirector - mostrar la ficha del director
    this.#VIEW.bindShowFichaActor(this.handleShowFichaActor); // showFichaActor - mostrar la ficha del actor
    this.#VIEW.bindGetProductionsInCategory(this.handleGetProductionsInCategory); // getProductionsInCategory - mostrar producciones de una categoria
    this.#VIEW.bindShowFichaProduction(this.handleShowFichaProduction); // showFichaProduction - mostrar ficha produccion

    // añadir evento del historial
    window.addEventListener("popstate", (event) => {
      this.handlePopstate(event);
    });

  }

  // manejadores handle

  // manejador despues de la carga, inicia el metodo onInit()
  handleInit = () => {
    this.onInit(this.#MODEL.categories, this.#MODEL.directors, this.#MODEL.actors, this.#MODEL.productions);
  }

  /**
   * Añade al historial
   * @param {*} objetoDatos 
   */
  addHistory = (objetoDatos) => {
    try {
      console.log(">Añadir a history: ");
      console.dir(objetoDatos);
      // evitar que al hacer click se vuelva a hacer pushstate
      if (history.state?.clave !== objetoDatos.clave) {

        history.pushState(objetoDatos, null);
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * atras/delante del historial
   * @param {*} event 
   */
  handlePopstate = (event) => {
    if (event.state) {
      console.log(">Restaurar history: ");
      console.dir(event.state);

      // variables
      const action = event.state.action;
      // buscar y devolver objeto por clave
      const director = event.state.clave;
      const actor = event.state.clave;
      const cat = event.state.clave;
      const produccion = event.state.clave;
      // nombre categoria
      const nombreCategoria = event.state.nombreCategoria;
      // Arrays
      const productions = event.state.productions;
      const actores = event.state.actores;
      const directores = event.state.directores;

      // acciones
      //  restaurar ver ficha Director
      if (action === 'showFichaDirector') {
        // busca y devuelve el objeto original director y el array productions
        for (const d of this.#MODEL.directors) {
          if (director === d.name) {
            this.#VIEW.showFichaDirector(d, productions);
          }
        }

        // restaurar ver ficha actor
      } else if (action === 'showFichaActor') {
        // busca y devuelve el objeto original actor y el array productions
        for (const a of this.#MODEL.actors) {
          if (actor === a.name) {
            // obtener producciones de ese actor
            productions = Array.from(this.#MODEL.getProductionsActor(a));
            // mostrarlo
            this.#VIEW.showFichaActor(a, productions);
          }
        }

        // restaurar ver producciones de categoria
      } else if (action === 'getProductionsInCategory') {
        // buscar esa categoria y devolverla desde el popstate
        for (const c of this.#MODEL.categories) {
          if (cat === c.name) {
            // devolver la categoria para verla
            console.dir(c);
            this.#VIEW.listProductions(this.#MODEL.getProductionsCategory(c), c.name);
          }
        }

        // restaurar ver ficha produccion
      } else if (action === 'showFichaProduction') {
        // buscar esa produccion y devolverla
        for (const p of this.#MODEL.productions) {
          if (produccion === p.title) {
            // devolver la producción para verla
            this.#VIEW.showFichaProduction(p, actores, directores);
          }
        }

      } else if (action === 'init') {
        this.onInit(this.#MODEL.categories, this.#MODEL.directors, this.#MODEL.actors, this.#MODEL.productions);
      }

    } else {
      // Si no hay estado, volver a la vista inicial
      this.onInit(this.#MODEL.categories, this.#MODEL.directors, this.#MODEL.actors, this.#MODEL.productions);
    }
  }

  /**
   * Mostrar ficha director
   * @param {*} keyDirector 
   * @returns 
   */
  handleShowFichaDirector = (keyDirector) => {
    try {
      let director;
      let productions;

      // buscar el director
      for (const d of this.#MODEL.directors) {
        const key = d.name + "_" + d.lastname1;
        if (key === keyDirector) {
          director = d;
        }
      }
      productions = Array.from(this.#MODEL.getProductionsDirector(director));
      // historial
      this.addHistory({
        action: 'showFichaDirector',
        clave: director.name,
        productions
      });
      // devolver datos
      return { director, productions }

    } catch (e) {
      console.error(e);
    }
  }


  /**
   * devuelve un objeto tipo {objActor, [producciones]}
   * @param {*} keyActor 
   */
  handleShowFichaActor = (keyActor) => {
    try {
      let actor;
      let productions;

      // buscar el actor
      for (const a of this.#MODEL.actors) {
        const key = a.name + "_" + a.lastname1;
        if (key === keyActor) {
          actor = a;
        }
      }

      productions = Array.from(this.#MODEL.getProductionsActor(actor));
      // historial
      this.addHistory({
        action: 'showFichaActor',
        clave: actor.name,

      });
      // devolver datos
      return { actor, productions };
    } catch (e) {
      console.error(e);
    }
  }


  /**
   * obtener las producciones de una categoria
   */
  handleGetProductionsInCategory = (nombreCategoria) => {
    // buscar la categoria con ese nombre
    for (const cat of this.#MODEL.categories) {
      if (cat.name === nombreCategoria) {
        // historial
        this.addHistory({
          action: 'getProductionsInCategory',
          clave: cat.name
        });
        // si lo ha encontrado devuelve las producciones
        return this.#MODEL.getProductionsCategory(cat);
      }
    }
    // si no lo ha encontrado devuelve un array vacio
    return [];
  }

  /**
   * del titulo de una producción devuelve un objeto literal con 
 * obj produccion,
 * array actores,
 * array directores
 */
  handleShowFichaProduction = (nombreProduction) => {
    try {

      // buscar el objeto entre las producciones
      let produccion;
      let actores = [];
      let directores = [];
      for (const pro of this.#MODEL.productions) {
        if (pro.title === nombreProduction) {
          produccion = pro;
        }
      }
      // actores - convertir a Array
      actores = Array.from(this.#MODEL.getCast(produccion));
      // directores no hay metodos para devolver directamente el director
      for (const dir of this.#MODEL.directors) {
        for (const pro of this.#MODEL.getProductionsDirector(dir)) {
          // añadir director
          if (pro.title === nombreProduction) directores.push(dir);
        }
      }
      // historial
      this.addHistory({
        action: 'showFichaProduction',
        clave: produccion.title,
        actores, directores
      });
      // devolver objeto
      return { produccion, actores, directores };

    } catch (e) {
      console.error(e);
    }
  }




  // metodos
  /**
   * crea la Vista inicial
  */
  onInit = (categories, directors, actors, productions) => {
    // obtener las categorias
    const cat = [...categories];
    const dir = [...directors];
    const act = [...actors];
    const pro = [...productions]
    this.#VIEW.init(cat, dir, act, pro);


  };

  /**
   * Carga los datos iniciales, los carga desde App, una vez al inicio
   * @param {*} datos 
   */
  onLoad = (datos) => {
    /*
  estructura de datos
   
  const datos = {
  users: [ {username: "",email: "",pass: ""},],
  categories: [
    {
      name: "",
      description: "",
      productions: [
        {
          title: "",
          fecha: new Date(),
          nac: "",
          synopsis: "",
          actores: [ { name: "", lastN: "", born: new Date() }, ],
          director: [ { name: "", lastN: "", born: new Date() },]
        }, 
      ]
    },
  ],
  };
  */
    try {

      const users = datos.users;
      const categories = datos.categories;
      // añadir usuarios
      for (const u of users) {
        this.#MODEL.addUser(this.#MODEL.createUser(u.username, u.email, u.pass));
      }

      // añadir categorias
      for (const cat of categories) {
        // crear y añadir categoria
        // crear
        const catCreada = this.#MODEL.createCategory(cat.name, cat.description);
        // guardar
        this.#MODEL.addCategory(catCreada);

        // añadir todas producciones de la categoria
        for (const pro of cat.productions) {

          // atributos que pueden o no pueden estar
          const nationality = pro.nac || "";
          const synopsis = pro.synopsis || "";
          const image = pro.image || "";
          const resources = pro.resources || [];
          const locations = pro.locations || [];
          const seasons = pro.seasons || 0;
          // crear
          const proCreada = this.#MODEL.createProduction(
            pro.title,
            pro.fecha,
            nationality,
            synopsis,
            image,
            resources,
            locations,
            seasons);
          // guardar
          this.#MODEL.addProduction(proCreada);
          // asignar la categoria actual la producción actual
          this.#MODEL.assignCategory(catCreada, proCreada);

          // crear y añadir todos los actores de cada produccion
          for (const act of pro.actores) {
            const actCreado = this.#MODEL.createPerson(act.name, act.lastN, act.born);
            this.#MODEL.addActor(actCreado);
            // assignar a este actor la producción actual
            this.#MODEL.assignActor(actCreado, proCreada);
          }
          // crear y añadir todos los directores de cada producción
          for (const dir of pro.director) {
            const dirCreado = this.#MODEL.createPerson(dir.name, dir.lastN, dir.born);
            this.#MODEL.addDirector(dirCreado);
            // assignar a este director la producción actual
            this.#MODEL.assignDirector(dirCreado, proCreada);
          }
        }
      }


      // función para test
      // function test(model) {

      //   // mostrar estructura de datos en console.log
      //   console.log("Mostrar usuario: ");
      //   console.dir(Array.from(model.users)[0]);


      //   console.log("Mostrar estructura: ");
      //   // obtener categorias
      //   for (const cat of model.categories) {
      //     const categorias = model.getProductionsCategory(cat);
      //     console.log("-Categoria: " + cat.name);
      //     console.log("  -Producciones: ");
      //     // obtener productions de cada categoria
      //     for (const pro of categorias) {
      //       console.log("    -" + pro.title);
      //       // obtener actores de cada categoria: 
      //       const actores = model.getCast(pro);
      //       console.log("      -Actores:");
      //       for (const actor of actores) {
      //         console.log("        -" + actor.name + " " + actor.lastname1);
      //       }
      //       // en Tarea 4 no hay metodo para devolver director teniendo Producción
      //       let varDirector;
      //       //  recorrer produciones de director
      //       for (const director of model.directors) {
      //         for (const proDirector of model.getProductionsDirector(director)) {
      //           if (proDirector.title === pro.title) varDirector = director;
      //         }
      //       }
      //       console.log("      -Director: " + varDirector.name + " " + varDirector.lastname1);
      //     }
      //   }
      // }
      // // ejecutar tests
      // // test(this.#MODEL);

    } catch (e) {
      console.error(e);
    }
  };

}


// exportar clase
export default VideoSystemController;