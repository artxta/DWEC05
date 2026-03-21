"use strict";
// importar excepciones
import {
  InvalidAccessConstructorException,
  FullListException,
  EmptyListException,
  OutOfRangeException,
  TypeNoValidoException,
  InvalidParamException,
  AbstractClassException

} from "../errors/exceptions.js";


// clase Book
class Book {
  // atributos
  #isbn;
  #title;
  #author;
  #publicationDate;
  #price;


  // fecha como string "DD/MM/AAAA"
  constructor(isbn, title, author, publicationDate, price) {
    // se invoca con el operador new
    if (!new.target) {
      throw new InvalidAccessConstructorException;
    }
    // comprobar los parametros
    if (!isbn) throw new InvalidParamException("ISBN");
    // comprobar isbn
    if (!this.#isISBN(isbn)) {
      throw new InvalidParamException("ISBN");
    }
    if (!title) throw new InvalidParamException("title");
    if (!author) throw new InvalidParamException("author");
    // validar fecha
    if (!publicationDate) throw new InvalidParamException("publicationDate");
    const regexFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regexFecha.test(publicationDate)) {
      throw new InvalidParamException("publicationDate");

    }
    // definir las variables de fecha
    const [day, month, year] = publicationDate.split("/").map(Number);

    price = Number.parseFloat(price);
    if (!price || price <= 0) throw new InvalidParamException("price");

    // definir propiedades
    this.#isbn = isbn;
    this.#title = title;
    this.#author = author;
    this.#publicationDate = new Date(year, month - 1, day);
    this.#price = price;

    this.name = "Book";

    // getters y setters
    // isbn
    Object.defineProperty(this, "isbn", {
      enumerable: true,
      get() {
        return this.#isbn;
      },
      set(valor) {
        // comprobar entrada
        if (!valor) throw new InvalidParamException("isbn");
        if (!this.#isISBN(valor)) {
          throw new InvalidParamException("ISBN");
        }
        this.#isbn = valor;
      }
    });

    // title
    Object.defineProperty(this, "title", {
      enumerable: true,
      get() {
        return this.#title;
      },
      set(valor) {
        if (!valor) throw new InvalidParamException("title");
        this.#title = valor;
      }
    });

    // author
    Object.defineProperty(this, "author", {
      enumerable: true,
      get() {
        return this.#author;
      },
      set(valor) {
        if (!valor) throw new InvalidParamException("author");
        this.#author = valor;
      }
    });

    // publicationDate
    Object.defineProperty(this, "publicationDate", {
      enumerable: true,
      get() {
        return this.#publicationDate;
      },
      set(valor) {
        // validar fecha
        if (!valor) throw new InvalidParamException("publicationDate");
        const regexFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!regexFecha.test(valor)) {
          throw new InvalidParamException("publicationDate");
        }
        const [day, month, year] = valor.split("/").map(Number);
        this.#publicationDate = new Date(day, month - 1, year);
      }
    });

    // price
    Object.defineProperty(this, "price", {
      enumerable: true,
      get() {
        return this.#price;
      },
      set(valor) {
        const price = Number.parseFloat(valor);
        if (!price || price <= 0) throw new InvalidParamException("price");
        this.#price = price;
      }
    });

  }

  // comprobar si es un libro correcto
  // metodo privado
  #isISBN(elISBN) {

    const ISBN_REGEX = /^97[89]\d{10}$/;
    // comprobar el isbn 
    // convertir a String el isbn
    const isbnLibro = String(elISBN);
    // borra guiones y espacios, lo que no sea un número lo borra
    const sinEspacios = isbnLibro.replace(/\D/g, "");

    // si después de quitar espacio no cumple con el formato no es un libro
    if (!ISBN_REGEX.test(sinEspacios)) return false;

    // calcular digito de control los 12 primeros numeros
    let suma = 0;
    for (let i = 0; i < 12; i++) {
      const digito = parseInt(sinEspacios[i]);
      // se va sumando, si la posición del digito es par, se suma el digito, 
      // si la posición es impar se suma el digito multiplicado por 3
      suma += (i % 2 === 0) ? digito : digito * 3;
    }

    // (se resta a 10 (el resto entre dividir entre la sumaTotal y 10 )) y el resto de dividir eso entre 10 
    // es el número de control
    const numeroControlCalculado = (10 - (suma % 10)) % 10;
    const numeroControlLibro = parseInt(sinEspacios[12]);

    return numeroControlCalculado === numeroControlLibro;

  }
}

export { Book };