import { setCookie } from './cookie_funcs';

const myAppThemes = {
	Blue: {
		'--theme-color-deep': '#0071e2',
		'--theme-color': '#088cfb',
		'--theme-color-light': '#00a6f9'
	},
	Orange: {
		'--theme-color-deep': '#ff8800',
		'--theme-color': '#ff9b17',
		'--theme-color-light': '#ffa42d'
	},
	Green: {
		'--theme-color-deep': '#ff8800',
		'--theme-color': '#ff9b17',
		'--theme-color-light': '#ffa42d'
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
