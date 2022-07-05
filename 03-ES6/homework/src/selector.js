const TemplateGlob = require("@11ty/eleventy/src/TemplateGlob");

var traverseDomAndCollectElements = function(matchFunc, startEl = document.body) {
  var resultSet = [];

  //if (typeof startEl === "undefined") {
  //  startEl = document.body;
  //}

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  // si el nodo donde estamos parados matchea con el selector
  if (matchFunc(startEl)) resultSet.push(startEl)
  // itera el arbol hijo para buscar mas elementos que matchien
  for (let I = 0; i < startEl.children.length; i++) {
    let resultado = traverseDomAndCollectElements(matchFunc, startEl.children[i])
    // hacemos un spred para juntar los dos arrays que nose quedan
    resultSet = [...resultSet, ...resultado]; 
  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí

  if (selector[0] === "#") return "id";
  if (selector[0] === ".") return "class";

  /*for (let i = 0; i < selector.length; i++) {
    if (selector[i] === ".") {
      return "tag.class"
    } 
  }*/
   if (selector.split(".").length > 1) return "tag.class";
  return "tag"; 
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") { 
   matchFunction = function (element) {
   //return "#" + element.id === selector;
   return `#${element.id}` === selector;
   }
  } else if (selectorType === "class") {
    for (let i = 0; i < element.classList.length; i++){
      if(`.${element.classList[i]}` === selector) return true
    }
    return flase
    
  } else if (selectorType === "tag.class") {
    matchFunction = function (element){
      let [tag, className] = selector.split(".")
      // div.titulo
      // tag = div, className = titulo

      return matchFunctionMaker(tag)(element) && matchFunctionMaker("."+className)(element)

    }
    
  } else if (selectorType === "tag") {
    matchFunction = function (element){
      return element.tagName === selector.toUpperCase();
    }
    
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
