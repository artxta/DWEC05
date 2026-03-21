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

  console.log("create: crear listaOrdenada");
  const listaOrdenada = new OrderedObjectList(5, Book,

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
    });

  // isEmpty
  console.log("isEmpty: " + listaOrdenada.isEmpty);

  // isFull
  console.log("isFull: " + listaOrdenada.isFull);

  // size
  console.log("size: " + listaOrdenada.size);

  // add()
  console.log(
    "add(book2) tamaño lista: " + listaOrdenada.add(book2) + "\n" +
    "add(book3) tamaño lista: " + listaOrdenada.add(book3) + "\n" +
    "add(book8) tamaño lista: " + listaOrdenada.add(book8));

  // get()
  console.log("get(2): elemento: " + listaOrdenada.get(2).title);

  // toString()
  console.log("toString(): \n" + listaOrdenada.toString());

  // indexOf() 
  try {

    console.log(
      "indexOf(): \n" +
      "indexOf(book2, \"isbn\") : index: " + listaOrdenada.indexOf(book2, "isbn") + "\n" +
      "indexOf(book3, \"isbn\") : index: " + listaOrdenada.indexOf(book3, "isbn") + "\n" +
      "indexOf(book8, \"isbn\") : index: " + listaOrdenada.indexOf(book8, "isbn") + "\n"
      + "No metido en la lista indexOf(book1, \"isbn\"): index: " + listaOrdenada.indexOf(book1, "isbn")
    );
  } catch (error) {
    console.error(error);
  }

  // lastIndexOf()
  console.log("lastIndexOf(): \n" +
    "lastIndexOf(book2,\"isbn\") posición: " + listaOrdenada.lastIndexOf(book2, "isbn") + "\n" +
    "lastIndexOf(book3,\"isbn\") posición: " + listaOrdenada.lastIndexOf(book3, "isbn") + "\n" +
    "lastIndexOf(book8,\"isbn\") posición: " + listaOrdenada.lastIndexOf(book8, "isbn")
  );

  // capacity
  console.log("capacity: " + listaOrdenada.capacity);

  // clear()
  console.log(
    "clear() \n" +
    "tamaño de la lista despues de borrar: " + (listaOrdenada.clear() || "") + listaOrdenada.size
  );

  // firstElement()
  console.log("firstElement()\n");
  try {

    console.log("firstElement()\nfirstElement(): " + listaOrdenada.firstElement());
  } catch (error) {
    console.error(error);
  }
  listaOrdenada.add(book1);
  listaOrdenada.add(book2);
  listaOrdenada.add(book3);
  console.log(
    // añadir elemento book1 y despues book2
    "Añadir elemento add(book1): " +
    listaOrdenada.get(listaOrdenada.indexOf(book1)).title +
    ", ISBN: " + listaOrdenada.get(listaOrdenada.indexOf(book1)).isbn + "\n" +

    "Añadir elemento add(book2): " +
    listaOrdenada.get(listaOrdenada.indexOf(book2)).title +
    ", ISBN: " + listaOrdenada.get(listaOrdenada.indexOf(book2)).isbn + "\n" +

    "Añadir elemento add(book3): " +
    listaOrdenada.get(listaOrdenada.indexOf(book3)).title +
    ", ISBN: " + listaOrdenada.get(listaOrdenada.indexOf(book3)).isbn

  );
  // al pedir el primer elemento devuelve ordenado por ISBN el primero
  console.log("firstElement(): \n " + listaOrdenada.firstElement().title);

  // lastElement()
  console.log("lastElement(): \n " + listaOrdenada.lastElement().title);

  // remove()
  console.log("remove():\nremove(0): elemento Borrado: " + listaOrdenada.remove(0).title);

  // removeElement()
  console.log("removeElement(book3):\n      se ha borrado?: " + listaOrdenada.removeElement(book3));


  


})();