import React from 'react';
import AzureAD, { AuthenticationState, IAzureADFunctionProps } from 'react-aad-msal';
import { signInAuthProvider } from '../authProviders/authProvider';
import { IApp } from './App';
import { IUnauthenticated } from './Unauthenticated';

const WithLogin = (
	Wrapped: React.ComponentType<IApp>,
	Authenticating: React.ComponentType,
	Unauthenticated: React.ComponentType<IUnauthenticated>
) => {
	return (
		<AzureAD provider={signInAuthProvider} forceLogin={true}>
			{
				({ login, logout, authenticationState, error, accountInfo }: IAzureADFunctionProps) => {

					if (authenticationState === AuthenticationState.InProgress) {
						return <Authenticating />;
					}

					if (authenticationState === AuthenticationState.Authenticated && accountInfo) {
						return <Wrapped logout={logout} accountInfo={accountInfo} />;
					}

					// AuthenticationState.Unauthenticated:
					return <Unauthenticated error={error} login={login} />;
				}
			}
		</AzureAD>
	);
}

export default WithLogin;
