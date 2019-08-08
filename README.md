# mutant-xmen Challange

### Prerequisite

- NodeJS >= 10 
- MongoDB >= 3
  - Example with docker: `docker run --name mongo-meli -d -p 27017:27017 mongo:latest`
- Heroku account

Add a `ENV` variable to set up the mongo DB

`export MONGODB_URI='mongodb://localhost:27017/<db>`

### How to compile

First, install the dependencies

``` 
npm install
```

Run the unit tests:

```
npm run test
```

Run coverage report, and you can see it at `coverage/`folder

```
npm run coverage
```

Run the API calls, for testing pourpose

```
npm run call-api
```

Run an integrated test, that run the APP server and call it with call-api

```
npm run test-integrated
```

Run the app

```
npm run start
```




Run the app
### Deploy

You need a heroku account, and follow this: 

<https://devcenter.heroku.com/articles/deploying-nodejs>

