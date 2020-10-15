import React, { FC, useContext, useState } from 'react';
import { IAccountInfo } from 'react-aad-msal';
import { NavLink } from 'react-router-dom';
import { LogoutFunction } from '../../authProviders/authProvider';
import ObjectDump from './ObjectDump';
import UserStoreContext, { useUserStore } from './UserStoreContext';

export type HeaderProps = {
	accountInfo: IAccountInfo,
	logout: LogoutFunction,
}

export const Header: FC<HeaderProps> = ({ accountInfo, logout }) => {
	const { readonly, setReadonly } = useUserStore();
	const [showUserRawInfo, setShowUserRawInfo] = useState(false);

	function handleShowUserRawInfo() {
		setShowUserRawInfo(!showUserRawInfo);
	}

	function handleReadonly() {
		setReadonly(!readonly);
	}

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
				<span className="navbar-brand">Demo</span>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<NavLink className="nav-link" activeClassName="active" exact to="/">Home</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" activeClassName="active" to="/items">Items</NavLink>
						</li>
					</ul>
					<div className="form-inline my-2 my-lg-0">
						<span className="nav-link" onClick={handleShowUserRawInfo} >{accountInfo.account.name}</span>
						<button className="btn btn-outline-info" onClick={handleReadonly}>{readonly ? 'R/W' : 'RO'}</button>
						<button className="btn btn-outline-success" onClick={logout}>Logout</button>
					</div>
				</div>
			</nav>
			{ showUserRawInfo && (
				<div className="card mh-25">
					<h5 className="card-header">User detail</h5>
					<div className="card-body">
						<div className="card-text">
							<ObjectDump value={accountInfo} style={{ height: '200px' }} />
						</div>
					</div>
				</div>
			)}
		</>
	);
}
