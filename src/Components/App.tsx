import React, { FC, useState } from 'react';
import { IAccountInfo } from 'react-aad-msal';
import { LogoutFunction, signInAuthProvider } from '../authProviders/authProvider';
import { Header } from './common/Header';
// import { signInAuthProvider } from '../authProviders/authProvider';
// import { webApiAuthProvider } from '../authProviders/webapiAuthProvider';
// import { webApiAuthProvider } from '../authProviders/webapiAuthProvider';
import ObjectDump from './common/ObjectDump';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HomePage } from './HomePage';
import { ItemsPage } from './items/ItemsPage';
import { ItemPage } from './items/ItemPage';
import { NotFoundPage } from './common/NotFoundPage';

import "react-toastify/dist/ReactToastify.css";
import UserStoreContext, { UserStoreDefault } from './common/UserStoreContext';

export type AppProps = {
	accountInfo: IAccountInfo,
	logout: LogoutFunction,
}

const App: FC<AppProps> = ({ accountInfo, logout }) => {
	const [readonly, setReadonly] = React.useState(UserStoreDefault.readonly);

	return (
		<>
			<UserStoreContext.Provider value={{ readonly, setReadonly }}>
				<ToastContainer autoClose={3000} hideProgressBar />

				<BrowserRouter>

					<Header accountInfo={accountInfo} logout={logout} />

					<Switch>
						<Route path="/" exact component={HomePage} />
						<Route path="/items" component={ItemsPage} />
						{/* <Route path="/items/:id" component={ItemPage} /> */}
						<Route path="*" component={NotFoundPage} />
					</Switch>
				</BrowserRouter>

				<div>
					<hr />
					{/* <button onClick={handleFetchFromWebApi}>Fetch from WebApi</button> */}
					{/* <ObjectDump value={accountInfo} /> */}
				</div>
			</UserStoreContext.Provider>
		</>
	);
}

export default App;
