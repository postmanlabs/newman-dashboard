<p align="center">
    <img src="./docs/img/header.png">
</p>

<p align="center">
    <img src="https://img.shields.io/badge/built%20with-JavaScript-green?style=flat-square&logo=node.js">
    <img src="https://img.shields.io/badge/built%20for-newman-orange?style=flat-square&logo=postman">
    <img src="https://img.shields.io/badge/version-0.0.1-blue?style=flat-square">
</p>

## About

Newman Dashboard aims to provide a real-time WebUI dashboard which can let you control and view the currently executing as well as the previously executed [newman](https://github.com/postmanlabs/newman) runs. This would help you debug and analyze your runs from a single endpoint and notify about any error which might occur during the run.

This project was built during [Google Summer of Code 2021](https://summerofcode.withgoogle.com/projects/#5547391014404096) ☀️ with [Postman](https://github.com/postmanlabs) 🚀


## Usage

This package is both a reporter and a standalone package. The standalone package takes care of launching the dashboard, while the reporter connects to the newman run.

A. For installation:

```
npm install -g newman-dashboard
```

B. Launch the dashboard on `localhost:5001`

```
newman-dashboard
```

You can also choose to daemonize the dashboard using the `--daemonize` flag.

The dashboard frontend would now be visible on `http://localhost:5001/`

C. Connect a newman run to the dashboard

```
newman run collection.json -r dashboard
```
This will connect the run to the dashboard and you would be able to view its status on the frontend.

D. Run file with Newman

```
npm link
cd /path/to/newman
npm link newman-reporter-dashboard

newman run -r dashboard collection.json
```



## Environment setup

A. Install all dependencies

```
npm install
```

B. Run the CLI for launching the dashboard

```
node ./bin/index <args>
```

C. Running the tests

```
// The complete test suite along with linting
npm test

// Only linting
npm run test:lint

// Only the test suite
npm run test:suite
```
