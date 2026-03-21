"use strict";

import { Book } from "../models/Book.js";
// crear objetos Book

// book1
const book1 = new Book(
  "978-84-9804-654-0",
  "El Quijote",
  "Miguel de Cervantes",
  "01/01/1605",
  20
);

// book2
const book2 = new Book(
  "978-84-08-29959-2",
  "Por si un día Volvemos",
  "Dueñas, Maria",
  "01/01/2025",
  25
);

// book3
const book3 = new Book(
  "978-84-0830-686-3",
  "El último secreto",
  "Dan Brown",
  "01/10/2025",
  24
);

// book4
const book4 = new Book(
  "978-19-8076-412-0",
  "El sustituto",
  "Blanca Miosi",
  "01/01/2018",
  20
);

const book5 = new Book(
  9780000000002,
  // el script maneja enteros y strings, no hay problema
  // siempre que sea un isbn valido
  "EL LOCO DE DIOS EN EL FIN DEL MUNDO",
  "Javier Cercas",
  "15/01/2025",
  22
);

const book6 = new Book(
  "978-00-0000-001-9",
  "COCINA PARA TODOS",
  "Karlos Arguiñano",
  "01/01/2000",
  33
);

const book7 = new Book(
  "978-00-0000-003-3",
  "El Profeta",
  "José María Zavala",
  "01/01/2025",
  20
);

const book8 = new Book(
  "978-00-0000-004-0",
  "Memorias",
  "Juan Carlos I",
  "01/01/2025",
  25
);

export { book1, book2, book3, book4, book5, book6, book7, book8 };
