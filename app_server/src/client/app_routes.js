import App from './app';
import LandingPage from './components/pages/landing_page';
import HomePage from './components/pages/home_page';
import CalendarPage from './components/pages/calendar_page';
import TodoPage from './components/pages/todo_page';
import NotFoundPage from './components/pages/not_found_page';

export default [
  {
    ...App,
    routes: [
      { ...LandingPage, path: '/about', exact: true },
      { ...HomePage, path: '/', exact: true },
      { ...CalendarPage, path: '/calendar' },
      {
        ...TodoPage,
        path: '/todo',
        // routes: [
        //   { path: '/todo/:groupId',
        //     // component: TodoPage.component
        //     ...TodoPage
        //   }
        // ]
      },
      // { ...TodoPage, path: '/todo/:groupId' },
      { ...NotFoundPage }
    ]
  }
];