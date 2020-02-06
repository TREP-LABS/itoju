# RealDrip Backend [![Build Status](https://travis-ci.org/TREP-LABS/realdrip-backend.svg?branch=master)](https://travis-ci.org/TREP-LABS/realdrip-backend)  [![Coverage Status](https://coveralls.io/repos/github/TREP-LABS/realdrip-backend/badge.svg?branch=master)](https://coveralls.io/github/TREP-LABS/realdrip-backend?branch=master)

> What is Itoju? Check [here](https://treplabs.co/Itoju)

This is the backend API for Itoju.

## API Documentation
The API is well documented using the OpenAPI Spec(Swagger) [here](https://app.swaggerhub.com/apis/Treplabs/Realdrip_Platform/1.0#/).

## Getting Started
The instructions below would get the project up and running on your local machine

### Prerequisite
- Git
- Node
- npm or yarn

### Installation
- Clone the repository `git clone https://github.com/TREP-LABS/realdrip-backend.git`
- Change into the directory of the project
- run `npm install` on your preferred console to install all the dependency packages
- Create a `.env` file in the root folder of the project to provide all the needed environment variables as specified in `.env.example`
- run `npm run dev` to start the application in dev mode

## Testing
The application features mostly integration tests for its different API endpoints, to run these tests, use `npm test`(at the root of the project).
Becuase of our CI/CD practice, it's best that every single change to the codebase features one type of automated test or the other.

## Test Coverage
We use [Coveralls](https://coveralls.io/) to report our test coverage data. We aim for 90%(or above) test coverage but we try our best not to go below 80%.

### TestRunner
We added a bit of abstraction over the way we write automated integration tests. Most of the integration tests we write for the different API endpoints follows the same structure of simulating an Http request to the app and asserting the response body. Consequently, we created a testRunner utility that takes care of the details on sending request and asserting a response, all you need to do to test an endpoint is to compose testCases. More details on how to use the testRuner and compose testCases [here]().
