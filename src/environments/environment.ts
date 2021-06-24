// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8000/api',
  firebaseConfig : {
    apiKey: "AIzaSyDsYPwDoOzC533CjFw2T8RBdEc3IulXuiw",
    authDomain: "kamjobs-d59d8.firebaseapp.com",
    projectId: "kamjobs-d59d8",
    storageBucket: "kamjobs-d59d8.appspot.com",
    messagingSenderId: "190830907300",
    appId: "1:190830907300:web:2301a0ce972eab0e4e7b31"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
