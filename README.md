
# Welcome to Scheduler!

**Play with** [Schedular](https://scheduler.ritwiksaha.com/),

**Scheduler**, a schedule management application for your daily tasks. Its easy-to-use interactive interface makes it's really fun. This app is inspired from [Google Calendar](https://calendar.google.com/) and [Microsoft Todo](https://to-do.microsoft.com/). Programmers are people who love to find solutions to problems that are already been solved. And this project is no exception. But there are a couple of things that could be a deal maker for your use-cases. The main motivation behind building this is that I previously used both of the applications mentioned above for keeping track of my schedule and although it wasn't so hard I thought it would be fun to create something that has both views, and that's it. So, if you want to use it then you certainly can, for free (at least for now, I mean almost forever). Good luck.

# Files

As you can possibly see this project contains 3 main directories, **client**, **server** & **nginx**. The **client** contains necessary files to run a **Docker** container for the client side of the application, a server-side rendered **React** app that uses **GraphQL** for data-queries and communicates via **docker-compose** to the **API-Server** in development.  
  
This brings us to the **server** directory. Here we are running a **Node/Express/GraphQL** server in a **Docker** container. It uses **MongoDB** for writing & reading data, and that also runs inside a container and uses **persistent volumes (Kubernetes)** to store data in production. [here's](https://github.com/ritwik310/my-k8s-cluster) the configuration for the **Kubernetes cluster**.

And, the **nginx** directory contains configuration for running an **Nginx server** in a container for mainly routing management in development.

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
> **Note:** Before you can run the app on your local computer you need to do a little bit of configuration in place.

**Add a 'dev_keys' File**
- Create a file names **dev_keys** inside the config directory on for server `/server/src/config/dev_keys.js`

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

After getting into the root directory using `cd ./schedular`, you can start the project by running :point_down:
```shell
$ docker-compose up
```
You need **Docker and Docker-Compose** installed for the above command. Once the containers are running you can visit [http://127.0.0.1:4001](http://127.0.0.1:4001) and play with the application.

# :metal: Good Luck