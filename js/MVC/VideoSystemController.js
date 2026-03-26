"use strict";

class VideoSystemController {
  // propiedades privadas
  #MODEL;
  #VIEW;

  constructor(model, view) {
    this.#MODEL = model;
    this.#VIEW = view;

  }

  // metodos


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
          // crear
          const proCreada = this.#MODEL.createProduction(pro.title, pro.fecha, pro.nac, pro.synopsis);
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



      // mostrar datos en console.log
      console.log("Mostrar categories: ");
      for (const a of this.#MODEL.categories) console.log(a);



    } catch (e) {
      console.error(e);
    }
  }

}


// exportar clase
export default VideoSystemController;