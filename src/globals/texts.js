const texts = {
  language : 'en',

  en : {
    mainMenu : {
      start : "Start",
      options : "Options",
      exit : "Exit"
    },
    optionsMenu : {
      language : "Language",
      tileSize : "Tile Size",
      little : "Little",
      medium : "Medium",
      big : "Big"
    },
    resources : {
      mineral : "mineral",
      gas : "gas",
      fish : "fish",
      hervibore : "hervibore",
    },
    buildings : {
      ROBOT_FACTORY : "Robot factory",
      FISH_TANK : "Fish tank",
      MINE : "Mine",
    },
    general : {
      back : "Back",
      nextTurn : "Next turn",
      move : "Move",
      fortify : "Fortify",
      mine : "Mine",
      cancel : "Cancel",
    },
    units : {
      robots : "Robot",
      construction : "Construction robot"
    }
  },
  es : {
    mainMenu : {
      start : "Empezar",
      options : "Opciones",
      exit : "Salir"
    },
    optionsMenu : {
      language : "Idioma",
      tileSize : "Tamaño de cuadricula",
      little : "Pequeño",
      medium : "Mediano",
      big : "Grande"
    },
    resources : {
      mineral : "mineral",
      gas : "gas",
      fish : "peces",
      hervibore : "hervíboros",
    },
    buildings : {
      ROBOT_FACTORY : "Fábrica de robots",
      FISH_TANK : "Tanque de pescado",
      MINE : "Mina",
    },
    general : {
      back : "volver",
      nextTurn : "Siguiente turno",
      move : "Mover",
      fortify : "Fortificar",
      mine : "Mina",
      cancel : "Cancelar",
    },
    units : {
      robots : "Robot",
      construction : "Robot de construccion"
    }

  }
}

texts.getText = function(section, text){return texts[texts.language][section][text];}

export default texts;

