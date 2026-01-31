# LiveScoreNew 

Here's a LiveScore web app designed for football enthusiasts, allowing you to check current match results and predict outcomes. You don't need to refresh the page as API queries are sent every 30 seconds, allowing for real-time tracking of scores. Utilizing the [API-Football](https://www.api-football.com/), you can quickly access match details, league tables, results, and statistics for your favorite team and others. LiveScoreNew also enables you to personalize your experience by adding leagues to your favorites through the use of cookies.

This version of the app introduces a range of upgrades, such as integration with Zustand and TypeScript, [link](https://github.com/Bartek0074/LiveScore/) to old version.

**NOTE:** App is still under development. Plans include adding a dedicated page for leagues, clubs etc. Because of the limitations of the free API plan, not everything can work properly..

## Demo

Live Demo [here](https://bartek0074-livescorenew.netlify.app/).

![LiveScoreNewGif1](https://github.com/Bartek0074/LiveScoreNew/assets/88652468/66e2df4b-a60a-4f6d-aafe-5eaa5da4266f)

![LiveScoreNewGif2](https://github.com/Bartek0074/LiveScoreNew/assets/88652468/a2bb77e8-3700-4f02-b5d3-477700b62408)
## Instructions

First clone this repository.

```bash
$ git clone https://github.com/Bartek0074/LiveScoreNew.git
```

Get api key from API-Football. Get it [here](https://www.api-football.com/).

Create a .env file in the root of your project folder and add the following.

```
REACT_APP_API_KEY=[YOUR_API_KEY_FROM_API_FOOTBALL]
```

Install dependencies. Make sure you already have [`nodejs`](https://nodejs.org/en/) & [`npm`](https://www.npmjs.com/) installed in your system.

```bash
$ npm install # or yarn
```

Run it

```bash
$ npm start # or yarn start
```


## Technologies

- React,
- TypeScript,
- Zustand,
- SCSS,
- React Router.
- ANT Design.

## API

- [API Football](https://www.api-football.com/)
 
## Other packages

- classnames,
- react-icons,
- axios,
- universal-cookie.
