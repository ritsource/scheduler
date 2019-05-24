Visit the App - [https://scheduler.ritwiksaha.com](https://scheduler.ritwiksaha.com)

View Source-code - [https://github.com/ritwik310/scheduler](https://github.com/ritwik310/scheduler)

  

# About

**Scheduler**, a schedule management application for your daily tasks. Its easy-to-use interactive interface makes it's really fun. This app is inspired by [Google Calendar](https://calendar.google.com/) and [Microsoft Todo](https://to-do.microsoft.com/). Programmers are people who love to find solutions to problems that are already been solved. And this project is no exception. But there are a couple of things that could be a deal maker for your use-cases. The main motivation behind building this is that I previously used both of the applications mentioned above for keeping track of my schedule and although it wasn't so hard I thought it would be fun to create something that has both views, and that's it. So, if you want to use it then you certainly can, for free (at least for now, I mean almost forever). Good luck.

# Repository Details

You can find the **Source-code** for this application in this [Github Repository](https://github.com/ritwik310/scheduler) 

The repository contains 3 main directories,  **client**,  **server**  &  **nginx**. The  **client**  contains necessary files to run a  **Docker**  container for the client side of the application, a server-side rendered  **React**  app that uses  **GraphQL**  for data-queries and communicates via  **docker-compose**  to the  **API-Server**  in development.

This brings us to the  **server**  directory. Here we are running a  **Node/Express/GraphQL**  server in a  **Docker**  container. It uses  **MongoDB**  for writing & reading data, and that also runs inside a container and uses  **persistent volumes (Kubernetes)**  to store data in production.  [here's](https://github.com/ritwik310/my-k8s-config)  the configuration for the  **Kubernetes cluster**.

And, the  **nginx**  directory contains configuration for running an  **Nginx server**  in a container for mainly routing management in development.

# Application Services

The application has been hosted on a **Kubernetes cluster**. Here's a very simple design of the system. This contains an **API-server**, a **Rendering-server** (renders a react app), a **MongoDB database** (uses PVC to store data), and a **Redis server** (for data caching, excluded in v2).

Configuration files for Kubernetes Cluster [here](https://github.com/ritwik310/scheduler-k8s)  


<img  style="float: right;"  src="https://gitlab.com/ritwik310/project-documents/raw/master/Scheduler/Scheduler-Microservices-Mockup-0.png">

> **Note:** Currently hosted on AWS Elastic Beanstalk (Free Tier), as it has no commercial usage.

## Application Renderer (Client)
The **Client** service is responsible for rendering the user interface (a web-app). This runs a **Node/Express.js** server, that renders a **React-app** from the **Server-side**. The Client communicates to the **API-server** using **GraphQL** (Apollo).

Client includes multiple **"apps"**, each responsible for rendering different parts of the **UI**. For example, **Calender**, **Todo**, and **Extra** are 3 different **apps** (respectively responsible for **Calendar-UI**, **Todo-UI**, and **Login-&-About-UI**). Each **app** gets rendered separately according to user requests, and eventually minimizes the bundle size by chunking **javascript** in 3 parts.

Each **app** get's rendered on **different routes** from the Server-side. Here's the list of "apps"...

Calendar - [/calendar](https://scheduler.ritwiksaha.com/calendar)   
Todo - [/todo](https://scheduler.ritwiksaha.com/todo)   
Extra - [/about](https://scheduler.ritwiksaha.com/about) (every route other than first two)   

## API-Server (Server)

A pretty straightforward **Node.js/GraphQL** server with a **MongoDB** database. Moreover, it uses Passport.js for authentication handling and Nodemailer for passport recovery.

## Other Parts
In development, it uses **Nginx** to handle routing between **docker-compose** services. Same for Routing in AWS-EB (production) and uses a remote **MongoDB cluster** as the production database.

In **Kubernetes** too, it uses **Ingress-Nginx** for Routing, but as mentioned earlier, **Persistent-volume** for data storage.

# Running on your Local Server

### Prerequisites

- **Docker**, installed on your computer
- **Docker-Compose**

### Clone the Project
Using **SSH**
```shell
$ git clone git@github.com:ritwik310/scheduler.git
```
or using **https**
```shell
$ git clone https://github.com/ritwik310/scheduler.git
```

### Some Configuration
> **Note:** Before you can run the app on your local computer you need to put a little bit of configuration in place.

**Add a 'dev_keys' File**
- Create a file named **dev_keys.js** inside the config directory on for server `/server/src/config/dev_keys.js`

- Copy & Paste the following code in that file
```javascript
module.exports  = {
	mongo_uri: 'mongodb://mongo:27017/scheduler-dev',
	google_client_id: '',
	google_client_secret:  '',
	google_refresh_token: '',
	google_access_token: '',
	mail_sender_address: '',
	facebook_app_id: '',
	facebook_app_secret: '',
	cookie_key: '$-ANY-RANDOM-STRING',
};
```
- The code above will do the job. But if you want to enable **Google-OAuth** and **Facebook-OAuth** login. Then you need to go to [Google](https://console.cloud.google.com) and [Facebook's](https://developers.facebook.com/) developer website and generate credentials to use.

### Starting the App

After getting into the root directory `./schedular`, you can start the project by running :point_down:
```shell
$ docker-compose up
```
You need **Docker and Docker-Compose** installed for the above command. Once the containers are running you can visit [http://127.0.0.1:4001](http://127.0.0.1:4001) and play with the application.

**Happy Hacking**
