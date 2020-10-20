import React, { FC, useEffect, useState } from 'react';
import { Link, matchPath, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { guid } from '../../models/guid';
import { environment } from '../common/env';
import { useUserStore } from '../common/UserStoreContext';
import { ApiResult, deleteAsync, useGet } from '../helpers/useHttp';
import { ItemEditData } from './ItemForm';
import { ItemPage, ItemPageParams } from './ItemPage';

export type ItemsPageProps = {};

export type Item = {
	id: guid;
	name: string;
	description: string;
};

export const ItemsPage: FC<ItemsPageProps> = () => {
	const { readonly } = useUserStore();
	const [{ payload: apiItems, loading }, doRefresh] = useGetItems();
	const [updatedItem, setUpdatedItem] = useState<Item | null>(null);
	const [items, setItems] = useState<Item[]>([]);
	const [isAdding, setIsAdding] = useState<boolean>(false);

	useEffect(() => {
		setItems(apiItems || []);
	}, [apiItems]);

	useEffect(() => {
		if (!updatedItem) {
			return;
		}

		setItems((items) => {
			let updated = items.map((x) => (x.id === updatedItem.id ? updatedItem : x));
			updated = updated.sort((a, b) => a.name.localeCompare(b.name));
			return updated;
		});

		setUpdatedItem(null);
	}, [updatedItem]);

	// The `path` lets us build <Route> paths that are
	// relative to the parent route, while the `url` lets
	// us build relative links.
	const { path } = useRouteMatch();

	function handleCancelEditing(): void {
		setIsAdding(false);
	}

	function handleEdited(item: Item): void {
		setUpdatedItem(item);
	}

	function handleAdded(_item: ItemEditData): void {
		doRefresh();
	}

	async function handleDeleteItem(id: guid): Promise<void> {
		const result = await deleteItem(id);
		if (result) {
			doRefresh();
		}
	}

	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="col-4">
						{!readonly && (
							<div className="d-flex flex-row-reverse">
								<button className="btn btn-outline-info align-self-end" onClick={() => setIsAdding(true)}>
									Add
								</button>
							</div>
						)}

						<div className="list-group">
							{loading && <p>Loading...</p>}

							{(items || []).map((item) => (
								<ItemRow key={item.id} item={item} onDeleteItem={handleDeleteItem} />
							))}
						</div>
					</div>

					<div className="col-8">
						<Switch>
							<Route path={`${path}/:id`}>
								<ItemPage isNew={isAdding} onEdited={handleEdited} onAdded={handleAdded} onCancel={handleCancelEditing} />
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
};

type ItemsRowProps = {
	item: Item;
	onDeleteItem: (id: guid) => void;
};

const ItemRow: FC<ItemsRowProps> = ({ item, onDeleteItem }) => {
	const { readonly } = useUserStore();

	// The `path` lets us build <Route> paths that are
	// relative to the parent route, while the `url` lets
	// us build relative links.
	const { url } = useRouteMatch();
	const { pathname } = useLocation();

	const match = matchPath<ItemPageParams>(pathname, {
		path: '/items/:id',
		exact: true,
		strict: false,
	});
	const id = match ? match.params.id : null;

	function handleDeleteItem(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: guid): void {
		e.preventDefault();
		onDeleteItem(id);
	}

	return (
		<Link
			key={item.id}
			className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
				id === item.id ? 'active' : ''
			}`}
			to={`${url}/${item.id}`}>
			{item.name}

			{!readonly && id === item.id && (
				<button className="btn btn-outline-danger" onClick={(e): void => handleDeleteItem(e, item.id)}>
					Delete
				</button>
			)}
		</Link>
	);
};

function useGetItems(): [ApiResult<Item[]>, () => void] {
	const url = `${environment.apiBaseUrl}/Items/`;

	const result = useGet<Item[]>(url);
	return result;
}

async function deleteItem(id: guid): Promise<boolean> {
	const url = `${environment.apiBaseUrl}/Items/${id}`;

	const result = await deleteAsync<boolean>(url);
	return result || false;
}
