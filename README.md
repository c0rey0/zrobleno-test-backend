# CVLT Project
Based on [koa](https://koajs.com/), [objection.js](https://vincit.github.io/objection.js/) and [knex](https://knexjs.org/)
Developed with:
- [docker-ce v18](https://docs.docker.com/)
- [docker-compose v1.23](https://github.com/docker/compose/releases)

## Installing / Getting started


```bash
$ git clone git@github.com:cubicruler/cvlt-api.git
$ cd cvlt-api
$ make up
$ make db-refresh
$ yarn
$ yarn start
```


## Before pushing to repository
- check your code by built-in js checker `yarn lint`, if any errors occur - you should fix them, try to use `yarn precommit`
- for new task create feature branch
- merge your feature branch with `development`, in which you propose pull request
- make pull request and wait for confirmation
- when your pull request was submited, then checkout on `development` branch and continue coding
- enjoy

## Api Reference
In `development` documentation located at [http://localhost:83/docs/](http://localhost:83/docs/).

## Style guide
We use [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) eslint preset
