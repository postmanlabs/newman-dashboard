# Getting Started with Contributing

The first thing you need to do is find an issue to work on. Go to Issues and find a suitable issue which you think you can handle and are willing to work on. Make sure you ask the maintainers to have the issue assigned to you before you start working on it.


**Step 1:** Fork the repository

**Step 2:** Clone the forked repository to your local machine with `git clone <repository link>`

**Step 3:** Add a remote (upstream) to your fork using: 
```
git remote add upstream https://github.com/postmanlabs/newman-dashboard.git
```

**Step 4:** Synchronize your fork with upstream using the following commands:

```

$ git checkout develop

$ git fetch upstream 

$ git merge upstream/develop

$ git push origin develop

```

**Step 5:** Make a branch with a suitable name relevant to the issue you are working on using `git branch <branch>`

**Step 6:** Switch your working branch from master to the newly created branch with `git checkout <branch>`

**Step 7:** Work on the changes. You can keep track of your branch and staging area using `git status`

**Step 8:** Add all of the changes you made to the staging area before you commit with `git add .` 

**Step 9:** Commit your changes with a meaningful commit message using `git commit -m "commit message"`

**Step 10:** Finally push your changes to your forked repository using `git push origin <branch>`




## Usage

This package is both a reporter and a standalone package. The standalone package takes care of launching the dashboard, while the reporter connects to the newman run.

A. For installation:
```
npm pack reporter
```

```
npm i -g newman-reporter-dashboard-0.0.1.tgz
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
cd /path/to/newman
npm link
npm link newman-reporter-dashboard

newman run -r dashboard collection.json
```

## Making your first Pull Request

Once you have finished working on an issue and have pushed the changes to your forked repository, it is time to make your first pull request. Go to your forked repository on GitHub and it should show you an option to `Compare & pull request`. Click the `Compare & pull request` button and it will directly initiate a Pull Request for you, follow the Pull Request template and fill out the necessary information. Once that is done, click the `Create Pull Request` button.