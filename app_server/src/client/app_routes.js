import App from './app';
import HomePage from './components/home_page';
import NotFoundPage from './components/not_found_page';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...NotFoundPage
      }
    ]
  }
];