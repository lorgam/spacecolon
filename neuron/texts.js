const texts = {
	language	: 'en',

	en : {
		mainMenu : {
			start	: "Start",
			options	: "Options",
			exit	: "Exit"
		},
		optionsMenu : {
			language	: "Language"
		}
	},
	es : {
		mainMenu : {
			start	: "Empezar",
			options	: "Opciones",
			exit	: "Salir"
		},
		optionsMenu : {
			language	: "Idioma"
		}
	}
}

texts.getText = function(section, text){return texts[texts.language][section][text];}