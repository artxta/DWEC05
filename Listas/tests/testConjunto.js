"use strict";

// importar Listas
import {
  ObjectList,
  OrderedObjectList
} from "../models/List.js";

// importar objeto book
import { Book } from "../models/Book.js";

// importar objetos book
import {
  book1, book2, book3, book4, book5, book6, book7, book8
} from "./objetosBookTest.js";

(() => {

  console.log("create: crear conjunto");
  const listaConjunto = new OrderedObjectList(
    undefined, // tamaño por defecto Number.MAX_SAFE_INTEGER
    Book,
    // función de ordenamiento
    (a, b) => {
      // pasar a String
      let StringA = String(a.isbn);
      let StringB = String(b.isbn);
      // quitar lo que no sea un número del string
      StringA = StringA.replace(/\D/g, '');
      StringB = StringB.replace(/\D/g, '');

      // Convertir a numero
      let isbnA = parseInt(StringA);
      let isbnB = parseInt(StringB);

      // ordenar
      return isbnA - isbnB;
    },
    true // es un conjunto

  );

  // isEmpty
  console.log("isEmpty: \nisEmpty: " + listaConjunto.isEmpty);

  // size
  console.log("size:\nsize: " + listaConjunto.size);

  // add()
  console.log(
    "add(book1): tamaño ahora: " + listaConjunto.add(book1) + "\n" +
    "add(book2): tamaño ahora: " + listaConjunto.add(book2) + "\n"
  );

  // intentando meter un libro que ya se habia metido antes
  console.log(
    "Intentando meter un valor ya metido\nadd(book1): tamaño ahora: " +
    listaConjunto.add(book1)
  );


  // has()
  console.log(
    "has(book1): " + listaConjunto.has(book1) + "\n" +
    "has(book5): " + listaConjunto.has(book5));

  // toString()
  console.log("toString(): \n" +
    listaConjunto.toString()
  );

  // clear()
  console.log("clear(): tamaño lista ahora: " + (listaConjunto.clear() || "") +
    listaConjunto.size);

  // remove()
  console.log("remove(): \n" +
    listaConjunto.remove(book1)
  );
  console.log("Añadir un elemento:\n" +
    (listaConjunto.add(book7) && "") +
    listaConjunto.firstElement().title
  );
  console.log("Borrar elemento: \n" +
    "Elemento borrado: " + listaConjunto.remove(book7).title
  );
  console.log("");




})();