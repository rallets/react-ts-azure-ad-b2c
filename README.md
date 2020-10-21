# Azure AD B2C + React + Typescript SPA demo app

## Goals

A simple SPA demo app to practice the React basic concepts like **Azure AD B2C authentication with MSAL**, **custom hooks**, **effects**, **context**, **form editing with field array**, **custom & async debounced form validation** and many others.

## Packages

This demo uses the following packages:

- Microsoft Authentication Library for js (MSAL)
- React
- Typescript + linter
- React router
- React Hook Form
- React Toastify
- React Fontawesome svg icons
- Plain Bootstrap
- Type-safe Fetch requests with GET, POST, PUT, DELETE methods

## Run the demo

### Configure AD B2C & related config files

In the `React SPA` folder the files starting with `.env` are configuration files.
The configurations found in `.env` can be overridden by the environment-specific file (`.env.development`, `.env.test`, `.env.production`) in which the app is started/deployed.
By default `npm start` starts as `development`.

- `REACT_APP_API_BASE_URL` => the WebApi url. Example: `https://localhost:5001`.
- `REACT_APP_AD_B2C_TENANT` => your Azure AD B2C tenant. Example: `yourtenant.onmicrosoft.com`
- `REACT_APP_AD_B2C_SIGN_IN_POLICY` => your Azure AD B2C sign-in policy. Example: `B2C_1_react_sign_up_sign_in`
- `REACT_APP_AD_B2C_APPLICATION_ID` => your Azure AD B2C application ID. Example: `xxxxxxxx-your-xADx-GUID-xxxxxxxxxxxx`
- `REACT_APP_AD_B2C_REACT_REDIRECT_URI` => your Azure AD B2C redirect uri. Example: `http://localhost:3000`

### Run the WebApi

Navigate to the `WebApi` folder and run the app (in development mode):

```cmd
dotnet run
```

Open [https://localhost:5001/items](https://localhost:5001/items) to view it in the browser.

### Run the React SPA

Navigate to the `React SPA` folder and run the app (in development mode):

```cmd
npm install
npm start
```

The React SPA will start in a browser at the address [http://localhost:3000](http://localhost:3000).
