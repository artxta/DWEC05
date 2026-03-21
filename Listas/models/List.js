"use strict";

// importar excepciones
import {
  BaseException,
  InvalidAccessConstructorException,
  FullListException,
  EmptyListException,
  OutOfRangeException,
  TypeNoValidoException,
  InvalidParamException,
  AbstractClassException
} from '../errors/exceptions.js';
import { Book } from './Book.js';

// objeto WeakMap fuera de las clases
const _listaPrivada = new WeakMap();

// clase abstracta para crear una lista que tendra todos los objetos 
class List {
  // atributos privados
  #capacity;

  // #listaArray = []; => lo he sustituido por un WeapMap compartido en el construcor


  // constructor
  constructor(tamanioMaximo = 5) {
    // verificar operador new
    if (!new.target) throw new InvalidAccessConstructorException();
    // Esta clase es abstracta
    if (new.target === List) throw new AbstractClassException("List");
    // comprobar que el número de tamanioMaximo sea un número
    if (!/^\d+$/.test(String(tamanioMaximo)) || tamanioMaximo <= 0) {
      throw new InvalidParamException(tamanioMaximo);
    }

    this.#capacity = tamanioMaximo;

    // crear lista privada desde WeakMap
    _listaPrivada.set(this, []);

    // propiedades publicas: : isEmpty, isFull, size,  capacity, 

    /**
     * devuelve si la lista está vacia
     */
    Object.defineProperty(this, "isEmpty", {
      enumerable: true,
      get() {
        return (_listaPrivada.get(this).length === 0);
      },
      set(x) {
        throw new InvalidParamException(x);
      }
    });

    /**
     * devuelve si la lista esta llena
     */
    Object.defineProperty(this, "isFull", {
      enumerable: true,
      get() {
        return (_listaPrivada.get(this).length === this.#capacity);
      },
      set(x) {
        throw new InvalidParamException(x);
      }
    });



    /**
     * devuelve el número de elementos de la lista
     */
    Object.defineProperty(this, 'size', {
      enumerable: true,
      get() {
        return _listaPrivada.get(this).length;
      },
      // no se modifica
      set(x) {
        throw new InvalidParamException(x);
      }
    });

    /**
     * devuelve la capacidad de la lista
     */
    Object.defineProperty(this, "capacity", {
      enumerable: true,
      get() {
        return this.#capacity;
      },
      set(x) {
        throw new InvalidParamException(x);
      }
    });
  }
  // metodos publicos

  // obtener el Map, metodo protegido
  // _getArray() {
  //   return _listaPrivada.get(this);
  // }

  // 

  // añade un nuevo elemento a la lista, implementar para comprobar ISBN en demás clases
  add(valor) {
    // si la lista esta llena no permite que se sigan añadiendo más elementos
    if (_listaPrivada.get(this).length >= this.#capacity) throw new FullListException(this.#capacity);
    // devuelve el tamaño de la lista
    return _listaPrivada.get(this).push(valor);
  }

  // añade un nuevo elemento en la posición especificada en la lista, devuelve el tamaño de la lista
  addAt(elemento, index) {
    // si la lista esta llena no permite que se sigan añadiendo más elementos
    if (_listaPrivada.get(this).length >= this.#capacity) throw new FullListException(this.#capacity);
    if (index < 0 || index > _listaPrivada.get(this).length) throw new OutOfRangeException;

    // añadir sin borrar nada y devolver tamaño del array
    _listaPrivada.get(this).splice(index, 0, elemento);
    return _listaPrivada.get(this).length;

  }

  // obtener el valor dando la clave
  get(index) {
    if (index < 0 || index > _listaPrivada.get(this).length) throw new OutOfRangeException;
    return _listaPrivada.get(this)[index];
  }

  // crea un String con los elementos de la lista, el delimitador es "-" por defecto
  toString(delimitador = " - \n") {
    // si la lista esta vacia lo indica
    return _listaPrivada.get(this).reduce((acc, cur, idx, src) => {
      // si el indice es 0(el primero) mostrar solo titulo,
      // si no es el primero mostrar lo acumulado + " - " + el titulo del libro
      return (idx === 0) ? "\"" + cur + "\"" : acc + delimitador + "\"" + cur + "\"";
    }, "");
  }

  // indexOf() como hay que buscar por ISBN poner en ObjectList
  // lastIndexOf() como hay que buscar por ISBN poner en ObjectList


  // vaciar la lista
  clear() {
    _listaPrivada.get(this).splice(0, _listaPrivada.get(this).length);
  }

  // devuelve el primer elemento de la lista
  firstElement() {
    // si la lista está vacia salta excepción
    if (this.isEmpty) throw new EmptyListException;
    return _listaPrivada.get(this)[0];
  }

  // devuelve el ultimo elemento de la lista
  lastElement() {
    // si la lista está vacia salta excepción
    if (this.isEmpty) throw new EmptyListException;
    return _listaPrivada.get(this)[_listaPrivada.get(this).length - 1];
  }

  // elimina el elemento de la posición indicada
  remove(index) {
    let inicio = 0;
    let final = _listaPrivada.get(this).length - 1;

    if (index < inicio || index > final) throw new OutOfRangeException;
    // devuelve el elemento borrado
    return _listaPrivada.get(this).splice(index, 1)[0] || "Nada borrado";
  }

  // metodo removeElement()
  removeElement(objeto) {

    // busca y guarda posición del elemento
    let posicion = this.indexOf(objeto);

    // si se ha encontrado
    if (posicion !== -1) {
      // mira si se ha borrado y si hay borrado devuelve true, sino false
      let borrado = _listaPrivada.get(this).splice(posicion, 1);
      return borrado.length > 0 ? true : false;
    }
    // si no encuentra nada devuelve false
    return false;
  }

  // removeElement() elimina el elemento de la lista implementar en ObjectList


  // set() 
  set(elemento, index) {
    if (index < 0 || index > _listaPrivada.get(this).length - 1) {
      throw new FullListException(this.#capacity);
    }

    let borrado = _listaPrivada.get(this).splice(index, 1, elemento);
    // si se ha borrado devolver el elemento del array, si no, lanzar mensaje
    if (borrado.length !== 0) {

      return borrado[0];

    } else {
      return false;
    }
  }


}

// clase también abstracta ObjectList
class ObjectList extends List {
  // campos privados
  #type;

  // constructor
  constructor(tamanio, type) {
    // La función se invoca con el operador new
    if (!new.target) throw new InvalidAccessConstructorException();

    // superconstructor
    super(tamanio);
    // si no es un objeto
    if (typeof type !== "function") {
      throw new TypeNoValidoException("");
    }
    this.#type = type;



  }

  // metodo indexOf() busca la posición de este elemento
  indexOf(objeto, atributoComparacion = "isbn") {
    if (!(objeto instanceof this.#type)) {
      throw new TypeNoValidoException(this.#type.constructor.name);
    }
    // error de tipo de entrada
    if (typeof atributoComparacion !== "string") {
      throw new InvalidParamException(atributoComparacion);
    }

    let posicion = _listaPrivada.get(this).findIndex((elemen, index, array) => {
      // devuelve verdadero si coincide con lo que se busca por el parametro pasado
      return elemen[atributoComparacion] === objeto[atributoComparacion]
    });
    return posicion;
  }


  // metodo lastIndexOf()
  lastIndexOf(objeto, atributoComparacion) {
    if (!(objeto instanceof this.#type)) {
      throw new TypeNoValidoException(this.#type.constructor.name);
    }
    // error de tipo de entrada
    if (typeof atributoComparacion !== "string") {
      throw new InvalidParamException(atributoComparacion);
    }

    const listVuelta = [..._listaPrivada.get(this)].reverse();
    // usar findIndex()
    let posicion = listVuelta.findIndex((elemento, indice, array) => {
      return elemento[atributoComparacion] === objeto[atributoComparacion];
    });

    // como se ha dado la vuelta hay que dar la vuelta al valor devuelto
    if (posicion === -1) return -1; // si no está , no está
    // devuelve la posición restando el numero de posiciones - posicionesInvertida
    let tamanio = _listaPrivada.get(this).length - 1;
    // devuelve la posición original
    return tamanio - posicion;
    //
  }

  // sobreescribir metodo add, pero que solo acepte ese tipo de objeto
  add(objeto) {
    if (!(objeto instanceof this.#type)) {
      throw new TypeNoValidoException(this.#type.constructor.name);
    }

    return super.add(objeto);
  }

  // sobreescribir metodo addAt
  addAt(objeto, index) {
    // si no es del tipo indicado
    if (!(objeto instanceof this.#type)) {
      throw new TypeNoValidoException(this.#type.constructor.name);
    }
    // añadir el objeto
    return super.addAt(objeto, index);

  }

  // metodo toString()
  toString(delimitador = " - \n") {
    let resultado = [];

    for (const o of _listaPrivada.get(this)) {
      let prop = [];

      for (const [key, value] of Object.entries(o)) {
        prop.push(`${key} : ${value}`);
      }

      resultado.push(`{${o.constructor.name}: ${prop.join(", ")}}`);
    }
    return resultado.join(delimitador);
  }

  // removeElement()
  removeElement(objeto = {}) {
    // comprobar que es un objeto del tipo especificado
    if (!(objeto instanceof this.#type)) {
      throw new TypeNoValidoException(this.#type.constructor.name);
    }
    // llamar a metodo super 
    return super.removeElement(objeto);
  }

  // set()
  set(elemento, index) {
    // comprobar que es un objeto del tipo especificado
    if (!(elemento instanceof this.#type)) {
      throw new TypeNoValidoException(this.#type.constructor.name);
    }
    // devolver elemento borrado
    return super.set(elemento, index);
  }

  // has()
  has(elemento = Book, propiedadComparacion = "isbn") {

    // comprobar que es un objeto del tipo especificado
    if (!(elemento instanceof this.#type)) {
      throw new TypeNoValidoException(this.#type.constructor.name);
    }

    // si el elemento se encuentra
    if (this.indexOf(elemento, propiedadComparacion) !== -1) return true;
    else return false

  }

}

// clase OrderedObjectList
class OrderedObjectList extends ObjectList {
  // propiedad
  #order
  #conjunto
  // por defecto el número Maximo es MAX_SAFE_INTEGER
  constructor(
    tamanioMaximo = Number.MAX_SAFE_INTEGER,
    type = Book,
    order = (a, b) => { return b - a },
    conjunto = false) {
    if (!new.target) {
      throw new InvalidAccessConstructorException;
    }
    super(tamanioMaximo, type);

    this.#order = order;
    this.#conjunto = conjunto;

  }

  // metodo add con la opcion de pasarle una funcion ordenadora
  add(objeto) {
    // variable
    let size = _listaPrivada.get(this).length;

    // si no se define conjunto como true , ordena el array con some
    if (!this.#conjunto) {
      // lo añade y lo ordena
      size = super.add(objeto);
      _listaPrivada.get(this).sort(this.#order);
    } else {
      // si es un conjunto , tiene que rechazar guardar el mismo isbn
      const existe = _listaPrivada.get(this).some((a) => { return a.isbn === objeto.isbn });
      // si no existe
      if (!existe) {
        // lo añade
        size = super.add(objeto);
        // lo ordena
        _listaPrivada.get(this).sort(this.#order);
      }
      // si existe no hace nada

    }
    return size;
  }

  // invalidar metodo addAt porque no tiene sentido ordenar por indice en una lista ordenada
  addAt() {
    throw new InvalidAccessConstructorException;
  }

}

// exportar clases

export {
  List,
  ObjectList,
  OrderedObjectList
}