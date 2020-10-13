import React from 'react';
import { IAccountInfo } from 'react-aad-msal';

export declare type LogoutFunction = () => void;


export interface IApp {
	accountInfo: IAccountInfo,
	logout: LogoutFunction,
}

const App = ({ accountInfo, logout }: IApp) => {
	return (
		<p>
			<span>Welcome, {accountInfo.account.name}!</span>
			<button onClick={logout}>Logout</button>
		</p>
	);
}

export default App;
