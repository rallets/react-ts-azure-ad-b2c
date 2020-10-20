import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { guid } from '../../models/guid';
import { environment } from '../common/env';
import { useUserStore } from '../common/UserStoreContext';
import { ApiResult, postAsync, putAsync, useGet } from '../helpers/useHttp';
import { ItemEditData, ItemForm } from './ItemForm';
import { Item } from './ItemsPage';

export type ItemPageProps = {
	isNew: boolean;
	onEdited: (item: Item) => void;
	onAdded: (item: ItemEditData) => void;
	onCancel: () => void;
};

export type ItemPageParams = {
	id: string;
};

export const ItemPage: FC<ItemPageProps> = ({ isNew, onEdited, onAdded, onCancel }) => {
	// const { url, path } = useRouteMatch();
	const { readonly } = useUserStore();

	const { id } = useParams<ItemPageParams>();
	const [{ isValid, payload: item, loading }, doRefresh] = useItem(id);

	const [isEditing, setIsEditing] = useState(false);
	const handleIsEditing = (): void => setIsEditing(true);

	const [isAdding, setIsAdding] = useState(false);

	useEffect(() => {
		setIsAdding(isNew);
	}, [isNew]);

	function handleClose(): void {
		setIsEditing(false);
		setIsAdding(false);
		onCancel();
	}

	async function handleSave(item: ItemEditData): Promise<void> {
		console.log('Edit item', item);

		if (isEditing) {
			const result = await editItem(id, item);
			if (result) {
				onEdited({ id, name: item.name, description: item.description });
				doRefresh();
				setIsEditing(false);
			}
		}

		if (isAdding) {
			const result = await createItem(item);
			if (result) {
				onAdded(item);
				setIsAdding(false);
			}
		}
	}

	if (!isValid || !item) {
		return <p>Invalid item</p>;
	}

	return (
		<>
			{loading && <p>Loading...</p>}

			{isEditing && <ItemForm item={item} handleClose={handleClose} handleSave={handleSave} />}
			{isAdding && <ItemForm item={null} handleClose={handleClose} handleSave={handleSave} />}

			{!isEditing && !isAdding && (
				<>
					{!readonly && (
						<div className="row">
							<div className="col">
								<button className="btn btn-outline-primary float-right" onClick={handleIsEditing}>
									Edit
								</button>
							</div>
						</div>
					)}
					<div className="row">
						<div className="col-4">Id</div>
						<div className="col">{item?.id}</div>
					</div>
					<div className="row">
						<div className="col-4">Name</div>
						<div className="col">{item?.name}</div>
					</div>
					<div className="row">
						<div className="col-4">Description</div>
						<div className="col">{item?.description}</div>
					</div>
				</>
			)}

			{/* <span>Item Page ID: {id}</span>
			<ObjectDump value={item} /> */}
		</>
	);
};

function useItem(id: guid): [ApiResult<Item>, () => void] {
	const url = `${environment.apiBaseUrl}/Items/${id}`;

	const result = useGet<Item>(url);
	return result;
}

async function editItem(id: guid, item: ItemEditData): Promise<boolean> {
	const url = `${environment.apiBaseUrl}/Items/${id}`;

	const result = await putAsync<ItemEditData, boolean>(url, item);
	return result || false;
}

async function createItem(item: ItemEditData): Promise<boolean> {
	const url = `${environment.apiBaseUrl}/Items/`;

	const result = await postAsync<ItemEditData, boolean>(url, item);
	return result || false;
}
