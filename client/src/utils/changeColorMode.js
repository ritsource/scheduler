import { setCookie } from './cookie_funcs';

const myAppThemes = {
	lightOnly: {
		'--danger-red-color': '#f03434',
		'--safe-green-color': '#019031',
		'--background-color': 'white',
		'--border-color': '#d8d8d8',
		'--hover-mint-light': '#f3f3f3',
		'--hover-mint-medium': '#f3f3f3',
		'--hover-mint-deep': '#dddddd',
		'--text-color': '#424242',
		'--text-color-light': '#707070',
		'--text-color-light-2': '#b8b8b8',
		'--text-color-light-3': '#707070',
		'--modal-mask-color': 'rgba(0, 0, 0, 0.3)'
	},
	darkOnly: {
		'--danger-red-color': '#f03434',
		'--safe-green-color': '#019031',
		'--background-color': '#151a1d',
		'--border-color': '#292f33',
		'--hover-mint-light': '#1c2225',
		'--hover-mint-medium': '#1c2225',
		'--hover-mint-deep': '#292f33',
		'--theme-color-deep': '#0071e2',
		'--text-color': 'white',
		'--text-color-light': 'white',
		'--text-color-light-2': '#999999',
		'--text-color-light-3': '#707070',
		'--modal-mask-color': 'rgba(255, 255, 255, 0.1)'
	}
};

export default (name) => {
	if (!name) name = 'lightOnly';

	if (window) {
		const html = document.getElementsByTagName('html')[0];
		const obj = myAppThemes[name];

		Object.keys(obj).map((key) => {
			html.style.setProperty(key, obj[key]);
		});

		setCookie('myAppColorMode', name, 365); // 'name' is value here
	}
};
