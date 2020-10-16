import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import App from './Components/App';
import Authenticating from './Components/auth/Authenticating';
import Unauthenticated from './Components/auth/Unauthenticated';
import WithLogin from './Components/auth/WithLogin';

const AppWithLogin = (): JSX.Element => WithLogin(App, Authenticating, Unauthenticated);

ReactDOM.render(
	<React.StrictMode>
		<AppWithLogin />
	</React.StrictMode>,
	document.getElementById('root')
);
