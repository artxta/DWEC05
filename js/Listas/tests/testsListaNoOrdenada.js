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




(function testListas() {



  // crear lista de 5 elementos, de tipos Book
  const listaNoOrdenada = new ObjectList(5, Book);
  console.log("Lista No ordenada creada: ");
  console.dir(listaNoOrdenada);

  // propiedad isEmpty
  console.log(`-isEmpty: ${listaNoOrdenada.isEmpty}`);

  // propiedad isFull
  console.log(`-isFull: ${listaNoOrdenada.isFull}`);

  // propiedad size
  console.log(`-size: ${listaNoOrdenada.size}`);

  // añadir elemento add()
  console.log(`-añadir elemento: add(book1) tamaño actual ${listaNoOrdenada.add(book1)}`);
  // probar error
  console.log("probar objeto invalido: ");
  try {
    console.log(`añadir elemento no libro: add(algo): ${listaNoOrdenada.add("algo")}`);

  } catch (error) {
    console.error(error);
  }
  // añadir elemento con addAt()
  console.log(`-añadir elemento: addAt(book2,1) tamaño actual ${listaNoOrdenada.addAt(book2, 1)}`);

  // get(index)
  console.log("-get(1): ");
  console.log(listaNoOrdenada.get(1));
  // get fuera de limites
  console.log("get(99) fuera de límites excepcion:");
  try {
    console.log(listaNoOrdenada.get(99));
  } catch (error) {
    console.error(error);
  }

  // toString()
  console.log("-toString():");
  console.log(listaNoOrdenada.toString());

  // indexOf(elemento, atributoComparación)
  console.log("-indexOf(book1): valor esperado: 0: => " + listaNoOrdenada.indexOf(book1, "isbn"));
  console.log("indexOf(book2): valor esperado: 1: => " + listaNoOrdenada.indexOf(book2, "isbn"));
  console.log("indexOf(book3): valor esperado: -1: => " + listaNoOrdenada.indexOf(book3, "isbn"));

  // lastIndexOf(elemento, atributoComparación)
  console.log("-lastIndexOf(book1): valor esperado: 0 => " + listaNoOrdenada.lastIndexOf(book1, "isbn"));
  console.log("lastIndexOf(book2): valor esperado: 1 => " + listaNoOrdenada.lastIndexOf(book2, "isbn"));
  console.log("lastIndexOf(book3): valor esperado: -1 => " + listaNoOrdenada.lastIndexOf(book3, "isbn"));

  // capacity
  console.log("-propiedad capacity: " + listaNoOrdenada.capacity);

  // clear()
  console.log("-clear(): vaciar la lista");
  listaNoOrdenada.clear();
  console.log("tamaño de la lista ahora: " + listaNoOrdenada.size);

  // firstElement()
  console.log("-firstElement() devuelve el primero elemento de la lista");
  try {
    console.log(listaNoOrdenada.firstElement());
  } catch (error) {
    console.error(error);
  }
  console.log("añadir book3");
  // añadir elemento book3
  listaNoOrdenada.add(book3);
  console.log("firstElement(): ");
  console.log(listaNoOrdenada.firstElement());

  // lastElement()
  console.log("añadir book4 (como ultimo elemento)");
  listaNoOrdenada.add(book4);
  console.log("-lastElement(): ");
  console.log(listaNoOrdenada.lastElement());

  // remove()
  console.log("remove(0): Book eliminado: " + listaNoOrdenada.remove(0).title);

  // console.log(listaNoOrdenada.toString());

  // removeElement()
  console.log("removeElement(book4): book eliminado: " + listaNoOrdenada.removeElement(book4));

  // añadir book5
  listaNoOrdenada.add(book5);
  console.log("añadir book5: " + listaNoOrdenada.get(listaNoOrdenada.indexOf(book5)).title);
  console.log("book5 posición indice: " + listaNoOrdenada.indexOf(book5));

  // set() sustituir elemento
  console.log("sustituir book5 por book6");
  listaNoOrdenada.set(book6, listaNoOrdenada.get(listaNoOrdenada.indexOf(book5)));
  console.log("elemento ahora en posición 0: " + listaNoOrdenada.get(0).title);

})();



