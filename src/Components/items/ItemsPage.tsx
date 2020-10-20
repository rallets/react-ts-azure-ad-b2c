import React, { FC, useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { guid } from '../../models/guid';
import { useUserStore } from '../common/UserStoreContext';
import { ItemEditData } from './ItemEditForm';
import { deleteItem, useGetItems } from './itemHelpers';
import { ItemPage } from './ItemPage';
import ItemRow from './ItemRow';
import { Item, ItemHeader } from './models';

export type ItemsPageProps = {};

export const ItemsPage: FC<ItemsPageProps> = () => {
	const { readonly } = useUserStore();
	const [{ payload: apiItems, loading }, doRefresh] = useGetItems();
	const [updatedItem, setUpdatedItem] = useState<ItemHeader | null>(null);
	const [items, setItems] = useState<ItemHeader[]>([]);
	const [orderedItems, setOrderedItems] = useState<ItemHeader[]>([]);
	const [isAdding, setIsAdding] = useState<boolean>(false);

	useEffect(() => {
		setItems(orderItems(apiItems || []));
	}, [apiItems]);

	useEffect(() => {
		setOrderedItems(orderItems(items));
	}, [items]);

	useEffect(() => {
		if (!updatedItem) {
			return;
		}

		setItems((items) => {
			let updated = items.map((x) => (x.id === updatedItem.id ? updatedItem : x));
			updated = orderItems(updated);
			return updated;
		});

		setUpdatedItem(null);
	}, [updatedItem]);

	// The `path` lets us build <Route> paths that are
	// relative to the parent route, while the `url` lets
	// us build relative links.
	const { path } = useRouteMatch();

	function orderItems(items: ItemHeader[]): ItemHeader[] {
		return items.sort((a, b) => a.name.localeCompare(b.name));
	}

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
							<div className="d-flex flex-row-reverse mb-2">
								<button className="btn btn-outline-info align-self-end" onClick={() => setIsAdding(true)}>
									Add
								</button>
							</div>
						)}

						<div className="list-group">
							{loading && <p>Loading...</p>}

							{(orderedItems || []).map((item) => (
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
