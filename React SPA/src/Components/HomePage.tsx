import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const HomePage: FC<{}> = () => {
	return (
		<>
			<div className="jumbotron">
				<h1 className="display-4">React & Typescript SPA demo app</h1>
				<p className="lead">
					A simple SPA demo app to practice the React basic concepts like <em>custom hooks</em>, <em>effects</em>,&nbsp;
					<em>context</em>, <em>form editing w/ field array</em>, <em>custom & async debounced form validation</em> and many
					others.
				</p>
				<hr className="my-4" />
				<p>This demo uses the following packages</p>
				<ul>
					<li>React</li>
					<li>Typescript</li>
					<li>React router</li>
					<li>React Hook Form</li>
					<li>React Toastify</li>
					<li>React Fontawesome svg icons</li>
					<li>Plain Bootstrap</li>
					<li>Type-safe Fetch requests w/ GET, POST, PUT, DELETE methods</li>
				</ul>

				<NavLink className="btn btn-primary btn-lg" activeClassName="active" to="/items">
					Try yourself
				</NavLink>
			</div>
		</>
	);
};
