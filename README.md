# Calendar App
### Quick note, this project is still under development :exclamation:

Kind of Todo application with both Calendar and Todo mode. It's like [Microsoft Todo](https://todo.microsoft.com) + [Google Calendar](https://calendar.google.com) in 1 app. Honestly, not that fancier, but good.

### Technologies used
|:fire:|Technologies|
|:-:|:---|
|:frog:| Node - Express |
|:dragon:| MongoDB |
|:octopus:| React 16 - Redux |
|:hamster:| Server Side Rendering |
|:tiger:| Babel 7 |
|:horse:| Webpack 4 |
|:camel:| Jest |
|:whale2:| Docker |

### Repository details
This repository clearly includes two servers, an API Server and another Server for rendering the App. Installation and other commands are almost same for both servers.

### Installing dependencies
To install all the node modules run :point_down:
```
yarn install
```

### Run app in development mode
To start servers (both API server and App Server) in development mode, run
```
yarn run dev
```
To view the server side rendered react app, open http://localhost:3000

### Run unit tests
Testing framework - [Jest](https://jestjs.io/).   
Run tests from command line with `yarn run test` and to run tests in watch mode, try `yarn run test-watch`.

### Build and run the app in production
#### Aplication Sevrer
When the app is ready to deploy to production, create minified bundle files with `yarn run build`.   
Once the build is ready start express server on http://localhost:3000 (by default) with 👇
```
yarn run start
```
#### API Sevrer 
To start the API Server on http://localhost:5000 (by default) run
```
yarn run start
```

Thank you, hope you'll enjoy working with this..
