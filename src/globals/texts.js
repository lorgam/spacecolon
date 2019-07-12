const texts = {
	language	: 'en',

	en : {
		mainMenu : {
			start	: "Start",
			options	: "Options",
			exit	: "Exit"
		},
		optionsMenu : {
			language	: "Language",
			tileSize	: "Tile Size",
			little		: "Little",
			medium		: "Medium",
			big			: "Big"
		},
		materials : {
			mineral	: "mineral",
			gas		: "gas",
		}
	},
	es : {
		mainMenu : {
			start	: "Empezar",
			options	: "Opciones",
			exit	: "Salir"
		},
		optionsMenu : {
			language	: "Idioma",
			tileSize	: "Tamaño de cuadricula",
			little		: "Pequeño",
			medium		: "Mediano",
			big			: "Grande"
		},
		materials : {
			mineral	: "mineral",
			gas		: "gas",
		}
	}
}

texts.getText = function(section, text){return texts[texts.language][section][text];}

export default texts;