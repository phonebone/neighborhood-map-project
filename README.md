# Neighborhood app

## Table of Contents

- [About this project](#about-this-project)
- [Instructions](#instructions)
  - [Static Server](#static-server)
  - [Other Solutions](#other-solutions)
- [Supported Browsers](#supported-browsers)
- [License](#license)

## About this project

This application shows a map of the area around the city of Fontainebleau in France, with markers that show the location of several bouldering (climbing) area's.

You can filter the list of area's that are shown by typing in the textfield and view information about the (local) weather for every area by clicking on it in the list or directly on the marker.

For the weather data the project uses the [openweathermap](https://www.openweathermap.org) API.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Instructions

- First, cd into the project directory and download all dependencies with `npm install`
- Next, there are several ways to view the project:

### Python SimpleHTTPServer

If you have Python installed you can use the SimpleHTTPServer module. This is how you use it:
- in your terminal, cd into the `build` directory
- then type: python -m SimpleHTTPServer [port]
port is optional, if you don't specify it uses the default 8000
- visit the website in your browser at localhost:[port]

### Static Server

For environments using [Node](https://nodejs.org/), the easiest way to handle this would be to install [serve](https://github.com/zeit/serve) and let it handle the rest:

```sh
npm install -g serve
serve -s build
```

The last command shown above will serve your static site on the port **5000**. Like many of [serve](https://github.com/zeit/serve)’s internal settings, the port can be adjusted using the `-p` or `--port` flags.

Run this command to get a full list of the options available:

```sh
serve -h
```

### Other Solutions

You don’t necessarily need a static server in order to run a Create React App project in production. It works just as fine integrated into an existing dynamic one.

Here’s a programmatic example using [Node](https://nodejs.org/) and [Express](http://expressjs.com/):

```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
```

The choice of your server software isn’t important either. Since Create React App is completely platform-agnostic, there’s no need to explicitly use Node.

The `build` folder with static assets is the only output produced by Create React App.

## Supported Browsers

By default, the generated project uses the latest version of React. You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.

## License

[MIT](LICENCE)