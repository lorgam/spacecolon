const texts = {
	language	: 'en',

	en : {
		mainMenu : {
			start	: "Start",
			options	: "Options",
			exit	: "Exit"
		}
	},
	es : {
		mainMenu : {
			start	: "Empezar",
			options	: "Opciones",
			exit	: "Salir"
		}
	}
}

texts.getText = function(section, text){return texts[texts.language][section][text];}