<h1 align="center">Welcome to API Nodepop 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.1.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D10.22.0-blue.svg" />
  <a href="http://localhost:3000/apidoc/" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://twitter.com/chitenavi" target="_blank">
    <img alt="Twitter: chitenavi" src="https://img.shields.io/twitter/follow/chitenavi.svg?style=social" />
  </a>
</p>

> Based on the project of the initial backend module, it has been added authentication, internationalization, background thumbnail image creation service and testing API.

> Added user control to the API, creation, authentication with jwt, deletion, obtaining.

> The thumbnail microservice receives the path of the created ad image, and creates 100x100px thumbnail in a folder inside adverts images folder.

> API developed under Node and MongoDB of a service for buying and selling second-hand products. The service maintains advertisements, where you can control them using methods described in the documentation.
>
> The app deploys a front-end home page, where you can view an example sale web and also the API documentation. From here you can search, filter, sort and paginate the ads from form or address bar using parameters described in documentation. You can log in, using the development parameters (user@example.com) and test the website, show private area, create a new ad, change language (spanish, english) with buttons.
>
> Everything is generated using the _express-generator_ module, with some changes in the file structure under the MVC architecture. Rendering views using _ejs_

### 🏠 [Homepage](https://localhost:3000/ 'Default')

> By default, if you run the app on your computer, home page is https://localhost:3000. You can edit the port number you want.

## Prerequisites

- node >=10.22.0
- HTTPS for local development and production. Search for https://github.com/FiloSottile/mkcert to install locally-trusted development certificates and setup HTTPS (SSL) on your local development environment.

## API Documentation

You can see all the API documentation at http://localhost:3000/apidoc/ (default path) when you start the application.

## Install

```sh
npm install
```

## Configure environment variables

Copy .env.example to .env and edit your settings before first run.

```sh
cp .env.example .env
```

## Load initial data

**Warning! this script delete database contents before load.**
Use in production only at first deployment.
You can load initial data to database with next command:

```sh
npm run initdb
```

## Usage

Start the application in production:

```sh
npm run start
```

## Development start

Start the application in development mode, use _nodemon_ to monitor changes in the code:

```sh
npm run watch:dev
```

## Test API (Adverts)

If you want to test the API, first you have to start the app in _http mode_, not secure:

```sh
npm run devtest
```

And then execute tests:

```sh
npm test
```

## How to start a local mongodb instance for deveploment

```sh
./bin/mongod --dbpath ./data/db --directoryperdb
```

## Author

👤 **Ivan Chinea**

- Twitter: [@chitenavi](https://twitter.com/chitenavi)
- Github: [@chitenavi](https://github.com/chitenavi)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
