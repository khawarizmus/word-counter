This project was written in typescript and transpiled down to javascript in this section we will explain more about the project set up and the automation around it.

# The Github Repo

This repo comes with a [`README`](../README.md), a [`CODE_OF_CONDUCT`](../CODE_OF_CONDUCT.md), a [`GUID`](../.github/GUIDE.md) on how to contribute and a [`COMMIT_CONVENTION`](../.github/COMMIT_CONVENTION.md) explaining the convention we follow for creating commits and why we do that.

on top of that the repo comes with issue templates for both reporting a bug or requesting a feature this creates consistency across the issues and eases sorting and filtering of the issues.

## github actions

all our CD/CI is run by using [github actions](https://github.com/features/actions) defined at [`.github/workflows/main.yml`](../.github/workflows/main.yml).

in it we have 3 main jobs:

- A Build job where we run our build on both node 12 and 14 lts versions.
- A Test job where we execute our tests on both previously mentioned node lts versions and collect and upload the code coverage data to [codecov](https://about.codecov.io/).
- A Release job that relies on the result of the tests (won't execute if any test fail) where we use [semantic-release](https://github.com/semantic-release/semantic-release) to release our source code with semantic versioning standards based on our commits conventions and create a changelog file to documents the changes introduced to the CLI which can be found [here](https://github.com/gimyboya/word-counter/releases).

when a job fails or a release is published the contributors receive notifications.


A small but worth noting 'feature' in our repo is that our `README` file contains badges that reflect in realtime the status of our build pipeline and the code coverage of our tests. this gives information about the project at glimpse.

# Code Base

The project uses Typescript to benefit from type safety offered by the language. the entry file is `index.ts` where most of the CLI logic is there. the `src` folder contains the underlying functions used by the CLI and organized into separate files to allow a better and easier testing of the underlying code.

tests are located in `tests/units` folder where we use [`jest`](https://jestjs.io/) as our test runner.

the following are scripts in the `package.json` file that we constantly use during development:

```json
"start": "ts-node-dev --respawn --transpile-only index.ts",
```
by using [`ts-node-dev`](https://github.com/wclr/ts-node-dev) we get an easy development experience via hot reloading mechanism. although not really what we need for a cli but it was useful at the initial of the project, making sure that everything works correctly.

```json
"test": "jest --coverage --verbose",
```
this command executes jest and generates a code coverage report (useful in our CI pipeline). Jest is also configured in the `package.json` file.

```json
"commit": "git-cz",
```
because our work depends heavily on a specific commit convention (used by semantic-release to release our CLI following semantic versioning and to generate a valid changelog). We have set up this command to help the process of creating conventional commits.

```json
"build": "tsc",
"postbuild": "pkg . --out-path dist -t node12-linux-x64,node12-win-x64,node12-macos-x64",
```
finally our build command transpiles typescript into a javascript project outputting it into the `dist` folder and automatically executing a post build command that generates executables of the CLI out of that, using [`pkg`](https://github.com/vercel/pkg). That allow the CLI to run even on devices without Node.js installed.

## tools

this project uses [`eslint`](https://eslint.org/) for linting and catching performance of logical problems early. it uses [`prettier`](https://prettier.io/) which formats the code evry time the save button is hit, this allows consistent codding style across the code base.

our project contains a `.gitignore` file to ignore certain files from being committed to the remote repository.

