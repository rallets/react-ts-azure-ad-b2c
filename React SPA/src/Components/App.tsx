import React, { FC } from 'react';
import { IAccountInfo } from 'react-aad-msal';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LogoutFunction } from '../authProviders/authProvider';
import { Header } from './common/Header';
import { NotFoundPage } from './common/NotFoundPage';
import UserStoreContext, { UserStoreDefault } from './common/UserStoreContext';
import { HomePage } from './HomePage';
import { ItemsPage } from './items/ItemsPage';

export type AppProps = {
	accountInfo: IAccountInfo;
	logout: LogoutFunction;
};

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
						<Route path="*" component={NotFoundPage} />
					</Switch>
				</BrowserRouter>
			</UserStoreContext.Provider>
		</>
	);
};

export default App;
