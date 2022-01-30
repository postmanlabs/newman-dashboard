# Structure

Newman Dashboard is a package which is both a reporter and a CLI.

The repository can be broken into 3 major components:

1. CLI
2. Dashboard
3. Reporter

## CLI

Location: [`./bin/index.js`](../bin/index.js) </br>

The CLI is built using commander.js which is used to parse the `argv` for commands to start the dashboard and its configurations.
It is the binary which is executed when you run the newman-dashboard command from the terminal to start the dashboard.

## Dashboard

Location: [`./dashboard`](../dashboard) </br>

It is further divided into 2 parts:

### Broker

Location: [`./dashboard/server/index.js`](../dashboard/server/index.js) </br>

The broker is a server built using socket.io and express which is a mediator for the pub/sub connections between the newman runs and the frontend. <br/>
Both the newman runs and dashboard connect to this server to publish and subscribe to messages.<br/>
The code has been separated into 3 parts to maintain modularity:

-   Express Server - [`./dashboard/server/server.js`](../dashboard/server/server.js)
-   Socket.io Server - [`./dashboard/server/index.js`](../dashboard/server/index.js)
-   Event handlers - [`./dashboard/server/api`](../dashboard/server/api/index.js)

The express server serves the frontend as static files.

### Frontend

Location: [`./dashboard/frontend`](../dashboard/frontend) </br>

The frontend of the dashboard is built using NextJS - A React Framework.<br/>
It is responsible for issuing the requests made by the user back to the broker and then to the newman runs.<br/>

## Reporter

Location: [`./reporter`](../reporter) </br>

The reporter is the default export of this package. <br/>
It is a function which can be required via newman to send various events related to the underlying newman run. <br/>
The function signature of this export is specified by newman itself and you can read more about it [here](https://github.com/postmanlabs/newman#creating-your-own-reporter).

The reporter is spilt in 2 parts to maintain modularity:

-   Event handlers - [`./reporter/lib/events`](../reporter/lib/events.js)
-   Core reporter function - [`./reporter/index.js`](../reporter/index.js)
