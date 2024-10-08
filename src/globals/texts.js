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
    general : {
      back : "Back",
      nextTurn : "Next turn",
      move : "Move",
      fortify : "Fortify",
      mine : "Mine",
      cancel : "Cancel",
      robots : "Robot",
      construction : "Construction robot",
      investigateBtn : "Investigate"
    },
    technologies : {
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
    general : {
      back : "volver",
      nextTurn : "Siguiente turno",
      move : "Mover",
      fortify : "Fortificar",
      mine : "Mina",
      cancel : "Cancelar",
      robots : "Robot",
      construction : "Robot de construccion",
      investigateBtn : "Investigar"
    },
    technologies : {
    }
  }
}

texts.getText = function(section, text){return texts[texts.language][section][text];}

export default texts;

