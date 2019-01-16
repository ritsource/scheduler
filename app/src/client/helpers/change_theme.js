const myAppThemes = {
  lightOnly: {
    '--danger-red-color': '#f03434',
    // '--safe-green-color': '#20b133',
    '--background-color': 'white',
    '--border-color': '#d8d8d8',
    '--hover-mint-light': '#f3f3f3',
    '--hover-mint-medium': '#ebebeb',
    '--hover-mint-deep': '#dddddd',
    '--theme-color': 'rgb(255, 155, 23)',
    '--text-color': '#424242',
    '--text-color-light': '#707070',
    '--text-color-light-2': '#b8b8b8',
    '--modal-mask-color': 'rgba(0, 0, 0, 0.2)',
  },
  // lightMix: {
  //   '': '',
  // },
  darkOnly: {
    '--danger-red-color': '#f03434',
    // '--safe-green-color': '#20b133',
    '--background-color': '#151a1d',
    '--border-color': '#292f33',
    '--hover-mint-light': '#1c2225',
    '--hover-mint-medium': '#292f33',
    '--hover-mint-deep': '#292f33',
    '--theme-color': 'rgb(255, 155, 23)',
    '--text-color': 'white',
    '--text-color-light': 'white',
    '--text-color-light-2': '#707070',
    '--modal-mask-color': 'rgba(255, 255, 255, 0.1)',
  },
  // darkMix: {
  //   '': '',
  // },
};

export default (name) => {
  // console.log('What');
  if (!name) name = 'lightOnly';

  if (window) {
    const html = document.getElementsByTagName('html')[0];
    const obj = myAppThemes[name];

    Object.keys(obj).map((key) => {
      // console.log('lol');
      html.style.setProperty(key, obj[key]);
    });

    window.localStorage.setItem('myAppTheme', name);

    // html.style.setProperty("--main-background-color", "green");
  }
  
}