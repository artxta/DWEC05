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
  users: [{ nom: "", email: "", pass: "" },],
  categories: [{ nom: "", des: "" },],
  productions: [{ nom: "", fec: new Date(), nac: "", des: "" },],
  actors: [{ nom: "Kurt", lastN: "Russel", fec: new Date() },],
  directors: [ { nom: "", lastN: "", fec: new Date() }, ]
};
*/
  }

}


// exportar clase
export default VideoSystemController;