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

// Estructura de Datos de VideoSystem, tipo JSON


const datos = {
  users: [
    {
      username: "Elon_musk_332",
      email: "elon_musk@hotmail.com",
      pass: "m1lm1ll000nario123"
    },
  ],

  categories: [
    {
      // Terror
      name: "Terror",
      description: "Peliculas que dan miedo.",
      productions: [
        {
          // La cosa
          title: "La Cosa",
          fecha: new Date(1982, 5, 25),
          nac: "EEUU",
          synopsis: "Extraterrestres parasitos que cambiar de forma",
          actores: [
            // La cosa
            { name: "Kurt", lastN: "Russel", born: new Date(1962, 5, 25) },
            { name: "Wilford", lastN: "Brimley", born: new Date(1960, 3, 3) },
          ],
          director: [
            // La cosa
            { name: "John", lastN: "Carpenter", born: new Date(1950, 4, 3) },
          ]
        },

        {
          // La mosca
          title: "La Mosca",
          fecha: new Date(1986, 1, 1),
          nac: "EEUU",
          synopsis: "Un cientifico se utiliza como cobaya y se convierte en mosca",
          actores: [
            // La mosca
            { name: "Jeff", lastN: "Goldblum", born: new Date(1950, 2, 2) },
            { name: "Geena", lastN: "Davis", born: new Date(1950, 3, 2) },
          ],
          director: [
            // La mosca
            { name: "David", lastN: "Cronenberg", born: new Date(1939, 3, 4) },
          ]
        },
        {
          // Coraline
          title: "Coraline",
          fecha: new Date(2009, 1, 6),
          nac: "CANADA",
          synopsis: "Pelicula de fantasia oscura",
          actores: [
            // Coraline
            { name: "Dakota", lastN: "Fanning", born: new Date(1969) },
            { name: "Teri", lastN: "Hatcher", born: new Date(1980) },
          ],
          director: [
            // Coraline
            { name: "Henry", lastN: "Selick", born: new Date(1939) },
          ]
        },
        {
          // Bitelchús
          title: "Bitelchús",
          fecha: new Date(1988, 2, 1),
          nac: "EEUU",
          synopsis: "Un matrimonio de fantasmas contrata a bitelchus",
          actores: [
            // Bitelchus
            { name: "Michael", lastN: "Keaton", born: new Date(1949, 3, 4) },
            { name: "Winona", lastN: "Ryder", born: new Date(1980, 4, 2) },
          ],
          director: [
            // bitelchus
            { name: "Tim", lastN: "Burton", born: new Date(1958, 8, 25) },
          ]
        },

      ]
    },
    {
      // Comedia
      name: "Comedia",
      description: "Peliculas que dan risa.",
      productions: [
        // Comedia
        {
          // Dos tontos muy tontos
          title: "Los Simpsons",
          fecha: new Date(1989, 1, 1),
          nac: "EEUU",
          synopsis: "Una familia de dibuos muy divertida",
          image: "",
          resources: [],
          locations: [],
          seasons: 40,
          actores: [
            // Dos tontos muy tontos
            { name: "Jim", lastN: "Carrey", born: new Date(1962, 0, 17) },
            { name: "Jeff", lastN: "Daniels", born: new Date(1960, 2, 3) },
          ],
          director: [
            // Dos tontos muy tontos
            { name: "Mat", lastN: "Groening", born: new Date(1949, 2, 3) },
          ]
        },
        {
          // Algo pasa con Mary
          title: "Algo pasa con Mary",
          fecha: new Date(1998, 3, 1),
          nac: "EEUU",
          synopsis: "Ted desdea a la chica a la que todos desean",
          actores: [
            // Algo pasa con mary
            { name: "Cameron", lastN: "Diaz", born: new Date(1972, 8, 30) },
            { name: "Ben", lastN: "Stiller", born: new Date(1970, 1, 1) },
          ],
          director: [
            // Algo pasa con mary
            { name: "Peter", lastN: "Farrelly", born: new Date(1949, 2, 3) }, // repetido
          ]
        },
        {
          // Ave Ventura
          title: "Ace Ventura",
          fecha: new Date(1994, 1, 1),
          nac: "EEUU",
          synopsis: "Ace Ventura detective de mascotas",
          actores: [
            // Ace ventura
            { name: "Jim", lastN: "Carrey", born: new Date(1962, 0, 17) }, // repetido
            { name: "Sean", lastN: "Young", born: new Date(1933) },
          ],
          director: [
            // Ace Ventura
            { name: "Tom", lastN: "Shadyac", born: new Date(1960, 1, 1) },
          ]
        },
        {
          // Al diablo con el diablo
          title: "Al diablo con el diablo",
          fecha: new Date(2000, 1, 1),
          nac: "EEUU",
          synopsis: "Un joven se enamora de su compañera y vende su alma para conquistarla",
          actores: [
            // Al diablo con el diablo
            { name: "Brendan", lastN: "Fraser", born: new Date(1939, 2, 2) },
            { name: "Elizabeth", lastN: "Hurley", born: new Date(1970) },
          ],
          director: [
            // Al diablo con el diablo
            { name: "Harold", lastN: "Ramis", born: new Date(1939, 1, 1) },
          ]
        },
      ]
    },
    {
      name: "Ciencia Ficción",
      description: "Pelicula que imagina futuros diferentes.",
      productions: [
        // Ciencia Ficción
        {
          // Pactor con el Diablo
          title: "Pactar con el Diablo",
          fecha: new Date(1997, 1, 1),
          nac: "EEUU",
          synopsis: "Un abogado muy bueno es contratado por el diablo",
          actores: [
            // Pactar con el diablo
            { name: "Keanu", lastN: "Reeves", born: new Date(1964, 8, 2) },
            { name: "Al", lastN: "Pacino", born: new Date(1939, 3, 3) },
          ],
          director: [
            // Pactar con el diablo
            { name: "Taylor", lastN: "Hackford", born: new Date(1939, 2, 2) },
          ]

        },
        {
          // Matrix
          title: "Matrix",
          fecha: new Date(1999, 11, 31),
          nac: "EEUU",
          synopsis: "El futuro tras una guerra con las maquinas",
          actores: [
            // Matrix
            { name: "Keanu", lastN: "Reeves", born: new Date(1964, 8, 2) },
            { name: "Laurence", lastN: "Fishburne", born: new Date(1950, 2, 2) },
          ],
          director: [
            // Matrix
            { name: "Hermanas", lastN: "Wachowski", born: new Date(1959, 1, 1) },
          ]

        },
        {
          // The Terminator
          title: "The Terminator",
          fecha: new Date(1984, 1, 1),
          nac: "EEUU",
          synopsis: "Un robot va buscando a Sara Conor toda la pelicula",
          actores: [
            // Terminator
            { name: "Arnold", lastN: "Schwarzenegger", born: new Date(1969, 2, 2) },
            { name: "Linda", lastN: "Hamilton", born: new Date(1970, 2, 2) },
          ],
          director: [
            // the terminator
            { name: "James", lastN: "Cameron", born: new Date(1970, 3, 3) },
          ]
        },
        {
          // Desafio Total
          title: "Desafio Total",
          fecha: new Date(1990, 1, 1),
          nac: "EEUU",
          synopsis: "Un Espia que no sabe que lo es viaja a Marte",
          actores: [
            // Desafio Total
            { name: "Arnold", lastN: "Schwarzenegger", born: new Date(1969, 2, 2) },
            { name: "Rachel", lastN: "Ticotin", born: new Date(1970, 1, 1) },
          ],
          director: [
            // Desafio Total
            { name: "Paul", lastN: "Verhoeven", born: new Date(1990, 1, 1) },
          ]
        },
      ]
    },
  ],
};

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

// Carga de datos inicial

VideoSystemApp.onLoad(datos);





// exportar class
export default VideoSystemApp;