import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

import WithLogin from './Components/auth/WithLogin';
import Authenticating from './Components/auth/Authenticating';
import Unauthenticated from './Components/auth/Unauthenticated';
import App from './Components/App';

const AppWithLogin = () => WithLogin(App, Authenticating, Unauthenticated);

ReactDOM.render(
	<React.StrictMode>
		<AppWithLogin />
	</React.StrictMode>,
	document.getElementById('root')
);
