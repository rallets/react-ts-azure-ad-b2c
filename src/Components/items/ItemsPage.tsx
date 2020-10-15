import React, { FC, useEffect, useState } from 'react';
import { Link, matchPath, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { guid } from '../../models/guid';
import { NotFoundPage } from '../common/NotFoundPage';
import { useUserStore } from '../common/UserStoreContext';
import { get, HttpResponse } from '../helpers/http';
import { ItemPage, ItemPageParams } from './ItemPage';

export type ItemsPageProps = {
}
export type Item = {
	id: guid,
	name: string,
}

export const ItemsPage: FC<ItemsPageProps> = () => {
	const { readonly } = useUserStore();
	const [items, loading] = useItems();

	// The `path` lets us build <Route> paths that are
	// relative to the parent route, while the `url` lets
	// us build relative links.
	let { path } = useRouteMatch();

	function handleAddItem() {
		console.log('Add item');
	}

	return (
		<>
			<div className="container-fluid">
				<div className="row">

					<div className="col-4">
						{readonly && (
							<div className="d-flex flex-row-reverse">
								<button className="btn btn-outline-info align-self-end" onClick={handleAddItem}>
									Add
								</button>
							</div>
						)}

						<div className="list-group">
							{loading && <p>Loading...</p>}

							{items.map(item => (
								<ItemsRow key={item.id} item={item} />
							))}
						</div>
					</div>

					<div className="col-8">
						<Switch>
							<Route path={`${path}/:id`} >
								<ItemPage />
							</Route>
							<Route path={path}>
								<h3>Please select a item.</h3>
							</Route>
						</Switch>
					</div>
				</div>
			</div>
		</>
	);
}

type ItemsRowProps = {
	item: Item
}

const ItemsRow: FC<ItemsRowProps> = ({ item }) => {
	// The `path` lets us build <Route> paths that are
	// relative to the parent route, while the `url` lets
	// us build relative links.
	let { url } = useRouteMatch();
	let { pathname } = useLocation();

	const match = matchPath<ItemPageParams>(pathname, {
		path: '/items/:id',
		exact: true,
		strict: false
	});
	const id = match ? match.params.id : null;

	return (
		<Link
			key={item.id}
			className={`list-group-item list-group-item-action ${id === item.id ? "active" : ""}`}
			to={`${url}/${item.id}`}>
			{item.name}
		</Link>
	);
}

function useItems(): [Item[], boolean] {
	const [result, setResult] = React.useState<Item[]>([]);
	const [loading, setLoading] = React.useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			let response: HttpResponse<Item[]>;
			try {
				response = await get<Item[]>(
					'https://localhost:44358/Items/', {
					headers: {
						'content-type': 'application/json',
					}
				});
				setResult(response.parsedBody || []);
			} catch (e) {
				setResult([]);
				console.log(e);
				toast.error(e.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return [result, loading];
}
