import React, { FC, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { guid } from '../../models/guid';
import { environment } from '../common/env';
import { ApiResult, useGet } from '../helpers/useHttp';
import { ItemEditData, ItemForm } from './ItemForm';
import { Item } from './ItemsPage';

export type ItemPageProps = {};
export type ItemPageParams = {
	id: string;
};

export const ItemPage: FC<ItemPageProps> = () => {
	const { url, path } = useRouteMatch();
	console.log(url, path);

	const { id } = useParams<ItemPageParams>();
	const { isValid, item, loading } = useItem(id);
	const [isEditing, setEditing] = useState(false);
	const handleEditing = (): void => setEditing(true);

	function handleClose(): void {
		console.log('Close');
		setEditing(false);
	}

	function handleSave(item: ItemEditData): void {
		console.log('Add item', item);
		setEditing(false);
	}

	if (!isValid || !item) {
		return <p>Invalid item</p>;
	}

	return (
		<>
			{loading && <p>Loading...</p>}

			{isEditing && <ItemForm item={item} handleClose={handleClose} handleSave={handleSave} />}

			{!isEditing && (
				<>
					<div className="row">
						<div className="col">
							<button className="btn btn-outline-primary float-right" onClick={handleEditing}>
								Edit
							</button>
						</div>
					</div>
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

function useItem(id: guid): ApiResult<Item> {
	const url = `${environment.apiBaseUrl}/Items/${id}`;

	const result = useGet<Item>(url);
	return result;
}
