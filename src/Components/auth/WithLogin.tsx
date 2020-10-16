import React from 'react';
import AzureAD, { AuthenticationState, IAzureADFunctionProps } from 'react-aad-msal';
import { signInAuthProvider } from '../../authProviders/authProvider';
import { AppProps } from '../App';
import { UnauthenticatedProps } from './Unauthenticated';

const WithLogin = (
	Wrapped: React.ComponentType<AppProps>,
	Authenticating: React.ComponentType<{}>,
	Unauthenticated: React.ComponentType<UnauthenticatedProps>
): JSX.Element => {
	return (
		<AzureAD provider={signInAuthProvider} forceLogin={true}>
			{({ login, logout, authenticationState, error, accountInfo }: IAzureADFunctionProps): JSX.Element => {
				if (authenticationState === AuthenticationState.InProgress) {
					return <Authenticating />;
				}

				if (authenticationState === AuthenticationState.Authenticated && accountInfo) {
					return <Wrapped logout={logout} accountInfo={accountInfo} />;
				}

				// AuthenticationState.Unauthenticated:
				return <Unauthenticated error={error} login={login} />;
			}}
		</AzureAD>
	);
};

export default WithLogin;
