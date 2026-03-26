"use strict";

// importar MVC
import {
  VideoSystem,
  Category,
  Coordinate,
  Movie,
  Person,
  Production,
  Resource,
  Serie,
  User

} from "./MVC/modelo/VideoSystem/entities/VideoSystem.js";


import VideoSystemView from "./MVC/VideoSystemView.js";
import VideoSystemController from "./MVC/VideoSystemController.js";

// crear instancia App
const vs = VideoSystem.getInstance();
const VideoSystemApp = new VideoSystemController(
  // crear instancia Singleton del modelo
  vs,
  // crear instancia de la Vista
  new VideoSystemView()
);

// Estructura de Datos de VideoSystem


const datos = {
  users: [
    { nom: "Elon_musk_332", email: "elon_musk@hotmail.com", pass: "m1lm1ll000nario123" },
  ],
  categories: [
    { nom: "Terror", des: "Peliculas que dan miedo." },
    { nom: "Comedia", des: "Peliculas que dan risa." },
    { nom: "Ciencia Ficción", des: "Pelicula que imagina futuros diferentes." }
  ],
  productions: [
    // Terror
    { nom: "La Cosa", fec: new Date(1982, 5, 25), nac: "EEUU", des: "Extraterrestres parasitos que cambiar de forma" },
    { nom: "La Mosca", fec: new Date(1986, 1, 1), nac: "EEUU", des: "Un cientifico se utiliza como cobaya y se convierte en mosca" },
    { nom: "Coraline", fec: new Date(2009, 1, 6), nac: "CANADA", des: "Pelicula de fantasia oscura" },
    { nom: "Bitelchús", fec: new Date(1988, 2, 1), nac: "EEUU", des: "Un matrimonio de fantasmas contrata a bitelchus" },
    // Comedia
    { nom: "Dos Tontos muy Tontos", fec: new Date(1994, 1, 1), nac: "EEUU", des: "Una pareja de tontos que hacen tonterias" },
    { nom: "Algo pasa con Mary", fec: new Date(1998, 3, 1), nac: "EEUU", des: "Ted desdea a la chica a la que todos desean" },
    { nom: "Ace Ventura", fec: new Date(1994, 1, 1), nac: "EEUU", des: "Ace Ventura detective de mascotas" },
    { nom: "Al diablo con el diablo", fec: new Date(2000, 1, 1), nac: "EEUU", des: "Un joven se enamora de su compañera y vende su alma para conquistarla" },
    // Ciencia Ficción
    { nom: "Pactar con el Diablo", fec: new Date(1997, 1, 1), nac: "EEUU", des: "Un abogado muy bueno es contratado por el diablo" },
    { nom: "Matrix", fec: new Date(1999, 11, 31), nac: "EEUU", des: "El futuro tras una guerra con las maquinas" },
    { nom: "Terminator", fec: new Date(1984, 1, 1), nac: "EEUU", des: "Un robot va buscando a Sara Conor toda la pelicula" },
    { nom: "Desafio Total", fec: new Date(1990, 1, 1), nac: "EEUU", des: "Un Espia que no sabe que lo es viaja a Marte" },

  ],
  actors: [
    // La cosa
    { nom: "Kurt", lastN: "Russel", fec: new Date(1962, 5, 25) },
    { nom: "Wilford", lastN: "Brimley", fec: new Date(1960, 3, 3) },
    // la Mosca
    { nom: "Jeff", lastN: "Goldblum", fec: new Date(1950, 2, 2) },
    { nom: "Geena", lastN: "Davis", fec: new Date(1950, 3, 2) },
    // Coraline
    { nom: "Dakota", lastN: "Fanning", fec: new Date(1969) },
    { nom: "Teri", lastN: "Hatcher", fec: new Date(1980) },
    // Bitelchus
    { nom: "Michael", lastN: "Keaton", fec: new Date(1949, 3, 4) },
    { nom: "Winona", lastN: "Ryder", fec: new Date(1980, 4, 2) },
    // Dos tontos muy tontos
    { nom: "Jim", lastN: "Carrey", fec: new Date(1962, 0, 17) },
    { nom: "Jeff", lastN: "Daniels", fec: new Date(1960, 2, 3) },
    // Algo pasa con mary
    { nom: "Cameron", lastN: "Diaz", fec: new Date(1972, 8, 30) },
    { nom: "Ben", lastN: "Stiller", fec: new Date(1970, 1, 1) },
    // Ace ventura
    { nom: "Jim", lastN: "Carrey", fec: new Date(1962, 0, 17) }, // repetido
    { nom: "Sean", lastN: "Young", fec: new Date(1933) },
    // Al diablo con el diablo
    { nom: "Brendan", lastN: "Fraser", fec: new Date(1939, 2, 2) },
    { nom: "Elizabeth", lastN: "Hurley", fec: new Date(1970) },
    // Pactar con el diablo
    { nom: "Keanu", lastN: "Reeves", fec: new Date(1964, 8, 2) },
    { nom: "Al", lastN: "Pacino", fec: new Date(1939, 3, 3) },
    // Matrix
    { nom: "Keanu", lastN: "Reeves", fec: new Date(1964, 8, 2) },
    { nom: "Laurence", lastN: "Fishburne", fec: new Date(1950, 2, 2) },
    // Terminator
    { nom: "Arnold", lastN: "Schwarzenegger", fec: new Date(1969, 2, 2) },
    { nom: "Linda", lastN: "Hamilton", fec: new Date(1970, 2, 2) },
    // Desafio Total
    { nom: "Arnold", lastN: "Schwarzenegger", fec: new Date(1969, 2, 2) },
    { nom: "Rachel", lastN: "Ticotin", fec: new Date(1970, 1, 1) },
  ],
  directors: [
    // la cosa
    { nom: "John", lastN: "Carpenter", fec: new Date(1950, 4, 3) },
    // La mosca
    { nom: "David", lastN: "Cronenberg", fec: new Date(1939, 3, 4) },
    // Coraline
    { nom: "Henry", lastN: "Selick", fec: new Date(1939) },
    // bitelchus
    { nom: "Tim", lastN: "Burton", fec: new Date(1958, 8, 25) },
    // Dos tontos muy tontos
    { nom: "Peter", last: "Farrelly", fec: new Date(1949, 2, 3) },
    // Algo pasa con mary
    { nom: "Peter", last: "Farrelly", fec: new Date(1949, 2, 3) }, // repetido
    // Ace Ventura
    { nom: "Tom", lastN: "Shadyac", fec: new Date(1960, 1, 1) },
    // Al diablo con el diablo
    { nom: "Harold", lastN: "Ramis", fec: new Date(1939, 1, 1) },
    // Pactar con el diablo
    { nom: "Taylor", lastN: "Hackford", fec: new Date(1939, 2, 2) },
    // Matrix
    { nom: "Hermanas", lastN: "Wachowski", fec: new Date(1959, 1, 1) },
    // the terminator
    { nom: "James", lastN: "Cameron", fec: new Date(1970, 3, 3) },
    // Desafio Total
    { nom: "Paul", lastN: "Verhoeven", fec: new Date(1990, 1, 1) },
  ]
};


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





// exportar class
export default VideoSystemApp;