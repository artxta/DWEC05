"use strict";

/* 

- La lista está llena
- La lista está vacía
- El índice está fuera de los límites de la lista

- El elemento no es un Book
*/

// clase base de las excepciones
class BaseException extends Error {
  constructor(message = "", fileName, lineNumber) {
    // llamar al superconstrucor 
    super(message, fileName, lineNumber);
    this.name = "BaseName";
    if (Error.captureStackTree) {
      Error.captureStackTree(this, BaseException);
    }
  }
}

// excepción argumento no valido
class InvalidParamException extends BaseException {
  constructor(param, fileName, lineNumber) {
    super(`Error: el parametro: ${param} no es valido`, fileName, lineNumber);
    this.name = "InvalidParamException";
  }
}

// class no se ha usado new para crear el objeto
class InvalidAccessConstructorException extends BaseException {
  constructor(fileName, lineNumber) {
    super("Error: no as usado new para llamar al constructor de la clase ",
      fileName, lineNumber);
    this.name = "InvalidAccessContructorException";
  }
}

// excepción - La lista está llena
class FullListException extends BaseException {
  constructor(tamanio, filename, lineNumber) {
    super("Error: La lista está llena ha superado el límite de "
      + tamanio + " elementos.", filename, lineNumber);
    this.name = "FullList";
    this.tamanio = tamanio;
  }
}

// excepción - La lista está vacia
class EmptyListException extends BaseException {
  constructor(fileName, lineNumber) {
    super("Error: La lista está vacia", fileName, lineNumber);
    this.name = "EmptyList";
  }
}

// excepción - El índice está fuera de los límites de la lista
class OutOfRangeException extends BaseException {
  constructor(fileName, lineNumber) {
    super("Error: El índice está fuera de los límites de la lista");
    this.name = "OutOfRange";
  }
}

// excepción - El elemento no es un Book
class TypeNoValidoException extends BaseException {
  constructor(tipo, fileName, lineNumber) {
    super(`Error: el tipo de objeto no es válido: ${tipo}`,
      fileName, lineNumber);
    this.name = "TypeNoValido";
  }
}

// excepción - La clase tiene que ser Abstracta
class AbstractClassException extends BaseException {
  constructor(clase, fileName, lineNumber) {
    super(`La clase ${clase} es Abstracta y no se puede instancias`, fileName, lineNumber);
    this.name = "AbstractClassException";
  }
}


// exportar las clases
export {
  BaseException,
  InvalidAccessConstructorException,
  FullListException,
  EmptyListException,
  OutOfRangeException,
  TypeNoValidoException,
  InvalidParamException,
  AbstractClassException
};