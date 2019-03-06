import { setCookie } from './cookie_funcs';

const myAppThemes = {
	Blue: {
		'--theme-color': '#088cfb'
	},
	Orange: {
		'--theme-color': '#ff9b17'
	},
	Green: {
		'--theme-color': '#00bc60'
	}
};

export default (name) => {
	if (!name) name = 'Blue';

	if (window) {
		const html = document.getElementsByTagName('html')[0];
		const obj = myAppThemes[name];

		Object.keys(obj).map((key) => {
			html.style.setProperty(key, obj[key]);
		});

		setCookie('myAppColorTheme', name, 365); // 'name' is value here
	}
};
