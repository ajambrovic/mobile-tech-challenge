# Mobile Coding Challenge

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli) and has addtional libraries included:

- [Redux](https://redux.js.org/)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [React Redux](https://react-redux.js.org/)
- [styled-components](https://styled-components.com/)
- [polished](https://polished.js.org/)

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Available Scripts

In the project directory, you can run:

### `yarn start:api`

```sh
yarn start:api
```

Starts the fake REST API server on [http://localhost:4000](http://localhost:4000).

#### Notes

- You can re-run the script to reset/regenerate the data.

## Fake REST API

Running on [http://localhost:4000](http://localhost:4000).

### `/tournaments`

#### GET

Get a list of tournaments.

##### Query Parameters

###### `q`

Type: `string`

Search tournaments by any value

###### `_page`

Type: `number`

Search tournaments by page

###### `_limit`

Type: `number` - _10 by default_

Set maximum number of items per page

##### Response Example

```json
[
  {
    "id": "79218e94-91fd-4420-8278-f453574b97c4",
    "name": "Veritatis Quam Facilis",
    "organizer": "Rerum Perspiciatis",
    "game": "Rocket League",
    "participants": {
      "current": 206,
      "max": 256
    },
    "startDate": "2020-02-27T11:28:02.233Z"
  },
  {
    "id": "042fddd8-882f-4dd3-9cf1-ff82a3c8be9f",
    "name": "Cum Eveniet Quibusdam",
    "organizer": "Id",
    "game": "Dota 2",
    "participants": {
      "current": 168,
      "max": 256
    },
    "startDate": "2020-02-27T11:28:02.233Z"
  },
  {
    "id": "2eb5d07a-8ce5-4b36-8c0f-76b55701d9cc",
    "name": "Numquam Fuga Totam",
    "organizer": "Quaerat Dolorem",
    "game": "Dota 2",
    "participants": {
      "current": 256,
      "max": 256
    },
    "startDate": "2020-02-27T11:28:02.233Z"
  }
]
```

#### POST

Create a tournament.

##### Request Example

```json
{
  "name": "Foo"
}
```

##### Response Example

```json
{
  "id": "2b86b928-a0b5-4dec-8b5a-5f3519790829",
  "name": "Foo",
  "organizer": "Voluptas",
  "game": "League of Legends",
  "participants": {
    "current": 204,
    "max": 256
  },
  "startDate": "2020-02-27T11:36:27.047Z"
}
```

### `/tournaments/:id`

#### PATCH

Edit a tournament.

##### Request Example

```json
{
  "name": "Bar"
}
```

##### Response Example

```json
{
  "id": "2b86b928-a0b5-4dec-8b5a-5f3519790829",
  "name": "Bar",
  "organizer": "Voluptas",
  "game": "League of Legends",
  "participants": {
    "current": 204,
    "max": 256
  },
  "startDate": "2020-02-27T11:36:27.047Z"
}
```

#### DELETE

Delete a tournament.

##### Response Example

```json
{}
```

## Development Notes

1. In instructions above it is noted that we should manually start Metro, but it starts automatically
2. In `Challenge.md`, the last line in **Pull-Down-To-Refresh**__ is "bugged"
3. I've used `Sagas` since I had limited time and I know how to use them, but `Thunks` seem OK as well
4. I've switched to absolute imports since they look cleaner (and it's easy to do with a project this small)
5. I've changed the code organisation slightly since, in my current company, we found it easier to get around the code if we have a separate Redux "module" which contains related logic, then having a folder named "actions", "reducercs" and so on.
6. I didn't use default exports since they make it a bit more [complicated to rename and use](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
7. I prefer having a named file instead of index.js because it's a bit easier to searh for if you are searching for e.g. `Tournaments.tsx` than find which `index.js` is in `tournaments` folder
8. I've had an issue with running the Android emulator and the fake API server - every time I've started a new emulator, I've had to run `adb reverse tcp:4000 tcp:4000` (I assume it's because the fake API is using `http` instead of `https`)
9. I've used `Immer.js` because it simplifes changing the nested code (and makes it more readable).
10. I've added `lodash.debounce` as a per method package import, even though [it's discouraged](https://lodash.com/per-method-packages), to be consistent with the other `lodash` imports
11. I've added `RNEUI` (and related `safe-area-context` and `vector-icons`) to speed up development of the `Search` and `FAB` components because I'm assuming you are already using something like this OR have a in-house component library and in a real situation, I wouldn't create these components from scratch
12. `tslib` import is needed to optimise [TS helpers imports](https://www.typescriptlang.org/tsconfig#importHelpers)
13. Even though it's not listed as a requirement, in a real project I'd discuss adding [localisation](https://react.i18next.com/).
14. Another thing I'd think about is adding [Redux Toolkit](https://redux-toolkit.js.org/) since it would simplify creating a "combined" selector, e.g. in `Tournaments.tsx`, I have to use multiple selectors because if I would combine that data into a single object, which would be created each time we retrieve it, meaning we would have to handle this ourseves, and ReduxToolkit already has that included with [createSelector](https://redux.js.org/usage/deriving-data-selectors#createselector-overview)

