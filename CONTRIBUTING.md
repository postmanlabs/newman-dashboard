# Getting Started with Contributing


**Step 1:** Fork the repository

**Step 2:** Clone the forked repository to your local machine with 
```
git clone https://github.com/postmanlabs/newman-dashboard
```

## Usage

This package is mono-repo for the reporter and the dashboard package. The dashboard package takes care of launching the dashboard, while the reporter connects to Newman.


A. For installation:
```
cd reporter
npm pack
npm i -g newman-reporter-dashboard.<version>.tgz
```

```
npm i -g newman-reporter-dashboard-0.0.1.tgz
```
B. Building the frontend:
```
npm run build
```

C. Launch the dashboard on `localhost:5001`

```
cd dashboard
node bin/index.js
```
or, Launch the dashboard in dev mode:
```
npm run dev:dashboard
```

You can also choose to daemonize the dashboard using the `--daemonize` flag.

The dashboard frontend would now be visible on `http://localhost:5001/`

D. Connect a newman run to the dashboard

```
newman run collection.json -r dashboard
```
This will connect the run to the dashboard and you would be able to view its status on the frontend.

E. Run file with Newman

```
cd /path/to/newman
npm link
npm link newman-reporter-dashboard

bin/newman.js run -r dashboard collection.json

```

## Making your first Pull Request

* Ensure that tests are passing.
* Ensure that lint checks are passing.
* Ask any of the maintainers for review.
* Once any reviewer which write access approves the PR, merge it. 🎉