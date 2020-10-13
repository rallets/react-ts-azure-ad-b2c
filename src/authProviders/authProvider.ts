import { MsalAuthProvider, LoginType, IMsalAuthProviderConfig } from 'react-aad-msal';
import { Configuration, AuthenticationParameters,   } from 'msal';

const tenant = 'maubeinmetab2c.onmicrosoft.com';
const signInPolicy = 'B2C_1_react_sign_up_sign_in';
const applicationID = '582ce2ba-84c0-42c6-a8e0-4ec69dfb017d';
const reactRedirectUri = 'http://localhost:3000';

const tenantSubdomain = tenant.split('.')[0];
const instance = `https://${tenantSubdomain}.b2clogin.com/tfp/`;
const signInAuthority = `${instance}${tenant}/${signInPolicy}`;

// Msal Configurations
const signInConfig : Configuration = {
	auth: {
		authority: signInAuthority,
		clientId: applicationID,
		redirectUri: reactRedirectUri,
		validateAuthority: false
	},
	cache: {
		cacheLocation: 'sessionStorage',
		storeAuthStateInCookie: true
	}
};

// Authentication Parameters
const authenticationParameters: AuthenticationParameters = {
	// Ref. https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent
	scopes: [
		// 'https://graph.microsoft.com/Directory.Read.All',

		// With this permission, an app can receive a unique identifier for the user in the form of the sub claim. 
		// It also gives the app access to the UserInfo endpoint. 
		// The openid scope can be used at the Microsoft identity platform token endpoint to acquire ID tokens, 
		// which can be used by the app for authentication.
		// 'openid',

		// The profile scope can be used with the openid scope and any others. 
		// It gives the app access to a substantial amount of information about the user. 
		// The information it can access includes, but isn't limited to, the user's given name, surname, preferred username, and object ID.
		// 'profile'
	]
};

// Options
const options : IMsalAuthProviderConfig = {
	loginType: LoginType.Redirect,
	tokenRefreshUri: window.location.origin + '/auth.html'
};

export const signInAuthProvider = new MsalAuthProvider(
	signInConfig,
	authenticationParameters,
	options
);
