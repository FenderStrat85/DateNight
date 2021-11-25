# DateNight

## About The Project

DateNight is an app designed to make choosing where to eat more fun helping you to discover places that you didn't know existed. After setting up an account, select 7 cuisine types, for example, Chinese, Japanese, Italian etc, a location and radius. Then a spinner will randomly select a cuisine type and give you all of the restaurants serving that cuisine in your chose location.

## Technologies

The technologies used to build this app:

### Frontend

[React Native](https://reactnative.dev/)

### Backend

[MongoDB](https://www.mongodb.com/)
[Mongoose](https://mongoosejs.com/)
[NodeJs](https://nodejs.org/en/),
[Express](http://expressjs.com/)

### Others

[GooglePlacesApi](https://developers.google.com/maps/documentation/places/web-service/overview)

## Screenshots

![Screenshot 2021-10-22 at 16 30 48](https://user-images.githubusercontent.com/77243567/138485444-ac930754-5dec-42f5-b42d-353ee62313c9.png)

![Screenshot 2021-10-22 at 16 39 30](https://user-images.githubusercontent.com/77243567/138485487-0200ee99-6812-47b4-bf39-cb1a5f1c61c3.png)

![Screenshot 2021-10-22 at 16 40 45](https://user-images.githubusercontent.com/77243567/138485510-58932922-fd24-4dfe-b02a-c45270266183.png)

![Screenshot 2021-10-22 at 16 43 05](https://user-images.githubusercontent.com/77243567/138485525-df4861a3-7bee-4835-b9b8-9a72f2223f35.png)

![Screenshot 2021-10-22 at 16 44 43](https://user-images.githubusercontent.com/77243567/138485562-b65662a5-148b-4a26-83d3-a796ff6e543d.png)

## Getting Started

There's a few things you need to do to get started:

### Prerequisites

- npm

```
npm install npm@latest -g
```

- Simulators
- This project uses expo on top of react native. If you want to run this on your mobile phone you will need to download expo from either the app store or google play.

- iOS : [Xcode](https://docs.expo.dev/workflow/ios-simulator/#step-1-install-xcode)

- Android : [Android Studio Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)

- API Keys

  - Google Places => Make sure you have static maps accessible on your account

- Database

You will need to have MongoDB installed on your machine.

1. Clone this repo

2. `datenight/client/datenightclient/ % npm install`

3. `datenight/server % npm install`

4. Create `server/.env` using `server/.env.example` as a template

5. Create `client/datenightclient/.env` using `client/datenightclient/.env.example` as a template

6. Take the knob.png file located in `client/datenightclient/assests/images/knob.png` and add this to the images file inside of React Native Wheel of Fortune package in the node modules (Unfortunately an issue with the package).

### Backend

```
npx nodemon
```

### Frontend

```
npm start
```

OR

```
expo start
```
