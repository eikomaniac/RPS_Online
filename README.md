# RPS_Online

Full-Stack Rock Paper Scissors game with options to play vs a CPU (Beginner, Intermediate, or Advanced -- AIs with different strategies), or spectate a CPU vs CPU game.

You can also see your statistics vs. each CPU and a match history in the `Stats` section of the website.

## Technologies used

Front-end coded in React, TypeScript.

Back-end coded in ASP.NET Core (C#). Simple REST API with an in-memory database.

### Sidenote

The `userId` value of the client is hardcoded as `1` but the field was added to the database schema anyway in order to make the code future-proof, for example if a user login system were to be implemented.

## Running the server

### Front-end

To run the frontend server, run `yarn run start` in the `rps-front-end` directory.

### Back-end

To run the backend server, run `dotnet watch` in the `RPS_API` directory.

## Running tests

To run the front-end Jest tests, run `yarn test` in the `rps-front-end` directory.

To run the back-end NUnit tests, run `dotnet build` in the `RPS_API` directory.
