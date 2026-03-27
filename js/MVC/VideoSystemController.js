"use strict";

class VideoSystemController {
  // propiedades privadas
  #MODEL;
  #VIEW;

  constructor(model, view) {
    this.#MODEL = model;
    this.#VIEW = view;


  }
  // manejadores handle
  handleInit = () => {
    this.onInit([...this.#MODEL.categories], [...this.#MODEL.directors], [...this.#MODEL.actors]);
  }


  // metodos




  /**
   * crea la Vista inicial
   */
  onInit = (categories, directors, actors) => {
    // obtener las categorias
    const cat = [...categories];
    const dir = [...directors];
    const act = [...actors];
    this.#VIEW.init(cat, dir, act);
    this.#VIEW.bindInit(this.handleInit);

  };

  /**
   * Carga los datos iniciales, los carga desde App, justo al inicio
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

      // pintar las categorias al iniciar
      this.onInit([...this.#MODEL.categories], [...this.#MODEL.directors], [...this.#MODEL.actors]);


      // función para test
      function test(model) {

        // mostrar estructura de datos en console.log
        console.log("Mostrar usuario: ");
        console.dir(Array.from(model.users)[0]);


        console.log("Mostrar estructura: ");
        // obtener categorias
        for (const cat of model.categories) {
          const categorias = model.getProductionsCategory(cat);
          console.log("-Categoria: " + cat.name);
          console.log("  -Producciones: ");
          // obtener productions de cada categoria
          for (const pro of categorias) {
            console.log("    -" + pro.title);
            // obtener actores de cada categoria: 
            const actores = model.getCast(pro);
            console.log("      -Actores:");
            for (const actor of actores) {
              console.log("        -" + actor.name + " " + actor.lastname1);
            }
            // en Tarea 4 no hay metodo para devolver director teniendo Producción
            let varDirector;
            //  recorrer produciones de director
            for (const director of model.directors) {
              for (const proDirector of model.getProductionsDirector(director)) {
                if (proDirector.title === pro.title) varDirector = director;
              }
            }
            console.log("      -Director: " + varDirector.name + " " + varDirector.lastname1);
          }
        }
      }
      // ejecutar tests
      // test(this.#MODEL);

    } catch (e) {
      console.error(e);
    }
  };

}


// exportar clase
export default VideoSystemController;